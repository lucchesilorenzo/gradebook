<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAttendancesRequest;
use App\Http\Requests\UpdateAttendanceEndTimeRequest;
use App\Http\Requests\UpdateAttendanceRequest;
use App\Models\Attendance;
use App\Models\Course;
use App\Models\CourseUnit;
use App\Models\Student;
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
            // Get today's date
            $today = Carbon::now();

            // Check if attendance was already created
            $attendance = Attendance::where('course_unit_id', $validatedAttendances[0]['course_unit_id'])
                ->where('course_id', $validatedAttendances[0]['course_id'])
                ->whereDate('date', $today)
                ->exists();

            if ($attendance) {
                return response()->json([
                    'message' => 'Attendance was already created for today.'
                ], 400);
            }

            // Check if schedule is valid
            $courseUnit = CourseUnit::findOrFail($validatedAttendances[0]['course_unit_id']);

            $isValidSchedule = $courseUnit->schedules()
                ->where('course_id', $validatedAttendances[0]['course_id'])
                ->where('start_datetime', '<=', $today)
                ->where('end_datetime', '>=', $today)
                ->exists();

            if (!$isValidSchedule) {
                return response()->json([
                    'message' => 'Schedule for course unit is not valid.'
                ], 400);
            }

            // Create attendances
            foreach ($validatedAttendances as $attendance) {
                Attendance::create([
                    'student_id' => $attendance['id'],
                    'course_id' => $attendance['course_id'],
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
        string $courseSlug,
        string $courseUnitSlug
    ): JsonResponse {
        // Validation
        $validatedData = $request->validated();

        try {
            // Get course
            $course = Course::where('slug', $courseSlug)->firstOrFail();

            // Get course unit
            $courseUnit = $course->units()->where('slug', $courseUnitSlug)->firstOrFail();

            // Get today's date
            $today = Carbon::now();

            // Check if attendances exist
            $attendances = Attendance::where('course_unit_id', $courseUnit->id)
                ->where('course_id', $course->id)
                ->whereDate('date', $today)
                ->get();

            if ($attendances->isEmpty()) {
                return response()->json([
                    'message' => 'No attendances found for today.'
                ], 404);
            }

            // Check if all records already have an end time
            if ($attendances->every(fn($attendance) => $attendance->end_time !== null)) {
                return response()->json([
                    'message' => 'Attendance end time has already been updated for today.'
                ], 400);
            }

            // Otherwise, update only records that don't have an end time
            foreach ($attendances as $attendance) {
                if (!$attendance->end_time) {
                    // Update daily attendance end time for the course unit
                    $attendance->update(['end_time' => $validatedData['end_time']]);

                    // Update student's attendance rate
                    $attendance->updateStudentAttendanceRate($attendance->student_id);
                }
            }

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

    /**
     * Update attendance.
     *
     * @param UpdateAttendanceRequest $request
     * @param Student $student
     * @param CourseUnit $courseUnit
     * @return JsonResponse
     */
    public function updateAttendance(
        UpdateAttendanceRequest $request,
        Student $student,
        CourseUnit $courseUnit
    ): JsonResponse {
        // Validation
        $validatedData = $request->validated();

        try {
            // Get today's date (YYYY-mm-dd)
            $today = Carbon::now()->toDateString();

            // Check if attendance exists
            $attendance = Attendance::where('student_id', $student->id)
                ->where('course_unit_id', $courseUnit->id)
                ->whereDate('date', $today)
                ->first();

            if (!$attendance) {
                return response()->json([
                    'message' => 'No attendance found for today.'
                ], 404);
            }

            // -- Early departure -- 
            if ($validatedData['attendance_type'] === 'early_departure') {
                // TODO: Complete checks when course schedules are implemented
                if ($attendance->end_time !== null || $attendance->status === 'ABSENT') {
                    return response()->json([
                        'message' => 'Student is already marked as absent or lesson has already ended.'
                    ], 400);
                }

                $attendance->update([
                    'end_time' => $validatedData['time'],
                    'status' => 'ABSENT',
                ]);
                // -- Late arrival --
            } elseif ($validatedData['attendance_type'] === 'late_arrival') {
                if (
                    $validatedData['time'] < $attendance->start_time ||
                    $attendance->status === 'PRESENT'
                ) {
                    return response()->json([
                        'message' => 'Invalid late arrival time or student is already present.'
                    ], 400);
                }

                $attendance->update([
                    'start_time' => $validatedData['time'],
                    'status' => 'PRESENT',
                ]);
            }

            // Update student's attendance rate
            $attendance->updateStudentAttendanceRate($student->id);

            return response()->json([
                'message' => 'Attendance updated successfully.'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Could not update attendance.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
