<?php

namespace Database\Factories;

use App\Models\CourseUnit;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseUnitMaterial>
 */
class CourseUnitMaterialFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => Course::inRandomOrder()->first()->id,
            'course_unit_id' => CourseUnit::inRandomOrder()->first()->id,
            'title' => fake()->sentence(),
            'description' => fake()->sentence(),
            'type' => fake()->randomElement(['PDF', 'VIDEO', 'LINK']),
            'file' => null,
            'url' => fake()->url(),
        ];
    }
}
