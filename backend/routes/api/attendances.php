<?php

use App\Http\Controllers\AttendanceController;
use Illuminate\Support\Facades\Route;

Route::prefix('attendances')->group(function () {
  Route::post('/', [AttendanceController::class, 'createAttendances']);
  Route::patch('/{courseSlug}/{courseUnitSlug}/end-time', [AttendanceController::class, 'updateAttendanceEndTime']);
  Route::patch('/{student}/{courseUnit}', [AttendanceController::class, 'updateAttendance']);
});
