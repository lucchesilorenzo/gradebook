<?php

use Illuminate\Support\Facades\Route;

require __DIR__ . '/api/auth.php';

Route::middleware('auth:sanctum')->group(function () {
  require __DIR__ . '/api/courses.php';
  require __DIR__ . '/api/attendances.php';
  require __DIR__ . '/api/schedules.php';
  require __DIR__ . '/api/materials.php';
  require __DIR__ . '/api/dashboard.php';
  require __DIR__ . '/api/tasks.php';
  require __DIR__ . '/api/users.php';
  require __DIR__ . '/api/academy.php';
  require __DIR__ . '/api/assignments.php';
});
