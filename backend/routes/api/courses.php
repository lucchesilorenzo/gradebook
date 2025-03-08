<?php

use App\Http\Controllers\CourseController;
use Illuminate\Support\Facades\Route;

Route::prefix('courses')->group(function () {
  Route::prefix('teacher')->group(function () {
    Route::get('/', [CourseController::class, 'getTeacherCourses']);
    Route::get('/{courseSlug}', [CourseController::class, 'getTeacherCourse']);
    Route::get('/{courseSlug}/{courseUnitSlug}/students/{student}/grades', [CourseController::class, 'getStudentGradesForUnit']);
    Route::get('/{courseSlug}/students', [CourseController::class, 'getCourseStudents']);
    Route::patch('/{courseSlug}/students/{student}/desk-position', [CourseController::class, 'updateStudentDeskPosition']);
  });
});
