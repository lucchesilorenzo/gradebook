<?php

use App\Http\Controllers\AssignmentController;
use Illuminate\Support\Facades\Route;

Route::prefix('assignments')->group(function () {
  Route::get('/{courseSlug}/{courseUnitSlug}', [AssignmentController::class, 'getAssignments']);
  Route::get('/{courseSlug}/{courseUnitSlug}/{assignmentSlug}', [AssignmentController::class, 'getAssignment']);
  Route::post('/{courseSlug}/{courseUnitSlug}', [AssignmentController::class, 'createAssignment']);
  Route::patch('/{assignment}/{student}/records', [AssignmentController::class, 'updateAssignmentStudentRecord']);
  Route::patch('/{assignment}/status', [AssignmentController::class, 'updateAssignmentStatus']);
});
