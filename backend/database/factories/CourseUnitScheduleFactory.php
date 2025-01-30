<?php

namespace Database\Factories;

use App\Models\Course;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Support\Facades\DB;

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
        // Get a random pivot record
        $pivotRecord = DB::table('course_unit_user')->inRandomOrder()->firstOrFail();

        // Get the course
        $course = Course::find($pivotRecord->course_id);

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
            'user_id' => $pivotRecord->user_id,
            'course_id' => $pivotRecord->course_id,
            'course_unit_id' => $pivotRecord->course_unit_id,
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
