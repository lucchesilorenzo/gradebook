<?php

namespace Database\Factories;

use App\Models\Tutor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Support\Str;

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
            'tutor_id' => Tutor::inRandomOrder()->first()->id,
            'slug' => fn(array $attributes) => Str::slug($attributes['name']),
            'course_code' => fake()->unique()->word(),
            'description' => fake()->sentence(),
            'max_students' => fake()->randomDigit(),
            'start_date' => fake()->dateTime(),
            'end_date' => fake()->dateTime(),
            'type' => fake()->randomElement(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
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
                'tutor_id' => Tutor::inRandomOrder()->first()->id,
                'slug' => 'full-stack-developer-i',
                'course_code' => 'FSD1',
                'description' => 'Full stack developer beginner course.',
                'max_students' => 25,
                'start_date' => now(),
                'end_date' => now()->addYear(),
                'type' => 'BEGINNER',
            ],
            [
                'name' => 'Full Stack Developer II',
                'tutor_id' => Tutor::inRandomOrder()->first()->id,
                'slug' => 'full-stack-developer-ii',
                'course_code' => 'FSD2',
                'description' => 'Advanced full stack developer course.',
                'max_students' => 20,
                'start_date' => now()->addMonth(),
                'end_date' => now()->addYear()->addMonth(),
                'type' => 'INTERMEDIATE',
            ],
            [
                'name' => 'Web Developer',
                'tutor_id' => Tutor::inRandomOrder()->first()->id,
                'slug' => 'web-developer',
                'course_code' => 'WEB1',
                'description' => 'Comprehensive web development course.',
                'max_students' => 30,
                'start_date' => now()->addWeeks(2),
                'end_date' => now()->addYear()->addWeeks(2),
                'type' => 'BEGINNER',
            ],
            [
                'name' => 'AI Specialist',
                'tutor_id' => Tutor::inRandomOrder()->first()->id,
                'slug' => 'ai-specialist',
                'course_code' => 'AI1',
                'description' => 'Introduction to AI and machine learning.',
                'max_students' => 15,
                'start_date' => now()->addDays(10),
                'end_date' => now()->addYear()->addDays(10),
                'type' => 'INTERMEDIATE',
            ],
            [
                'name' => 'Data Scientist',
                'tutor_id' => Tutor::inRandomOrder()->first()->id,
                'slug' => 'data-scientist',
                'course_code' => 'DS1',
                'description' => 'Data science course for advanced learners.',
                'max_students' => 10,
                'start_date' => now()->addWeeks(1),
                'end_date' => now()->addYear()->addWeeks(1),
                'type' => 'ADVANCED',
            ],
        ));
    }
}
