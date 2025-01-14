<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('tasks')->group(function () {
  Route::get('/', [TaskController::class, 'getTasks']);
  Route::delete('/{task}', [TaskController::class, 'deleteTask']);
});
