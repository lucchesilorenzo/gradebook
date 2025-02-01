<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\CourseUnit;
use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Attendance>
 */
class AttendanceFactory extends Factory
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
            'student_id' => Student::inRandomOrder()->first()->id,
            'course_id' => Course::inRandomOrder()->first()->id,
            'course_unit_id' => CourseUnit::inRandomOrder()->first()->id,
            'date' => fake()->date(),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'status' => fake()->randomElement(['PRESENT', 'ABSENT']),
        ];
    }
}
