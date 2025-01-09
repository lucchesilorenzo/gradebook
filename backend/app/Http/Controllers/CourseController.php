<?php

namespace App\Http\Controllers;

use App\Models\Course;
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
                ->with(['students', 'units', 'tutor'])
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
            $teacherCourse = Course::where('slug', $courseSlug)
                ->with(['students', 'units', 'tutor'])
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
