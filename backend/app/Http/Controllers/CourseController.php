<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class CourseController extends Controller
{
    /**
     * Get teacher's courses.
     *
     * @return JsonResponse
     */
    public function getTeacherCourses(): JsonResponse
    {
        try {
            $courses = auth()->user()->courses()
                ->with(['students', 'units'])
                ->get();

            return response()->json($courses);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get teacher courses.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
