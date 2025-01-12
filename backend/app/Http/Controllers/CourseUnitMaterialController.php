<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCourseUnitMaterialRequest;
use App\Http\Requests\UpdateCourseUnitMaterialRequest;
use App\Models\Course;
use App\Models\CourseUnitMaterial;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class CourseUnitMaterialController extends Controller
{
    /**
     * Get course unit materials.
     *
     * @return JsonResponse
     */
    public function getMaterials(string $courseSlug, string $courseUnitSlug): JsonResponse
    {
        try {
            $course = Course::where('slug', $courseSlug)->firstOrFail();

            $courseUnit = $course->units()
                ->where('slug', $courseUnitSlug)
                ->firstOrFail();

            $courseMaterials = CourseUnitMaterial::where('course_id', $course->id)
                ->where('course_unit_id', $courseUnit->id)
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json($courseMaterials);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get course unit materials.',
            ], 500);
        }
    }

    /**
     * Create course unit material.
     *
     * @param CreateCourseUnitMaterialRequest $request
     * @param string $courseSlug
     * @param string $courseUnitSlug
     * @return JsonResponse
     */
    public function createMaterial(
        CreateCourseUnitMaterialRequest $request,
        string $courseSlug,
        string $courseUnitSlug
    ): JsonResponse {
        // Validation
        $validatedData = $request->validated();

        try {
            // Get course
            $course = Course::where('slug', $courseSlug)->firstOrFail();

            // Get course unit ID
            $courseUnitId = $course->units()->where('slug', $courseUnitSlug)->firstOrFail()->id;

            // Create course material
            $courseMaterial = CourseUnitMaterial::create([
                'course_id' => $course->id,
                'course_unit_id' => $courseUnitId,
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'type' => $validatedData['type'],
                'url' => $validatedData['url'] ?? null,
            ]);

            // Upload file if it exists
            if ($request->hasFile('file')) {
                $path = $request->file('file')->store('courses/materials', 'public');
                $courseMaterial->update(['file' => $path]);
            }

            return response()->json([
                'message' => 'Course unit material created successfully.',
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not create course unit material.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update course unit material.
     *
     * @param UpdateCourseUnitMaterialRequest $request
     * @param CourseUnitMaterial $courseUnitMaterial
     * @return JsonResponse
     */
    public function updateMaterial(
        UpdateCourseUnitMaterialRequest $request,
        CourseUnitMaterial $courseUnitMaterial
    ): JsonResponse {
        // Validation 
        $validatedData = $request->validated();

        try {
            // Check if file exists
            if ($request->hasFile('file') && $courseUnitMaterial->file) {
                if (Storage::disk('public')->exists($courseUnitMaterial->file)) {
                    Storage::disk('public')->delete($courseUnitMaterial->file);
                }

                $path = $request->file('file')->store('courses/materials', 'public');
                $validatedData['file'] = $path;
            }

            // Update course material
            $courseUnitMaterial->update($validatedData);

            return response()->json([
                'message' => 'Course unit material updated successfully.',
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not update course unit material.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete course unit material.
     *
     * @param CourseUnitMaterial $courseUnitMaterial
     * @return JsonResponse
     */
    public function deleteMaterial(CourseUnitMaterial $courseUnitMaterial): JsonResponse
    {
        try {
            // Check if file exists
            if ($courseUnitMaterial->file) {
                if (Storage::disk('public')->exists($courseUnitMaterial->file)) {
                    Storage::disk('public')->delete($courseUnitMaterial->file);
                }
            }

            // Delete course material
            $courseUnitMaterial->delete();

            return response()->json([
                'message' => 'Course unit material deleted successfully.',
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not delete course unit material.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
