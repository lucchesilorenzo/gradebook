<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
  Route::get('/settings', [UserController::class, 'getUserSettings']);
  Route::post('/upload', [UserController::class, 'uploadUserImage']);
  Route::patch('/settings', [UserController::class, 'updateUserSettings']);
});
