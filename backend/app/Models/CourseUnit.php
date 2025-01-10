<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CourseUnit extends Model
{
    use HasUuids, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
    ];

    /**
     * Get all the courses the unit belongs to.
     *
     * @return BelongsToMany
     */
    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class);
    }

    /**
     * Get all the attendances the unit belongs to.
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
}
