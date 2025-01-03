<?php

use Illuminate\Support\Facades\Route;

require __DIR__ . '/api/auth.php';

Route::middleware('auth:sanctum')->group(function () {
  require __DIR__ . '/api/courses.php';
  require __DIR__ . '/api/attendances.php';
});
