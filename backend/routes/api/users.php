<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('users')->group(function () {
  Route::get('/settings', [UserController::class, 'getUserSettings']);
  Route::patch('/settings', [UserController::class, 'updateUserSettings']);
});
