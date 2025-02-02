<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Academy>
 */
class AcademyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'email' => fake()->unique()->safeEmail(),
            'phone_number' => fake()->unique()->e164PhoneNumber(),
            'address' => fake()->address(),
            'website' => fake()->url(),
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): self
    {
        return $this->state(new Sequence(
            [
                'name' => 'ITS Prodigi',
                'email' => 'info@itsprodigi.it',
                'phone_number' => '+3905711510978',
                'address' => 'Via della Piovola 138, Empoli (FI)',
                'website' => 'https://itsprodigi.it',
            ]
        ));
    }
}
