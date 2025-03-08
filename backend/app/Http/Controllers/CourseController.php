<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateStudentDeskPositionRequest;
use App\Models\Course;
use App\Models\Student;
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

    /**
     * Get course students.
     *
     * @param string $courseSlug
     * @return JsonResponse
     */
    public function getCourseStudents(string $courseSlug): JsonResponse
    {
        try {
            $course = Course::where('slug', $courseSlug)->firstOrFail();

            $courseStudents = $course->students()->get();

            return response()->json($courseStudents);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get course students.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update student desk position.
     *
     * @param string $courseSlug
     * @return JsonResponse
     */
    public function updateStudentDeskPosition(
        UpdateStudentDeskPositionRequest $request,
        string $courseSlug,
        Student $student
    ): JsonResponse {
        // Validation
        $validatedData = $request->validated();

        try {
            $course = Course::where('slug', $courseSlug)->firstOrFail();

            $student = $course->students()->findOrFail($student->id);

            $student->update([
                'desk_position' => $validatedData,
            ]);

            return response()->json([
                'message' => 'Student desk position updated successfully.',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not update student desk position.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
