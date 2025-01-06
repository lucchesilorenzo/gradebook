<?php

namespace App\Http\Controllers;

use App\Models\CourseUnitSchedule;
use Illuminate\Http\JsonResponse;

class CourseUnitScheduleController extends Controller
{
    /**
     * Get all course unit schedules.
     *
     * @return JsonResponse
     */
    public function getSchedules(): JsonResponse
    {
        try {
            $schedules = CourseUnitSchedule::with([
                'course' => fn($query) => $query->select('id', 'course_code'),
                'courseUnit' => fn($query) => $query->select('id', 'name'),
            ])->get();

            return response()->json($schedules);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get course unit schedules.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
