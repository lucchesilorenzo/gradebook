<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    /**
     * Get user settings
     *
     * @return JsonResponse
     */
    public function getUserSettings(): JsonResponse
    {
        try {
            return response()->json(auth()->user());
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get user settings.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
