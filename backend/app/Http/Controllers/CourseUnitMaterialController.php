<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateMaterialRequest;
use App\Models\CourseUnit;
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
    public function getMaterials(): JsonResponse
    {
        try {
            $courseMaterials = CourseUnitMaterial::all();
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
        string $courseUnitSlug
    ): JsonResponse {
        // Validation
        $validatedData = $request->validated();

        try {
            // Get course unit
            $courseUnitId = CourseUnit::where('slug', $courseUnitSlug)->firstOrFail()->id;

            // Create course material
            $courseMaterial = CourseUnitMaterial::create([
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
