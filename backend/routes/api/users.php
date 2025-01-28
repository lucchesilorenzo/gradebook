<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
  Route::get('/settings', [UserController::class, 'getUserSettings']);
  Route::get('/notifications', [UserController::class, 'getUserNotifications']);
  Route::patch('/notifications/{notificationId}/read', [UserController::class, 'markNotificationAsRead']);
  Route::delete('/notifications/{notificationId}', [UserController::class, 'deleteUserNotification']);
  Route::post('/upload', [UserController::class, 'uploadUserImage']);
  Route::patch('/settings', [UserController::class, 'updateUserSettings']);
});
