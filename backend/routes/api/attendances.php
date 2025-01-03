<?php

use App\Http\Controllers\AttendanceController;
use Illuminate\Support\Facades\Route;

Route::prefix('attendances')->group(function () {
  Route::post('/', [AttendanceController::class, 'createAttendances']);
});
