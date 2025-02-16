<?php

use App\Http\Controllers\AssignmentController;
use Illuminate\Support\Facades\Route;

Route::prefix('assignments')->group(function () {
  Route::get('/{courseSlug}/{courseUnitSlug}', [AssignmentController::class, 'getAssignments']);
  Route::post('/{courseSlug}/{courseUnitSlug}', [AssignmentController::class, 'createAssignment']);
});
