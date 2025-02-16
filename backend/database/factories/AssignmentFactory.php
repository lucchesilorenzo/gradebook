<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\CourseUnit;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Assignment>
 */
class AssignmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'course_id' => Course::inRandomOrder()->first()->id,
            'course_unit_id' => CourseUnit::inRandomOrder()->first()->id,
            'title' => fake()->sentence(),
            'description' => fake()->sentence(),
            'deadline' => fake()->date(),
            'is_active' => true,
        ];
    }
}
