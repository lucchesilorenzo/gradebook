<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserSettingsRequest;
use App\Http\Requests\UploadUserImageRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

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
     * Get user notifications.
     *
     * @return JsonResponse
     */
    public function getUserNotifications(): JsonResponse
    {
        try {
            $user = auth()->user();

            $notifications = $user->notifications;
            $unreadNotifications = $user->unreadNotifications->count();

            return response()->json([
                'notifications' => $notifications,
                'unread_notifications' => $unreadNotifications,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get user notifications.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Upload user image.
     *
     * @return JsonResponse
     */
    public function uploadUserImage(UploadUserImageRequest $request): JsonResponse
    {
        // Validation
        $validatedData = $request->validated();

        try {
            $user = auth()->user();

            // Delete old image
            if ($user->image && Storage::disk('public')->exists($user->image)) {
                Storage::disk('public')->delete($user->image);
            }

            // Upload new image
            $path = $request->file('image')->store('users/images', 'public');
            $validatedData['image'] = $path;

            // Update user image
            $user->update($validatedData);

            return response()->json([
                'message' => 'User image uploaded successfully.',
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not upload user image.',
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

    /**
     * Mark notification as read.
     *
     * @param string $notificationId
     * @return JsonResponse
     */
    public function markNotificationAsRead(string $notificationId): JsonResponse
    {
        try {
            $notification = auth()->user()->notifications()->findOrFail($notificationId);
            $notification->markAsRead();

            return response()->json([
                'message' => 'Notification marked as read successfully.',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not mark notification as read.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
