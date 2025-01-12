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
            $teacherCourses = auth()->user()->courses()
                ->with(['students', 'units.schedules', 'tutor'])
                ->get();

            return response()->json($teacherCourses);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get teacher courses.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get teacher's course.
     *
     * @param string $courseSlug
     * @return JsonResponse
     */
    public function getTeacherCourse(string $courseSlug): JsonResponse
    {
        try {
            $teacherCourse = auth()->user()->courses()
                ->where('slug', $courseSlug)
                ->with(['students', 'units.schedules', 'tutor'])
                ->firstOrFail();

            return response()->json($teacherCourse);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get teacher course.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
