<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAssignmentRequest;
use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Http\JsonResponse;

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

            $assignment = Assignment::create([
                ...$validatedAssignment,
                'user_id' => auth()->id(),
                'course_id' => $course->id,
                'course_unit_id' => $courseUnit->id,
            ]);

            return response()->json([
                'assignment' => $assignment,
                'message' => 'Assignment created successfully.',
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not create assignments.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
