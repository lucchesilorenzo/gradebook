<?php

namespace App\Console\Commands;

use App\Models\Attendance;
use App\Models\CourseUnitSchedule;
use App\Notifications\UnfinishedScheduleNotification;
use Illuminate\Console\Command;

class NotifyUnfinishedSchedules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:unfinished-schedules';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notify teachers about unfinished schedules';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $now = now();
            $tenMinutesAgo = $now->copy()->subMinutes(10);

            // Get all the schedules that are not finished
            $schedules = CourseUnitSchedule::where('end_datetime', $tenMinutesAgo)->get();

            foreach ($schedules as $schedule) {
                $user = $schedule->teacher;

                $unfinishedSchedules = Attendance::where('user_id', $user->id)
                    ->where('course_id', $schedule->course_id)
                    ->where('course_unit_id', $schedule->course_unit_id)
                    ->whereDate('date', $now)
                    ->whereNull('end_time')
                    ->exists();

                if ($unfinishedSchedules) {
                    $user->notify(new UnfinishedScheduleNotification($schedule));
                }

                $this->info("Notification sent to user {$user->first_name} {$user->last_name} for schedule {$schedule->id}");
            }
        } catch (\Throwable $e) {
            $this->error('Error sending notification: ' . $e->getMessage());
        }
    }
}
