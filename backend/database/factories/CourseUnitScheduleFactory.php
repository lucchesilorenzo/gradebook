<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\CourseUnit;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseUnitSchedule>
 */
class CourseUnitScheduleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $course = Course::inRandomOrder()->first();

        // Generate a random start date between the course start date and end date
        $startDate = Carbon::parse(fake()->dateTimeBetween($course->start_date, $course->end_date));

        while ($startDate->isWeekend()) {
            $startDate = Carbon::parse(fake()->dateTimeBetween($course->start_date, $course->end_date));
        }

        // Generate a random start time between 9:00 and 16:00
        $startHour = fake()->numberBetween(9, 16);

        // Set the start time
        $startDate->setTime($startHour, 0);

        // Set the end time to be 2 hours after the start time
        $endDate = $startDate->copy()->addHours(2);

        return [
            'user_id' => User::inRandomOrder()->first()->id,
            'course_id' => $course->id,
            'course_unit_id' => CourseUnit::inRandomOrder()->first()->id,
            'start_datetime' => $startDate,
            'end_datetime' => $endDate,
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
                //
            ],
        ));
    }
}
