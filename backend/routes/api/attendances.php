<?php

use App\Http\Controllers\AttendanceController;
use Illuminate\Support\Facades\Route;

Route::prefix('attendances')->group(function () {
  Route::get('/{courseSlug}/{courseUnitSlug}', [AttendanceController::class, 'getCourseUnitAttendances']);
  Route::post('/', [AttendanceController::class, 'createAttendances']);
  Route::patch('/{courseSlug}/{courseUnitSlug}/end-time', [AttendanceController::class, 'updateAttendanceEndTime']);
  Route::patch('/{course}/{courseUnit}/{student}', [AttendanceController::class, 'updateAttendance']);
});
