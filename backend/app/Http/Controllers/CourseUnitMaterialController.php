<?php

namespace App\Http\Controllers;

use App\Models\CourseUnitMaterial;
use Illuminate\Http\JsonResponse;

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
}
