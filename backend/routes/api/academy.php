<?php

use App\Http\Controllers\AcademyController;
use Illuminate\Support\Facades\Route;

Route::prefix('academy')->group(function () {
  Route::get('/', [AcademyController::class, 'getAcademy']);
});
