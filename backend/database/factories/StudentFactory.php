<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = Faker::create('it_IT');

        return [
            'course_id' => Course::inRandomOrder()->first()->id,
            'first_name' => fake()->firstName(),
            'last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'tax_id' => $faker->unique()->taxId(),
            'phone_number' => fake()->unique()->e164PhoneNumber(),
            'gender' => fake()->randomElement(['MALE', 'FEMALE']),
            'attendance_rate' => 0,
            'desk_position' => null,
        ];
    }
}
