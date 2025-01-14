<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;

class TaskController extends Controller
{
    /**
     * Get all tasks.
     *
     * @return JsonResponse
     */
    public function getTasks(): JsonResponse
    {
        try {
            $tasks = auth()->user()->tasks()->get();
            return response()->json($tasks);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get tasks.',
            ], 500);
        }
    }

    /**
     * Delete a task.
     *
     * @param Task $task
     * @return JsonResponse
     */
    public function deleteTask(Task $task): JsonResponse
    {
        try {
            $task->delete();

            return response()->json([
                'message' => 'Task deleted successfully.',
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not delete task.',
            ], 500);
        }
    }
}
