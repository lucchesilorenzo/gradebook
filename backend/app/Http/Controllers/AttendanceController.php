<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAttendancesRequest;
use App\Http\Requests\UpdateAttendanceEndTimeRequest;
use App\Models\Attendance;
use App\Models\CourseUnit;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class AttendanceController extends Controller
{
    /**
     * Create attendances.
     *
     * @param CreateAttendancesRequest $request
     * @return JsonResponse
     */
    public function createAttendances(CreateAttendancesRequest $request): JsonResponse
    {
        // Validation
        $validatedAttendances = $request->validated();

        try {
            // Check if attendance was already created
            $today = Carbon::now()->toDateString();
            $courseUnit = Attendance::where('course_unit_id', $validatedAttendances[0]['course_unit_id'])
                ->whereDate('date', $today)->exists();

            if ($courseUnit) {
                return response()->json([
                    'message' => 'Attendance was already created for today.'
                ], 400);
            }

            // Create attendances
            foreach ($validatedAttendances as $attendance) {
                Attendance::create([
                    'student_id' => $attendance['id'],
                    'course_unit_id' => $attendance['course_unit_id'],
                    'date' => $attendance['date'],
                    'start_time' => $attendance['start_time'],
                    'status' => $attendance['status'] ? 'PRESENT' : 'ABSENT',
                ]);
            }

            return response()->json([
                'message' => 'Attendances created successfully.'
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not create attendances.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update attendance end time.
     *
     * @param UpdateAttendanceEndTimeRequest $request
     * @param string $courseUnitSlug
     * @return JsonResponse
     */
    public function updateAttendanceEndTime(
        UpdateAttendanceEndTimeRequest $request,
        string $courseUnitSlug
    ): JsonResponse {
        // Validation
        $validatedData = $request->validated();

        try {
            // Get course unit
            $courseUnit = CourseUnit::where('slug', $courseUnitSlug)->firstOrFail();

            // Get today's date (YYYY-mm-dd)
            $today = Carbon::now()->toDateString();

            // Check if attendances exist
            $attendances = Attendance::where('course_unit_id', $courseUnit->id)
                ->whereDate('date', $today)
                ->get();

            if ($attendances->isEmpty()) {
                return response()->json([
                    'message' => 'No attendances found for today.'
                ], 404);
            }

            // Check if end time has already been updated
            foreach ($attendances as $attendance) {
                if ($attendance->end_time !== null) {
                    return response()->json([
                        'message' => 'Attendance end time has already been updated for today.'
                    ], 400);
                }
            }

            // Update daily attendance end time for the course unit
            $attendances->each(function ($attendance) use ($validatedData) {
                $attendance->update(['end_time' => $validatedData['end_time']]);
            });

            return response()->json([
                'message' => 'Attendance end time updated successfully.'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not update attendance end time.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
