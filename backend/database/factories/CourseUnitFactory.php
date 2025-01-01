<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseUnit>
 */
class CourseUnitFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'slug' => fn(array $attributes) => Str::slug($attributes['name']),
            'description' => fake()->sentence(),
            'theory_hours' => fake()->randomDigit(),
            'lab_hours' => fake()->randomDigit(),
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
                'name' => 'Algorithms',
                'slug' => 'algorithms',
                'description' => 'This course covers the fundamental concepts of algorithms, focusing on problem-solving and efficiency.',
                'theory_hours' => 60,
                'lab_hours' => 40,
            ],
            [
                'name' => 'Data Structures',
                'slug' => 'data-structures',
                'description' => 'Learn about the organization and manipulation of data using various structures like arrays, trees, and graphs.',
                'theory_hours' => 80,
                'lab_hours' => 20,
            ],
            [
                'name' => 'Operating System',
                'slug' => 'operating-system',
                'description' => 'Understand the architecture and management of operating systems, focusing on processes, memory, and file systems.',
                'theory_hours' => 70,
                'lab_hours' => 30,
            ],
            [
                'name' => 'Computer Networks',
                'slug' => 'computer-networks',
                'description' => 'Study the principles of computer networks, including network protocols, security, and communication models.',
                'theory_hours' => 100,
                'lab_hours' => 0,
            ],
            [
                'name' => 'Database',
                'slug' => 'database',
                'description' => 'Explore the design, implementation, and optimization of databases, with a focus on relational and non-relational models.',
                'theory_hours' => 50,
                'lab_hours' => 50,
            ],
        ));
    }
}
