<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('tasks')->group(function () {
  Route::get('/', [TaskController::class, 'getTasks']);
  Route::post('/', [TaskController::class, 'createTask']);
  Route::delete('/{task}', [TaskController::class, 'deleteTask']);
});
