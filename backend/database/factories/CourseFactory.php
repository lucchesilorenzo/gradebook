<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'course_code' => fake()->unique()->word(),
            'description' => fake()->sentence(),
            'max_students' => fake()->randomDigit(),
            'start_date' => fake()->dateTime(),
            'end_date' => fake()->dateTime(),
            'status' => fake()->randomElement(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
        ];
    }

    /**
     * Configure the model factory.
     *
     * @return self
     */
    public function configure(): self
    {
        return $this->state(new Sequence(
            [
                'name' => 'Full Stack Developer I',
                'course_code' => 'FSD1',
                'description' => 'Full stack developer beginner course.',
                'max_students' => 25,
                'start_date' => now(),
                'end_date' => now()->addYear(),
                'status' => 'BEGINNER',
            ],
            [
                'name' => 'Full Stack Developer II',
                'course_code' => 'FSD2',
                'description' => 'Advanced full stack developer course.',
                'max_students' => 20,
                'start_date' => now()->addMonth(),
                'end_date' => now()->addYear()->addMonth(),
                'status' => 'INTERMEDIATE',
            ],
            [
                'name' => 'Web Developer',
                'course_code' => 'WEB1',
                'description' => 'Comprehensive web development course.',
                'max_students' => 30,
                'start_date' => now()->addWeeks(2),
                'end_date' => now()->addYear()->addWeeks(2),
                'status' => 'BEGINNER',
            ],
            [
                'name' => 'AI Specialist',
                'course_code' => 'AI1',
                'description' => 'Introduction to AI and machine learning.',
                'max_students' => 15,
                'start_date' => now()->addDays(10),
                'end_date' => now()->addYear()->addDays(10),
                'status' => 'INTERMEDIATE',
            ],
            [
                'name' => 'Data Scientist',
                'course_code' => 'DS1',
                'description' => 'Data science course for advanced learners.',
                'max_students' => 10,
                'start_date' => now()->addWeeks(1),
                'end_date' => now()->addYear()->addWeeks(1),
                'status' => 'ADVANCED',
            ],
        ));
    }
}
