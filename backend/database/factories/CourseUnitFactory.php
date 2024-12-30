<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

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
            'description' => fake()->sentence(),
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
                'description' => 'This course covers the fundamental concepts of algorithms, focusing on problem-solving and efficiency.'
            ],
            [
                'name' => 'Data Structures',
                'description' => 'Learn about the organization and manipulation of data using various structures like arrays, trees, and graphs.'
            ],
            [
                'name' => 'Operating System',
                'description' => 'Understand the architecture and management of operating systems, focusing on processes, memory, and file systems.'
            ],
            [
                'name' => 'Computer Networks',
                'description' => 'Study the principles of computer networks, including network protocols, security, and communication models.'
            ],
            [
                'name' => 'Database',
                'description' => 'Explore the design, implementation, and optimization of databases, with a focus on relational and non-relational models.'
            ],
        ));
    }
}
