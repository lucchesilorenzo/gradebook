<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;

Route::prefix('courses')->group(function () {
  Route::prefix('teacher')->group(function () {
    Route::get('/', [CourseController::class, 'getTeacherCourses']);
    Route::get('/{courseSlug}', [CourseController::class, 'getTeacherCourse']);
  });
});
