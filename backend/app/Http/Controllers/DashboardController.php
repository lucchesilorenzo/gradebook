<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get dashboard card data
     *
     * @return JsonResponse
     */
    public function getDashboardCardData(): JsonResponse
    {
        try {
            $coursesCount = auth()->user()->courses()->count();

            return response()->json($coursesCount);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get dashboard card data.',
            ], 500);
        }
    }
}
