<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMaterialRequest;
use App\Models\Course;
use App\Models\CourseUnitMaterial;
use Illuminate\Http\JsonResponse;

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
     * @param CreateMaterialRequest $request
     * @return JsonResponse
     */
    public function createMaterial(
        CreateMaterialRequest $request,
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
                'message' => 'Course unit material created.',
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not create course unit material.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
