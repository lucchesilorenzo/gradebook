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
                ->with(['students', 'tutor'])
                ->get();

            $teacherCourses->each(function ($course) {
                $course->units = auth()->user()->units()
                    ->wherePivot('course_id', $course->id)
                    ->with(['schedules'])
                    ->get();
            });

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
                ->with(['students', 'tutor'])
                ->firstOrFail();

            $units = auth()->user()->units()
                ->wherePivot('course_id', $teacherCourse->id)
                ->with(['schedules'])
                ->get();

            $teacherCourse->units = $units;

            return response()->json($teacherCourse);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get teacher course.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
