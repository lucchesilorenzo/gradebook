<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAttendancesRequest;
use App\Models\Attendance;
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
}
