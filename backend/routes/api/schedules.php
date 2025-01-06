<?php

use App\Http\Controllers\CourseUnitScheduleController;
use Illuminate\Support\Facades\Route;

Route::prefix('schedules')->group(function () {
  Route::get('/', [CourseUnitScheduleController::class, 'getSchedules']);
});
