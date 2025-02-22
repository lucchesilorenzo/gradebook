<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAssignmentRequest;
use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class AssignmentController extends Controller
{
    /**
     * Get assignments.
     *
     * @param string $courseSlug
     * @param string $courseUnitSlug
     * @return JsonResponse
     */
    public function getAssignments(string $courseSlug, string $courseUnitSlug): JsonResponse
    {
        try {
            $user = auth()->user();

            $course = Course::where('slug', $courseSlug)->firstOrFail();

            $courseUnit = $course->units()
                ->where('slug', $courseUnitSlug)
                ->firstOrFail();

            $assignments = $user->assignments()
                ->where('course_id', $course->id)
                ->where('course_unit_id', $courseUnit->id)
                ->get();

            return response()->json($assignments);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get assignments.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get assignment.
     *
     * @param string $assignmentSlug
     * @return JsonResponse
     */
    public function getAssignment(
        string $courseSlug,
        string $courseUnitSlug,
        string $assignmentSlug
    ): JsonResponse {
        try {
            $user = auth()->user();

            $course = Course::where('slug', $courseSlug)->firstOrFail();

            $courseUnit = $course->units()
                ->where('slug', $courseUnitSlug)
                ->firstOrFail();

            $assignment = $user->assignments()
                ->where('course_id', $course->id)
                ->where('course_unit_id', $courseUnit->id)
                ->where('slug', $assignmentSlug)
                ->firstOrFail();

            $assignmentWithStudents = $assignment->toArray();
            $assignmentWithStudents['assignment_table'] = $assignment->students;

            return response()->json($assignmentWithStudents);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not get assignment.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create an assignment.
     *
     * @param CreateAssignmentRequest $request
     * @param string $courseSlug
     * @param string $courseUnitSlug
     * @return JsonResponse
     */
    public function createAssignment(
        CreateAssignmentRequest $request,
        string $courseSlug,
        string $courseUnitSlug,
    ): JsonResponse {
        // Validation
        $validatedAssignment = $request->validated();

        try {
            // Get course 
            $course = Course::where('slug', $courseSlug)->firstOrFail();

            // Get course unit
            $courseUnit = $course->units()
                ->where('slug', $courseUnitSlug)
                ->firstOrFail();

            // Create assignment
            $assignment = Assignment::create([
                ...$validatedAssignment,
                'slug' => Str::slug($validatedAssignment['title'] . '-' . Str::uuid()),
                'user_id' => auth()->id(),
                'course_id' => $course->id,
                'course_unit_id' => $courseUnit->id,
            ]);

            // Attach students to assignment
            $course->students->each(function ($student) use ($assignment) {
                $assignment->students()->attach($student->id);
            });

            return response()->json([
                'assignment' => $assignment,
                'message' => 'Assignment created successfully.',
            ], 201);
        } catch (\Throwable $e) {
            if ($e->getCode() === '23505') {
                return response()->json([
                    'message' => 'Assignment already exists.',
                    'error' => $e->getMessage(),
                ], 409);
            }

            return response()->json([
                'message' => 'Could not create assignments.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
