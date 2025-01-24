<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Get dashboard summary data.
     *
     * @return JsonResponse
     */
    public function getDashboardSummaryData(): JsonResponse
    {
        try {
            // Get authenticated user
            $user = auth()->user();

            // Get current date
            $today = now();

            // Get courses count
            $coursesCount = $user->courses()->count();

            // Get total students
            $totalStudents = $user->courses()
                ->withCount('students')
                ->get()
                ->sum('students_count');

            // Get next lesson
            $nextLesson = $user->schedules()
                ->with([
                    'courseUnit' => function ($query) {
                        $query->select('id', 'name');
                    },
                    'course' => function ($query) {
                        $query->select('id', 'name');
                    }
                ])
                ->select('start_datetime', 'course_id', 'course_unit_id')
                ->where('start_datetime', '>=', $today)
                ->orderBy('start_datetime', 'asc')
                ->firstOrFail();

            return response()->json([
                'courses_count' => $coursesCount,
                'total_students' => $totalStudents,
                'next_lesson' => $nextLesson,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get dashboard card data.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
