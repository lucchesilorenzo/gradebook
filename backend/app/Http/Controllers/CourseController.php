<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

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

    /**
     * Get student's grades for a course unit.
     *
     * @param string $courseSlug
     * @param string $courseUnitSlug
     * @param Student $student
     * @return JsonResponse
     */
    public function getStudentGradesForUnit(
        string $courseSlug,
        string $courseUnitSlug,
        Student $student
    ): JsonResponse {
        try {
            $course = Course::where('slug', $courseSlug)->firstOrFail();

            $courseUnit = $course->units()
                ->where('slug', $courseUnitSlug)
                ->firstOrFail();

            $grades = $student->assignments()
                ->where('course_id', $course->id)
                ->where('course_unit_id', $courseUnit->id)
                ->whereNotNull('grade')
                ->get()
                ->map(function ($assignment) {
                    return [
                        'id' => $assignment->id,
                        'title' => $assignment->title,
                        'grade' => $assignment->pivot->grade,
                        'notes' => $assignment->pivot->notes,
                        'date' => $assignment->pivot->updated_at,
                    ];
                });

            return response()->json([
                'student' => [
                    'id' => $student->id,
                    'first_name' => $student->first_name,
                    'last_name' => $student->last_name,
                ],
                'grades' => $grades,
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get student grades for unit.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
