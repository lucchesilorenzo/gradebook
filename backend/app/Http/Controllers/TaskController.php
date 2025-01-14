<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
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
     * Create a task.
     *
     * @param CreateTaskRequest $request
     * @return JsonResponse
     */
    public function createTask(CreateTaskRequest $request): JsonResponse
    {
        $validatedData = $request->validated();

        try {
            $task = auth()->user()->tasks()->create($validatedData);

            return response()->json([
                'task' => $task,
                'message' => 'Task created successfully.',
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not create task.',
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
            $task->completed = true;
            $task->save();

            return response()->json([
                'message' => 'Task deleted successfully.',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not delete task.',
            ], 500);
        }
    }
}
