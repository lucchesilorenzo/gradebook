<?php

namespace Database\Seeders;

use App\Models\Academy;
use App\Models\Course;
use App\Models\CourseUnit;
use App\Models\CourseUnitSchedule;
use App\Models\Student;
use App\Models\Tutor;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create one Academy
        Academy::factory(1)->create();

        // Create 5 Tutors
        Tutor::factory(5)->create();

        // Create 5 Courses with custom configuration
        $courses = Course::factory(5)->configure()->create();
        $randomCourses = $courses->random(rand(3, $courses->count()));

        // Create 20 Students (not associated yet with courses)
        Student::factory(20)->create();

        // Create 5 Users 
        $users = User::factory(5)->create();

        // Create 5 Course Units
        $units = CourseUnit::factory(5)->configure()->create();

        // Attach courses to users
        $users->each(function ($user) use ($randomCourses) {
            $user->courses()->attach($randomCourses);
        });

        // Attach units to courses and users via pivot table course_unit_user
        $users->each(function ($user) use ($randomCourses, $units) {
            $randomCourses->each(function ($course) use ($user, $units) {
                $randomUnits = $units->random(rand(3, $units->count()));

                $randomUnits->each(function ($unit) use ($course, $user) {
                    DB::table('course_unit_user')->insert([
                        'course_id' => $course->id,
                        'course_unit_id' => $unit->id,
                        'user_id' => $user->id,
                    ]);
                });
            });
        });

        // Create 200 CourseUnitSchedules
        CourseUnitSchedule::factory(200)->create();
    }
}
