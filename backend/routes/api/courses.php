<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;

Route::prefix('courses')->group(function () {
  Route::get('/teacher-courses', [CourseController::class, 'getTeacherCourses']);
});
