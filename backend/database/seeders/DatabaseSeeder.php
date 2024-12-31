<?php

namespace Database\Seeders;

use App\Models\Academy;
use App\Models\Course;
use App\Models\CourseUnit;
use App\Models\Student;
use App\Models\Tutor;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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

        // Create 5 Students (not associated yet with courses)
        Student::factory(5)->create();

        // Create 5 Users and attach them to the 5 created courses (via pivot table)
        User::factory(5)->hasAttached($courses)->create();

        // Create 5 CourseUnits with custom configuration and attach them to the created courses (via pivot table)
        CourseUnit::factory(5)->configure()->hasAttached($courses)->create();
    }
}
