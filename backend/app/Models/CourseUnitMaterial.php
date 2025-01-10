<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CourseUnitMaterial extends Model
{
    use HasUuids, HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'course_unit_id',
        'title',
        'description',
        'url',
        'file',
        'type',
    ];

    /**
     * Get the course unit that owns the course unit material.
     *
     * @return BelongsTo
     */
    public function courseUnit(): BelongsTo
    {
        return $this->belongsTo(CourseUnit::class);
    }
}
