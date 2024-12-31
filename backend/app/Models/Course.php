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
        return $this->belongsToMany(User::class);
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
        return $this->belongsToMany(CourseUnit::class);
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
}
