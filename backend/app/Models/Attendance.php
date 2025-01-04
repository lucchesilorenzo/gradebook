<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasUuids, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'student_id',
        'course_unit_id',
        'date',
        'start_time',
        'end_time',
        'status',
    ];

    /**
     * Update the student's attendance rate.
     *
     * @param string $studentId
     * @return void
     */
    public function updateStudentAttendanceRate(string $studentId): void
    {
        $currentStudentAttendances = Attendance::where('student_id', $studentId)->count();

        $currentStudentWithPresentAttendances = Attendance::where('student_id', $studentId)
            ->where('status', 'PRESENT')
            ->count();

        $attendanceRate = ($currentStudentWithPresentAttendances / $currentStudentAttendances) * 100;

        Student::where('id', $studentId)
            ->update(['attendance_rate' => $attendanceRate]);
    }

    /**
     * Get the student that owns the attendance.
     *
     * @return BelongsTo
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the course unit that owns the attendance.
     *
     * @return BelongsTo
     */
    public function courseUnit(): BelongsTo
    {
        return $this->belongsTo(CourseUnit::class);
    }
}
