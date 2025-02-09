<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Course extends Model
{
    use HasUuids, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'coordinator_id',
        'name',
        'slug',
        'course_code',
        'description',
        'max_students',
        'start_date',
        'end_date',
        'status',
    ];

    /**
     * Get all the teachers the course belongs to.
     *
     * @return BelongsToMany
     */
    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'course_user');
    }

    /**
     * Get all the students the course belongs to.
     *
     * @return HasMany
     */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }

    /**
     * Get all the units the course belongs to.
     *
     * @return BelongsToMany
     */
    public function units(): BelongsToMany
    {
        return $this->belongsToMany(CourseUnit::class, 'course_unit_user');
    }

    /**
     * Get the tutor for the course.
     *
     * @return BelongsTo
     */
    public function tutor(): BelongsTo
    {
        return $this->belongsTo(Tutor::class);
    }

    /**
     * Get all the attendances for the course.
     *
     * @return HasMany
     */
    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    /**
     * Get all the course unit schedules for the course.
     *
     * @return HasMany
     */
    public function schedules(): HasMany
    {
        return $this->hasMany(CourseUnitSchedule::class);
    }

    /**
     * Get all the course unit materials for the course.
     *
     * @return HasMany
     */
    public function materials(): HasMany
    {
        return $this->hasMany(CourseUnitMaterial::class);
    }

    /**
     * Get all the assignments for the course.
     *
     * @return HasMany
     */
    public function assignments(): HasMany
    {
        return $this->hasMany(Assignment::class);
    }
}
