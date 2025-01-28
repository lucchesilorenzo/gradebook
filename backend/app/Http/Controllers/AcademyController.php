<?php

namespace App\Http\Controllers;

use App\Models\Academy;
use Illuminate\Http\JsonResponse;

class AcademyController extends Controller
{
    /**
     * Get academy.
     *
     * @return JsonResponse
     */
    public function getAcademy(): JsonResponse
    {
        try {
            $academy = Academy::firstOrFail();

            return response()->json($academy);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get academy.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
