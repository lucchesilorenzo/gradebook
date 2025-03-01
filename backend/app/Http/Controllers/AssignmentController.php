<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAssignmentRequest;
use App\Http\Requests\UpdateAssignmentStudentRecord;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\Student;
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
                ->with('students')
                ->get();

            $assignments->each(function ($assignment) {
                $assignment->submission_count = $assignment->students
                    ->whereNotNull('pivot.grade')
                    ->count();
            });

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
                ->with('students')
                ->firstOrFail();

$assignment->submission_count = $assignment->students
                ->whereNotNull('pivot.grade')
                ->count();

            return response()->json($assignment);
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

    /**
     * Update assignment student record.
     *
     * @param UpdateAssignmentStudentRecord $request
     * @param Assignment $assignment
     * @param Student $student
     * @return JsonResponse
     */
    public function updateAssignmentStudentRecord(
        UpdateAssignmentStudentRecord $request,
        Assignment $assignment,
        Student $student
    ): JsonResponse {
        // Validation
        $validatedData = $request->validated();

        try {
            // Update assignment student record
            $assignment->students()->updateExistingPivot($student->id, $validatedData);

            return response()->json([
                'message' => 'Assignment student record updated successfully.',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not update assignment student record.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
