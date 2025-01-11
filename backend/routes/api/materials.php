<?php

use App\Http\Controllers\CourseUnitMaterialController;
use Illuminate\Support\Facades\Route;

Route::prefix('materials')->group(function () {
  Route::get('/{courseSlug}/{courseUnitSlug}', [CourseUnitMaterialController::class, 'getMaterials']);
  Route::post('/{courseSlug}/{courseUnitSlug}', [CourseUnitMaterialController::class, 'createMaterial']);
  Route::patch('/{courseUnitMaterial}', [CourseUnitMaterialController::class, 'updateMaterial']);
});
