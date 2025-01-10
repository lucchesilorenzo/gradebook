<?php

use App\Http\Controllers\CourseUnitMaterialController;
use Illuminate\Support\Facades\Route;

Route::prefix('materials')->group(function () {
  Route::get('/', [CourseUnitMaterialController::class, 'getMaterials']);
});
