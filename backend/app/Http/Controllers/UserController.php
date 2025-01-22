<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserSettingsRequest;
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

    /**
     * Update user settings.
     *
     * @param UpdateUserSettingsRequest $request
     * @return JsonResponse
     */
    public function updateUserSettings(UpdateUserSettingsRequest $request): JsonResponse
    {
        try {
            // Update user settings
            auth()->user()->update($request->validated());

            return response()->json([
                'message' => 'User settings updated successfully.',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not update user settings.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
