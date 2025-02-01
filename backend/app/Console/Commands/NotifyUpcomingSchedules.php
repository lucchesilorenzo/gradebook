<?php

namespace App\Console\Commands;

use App\Models\CourseUnitSchedule;
use App\Notifications\UpcomingScheduleNotification;
use Illuminate\Console\Command;

class NotifyUpcomingSchedules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:upcoming-schedules';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Notify upcoming schedules';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        try {
            $now = now();
            $tenMinutesLater = $now->copy()->addMinutes(10);

            // Get all the schedules that start in the next 10 minutes
            $schedules = CourseUnitSchedule::where('start_datetime', '>=', $now)
                ->where('start_datetime', '<=', $tenMinutesLater)
                ->whereNull('notified_at')
                ->get();

            // Send notifications to teachers
            foreach ($schedules as $schedule) {
                $user = $schedule->teacher;
                $user->notify(new UpcomingScheduleNotification($schedule));

                $schedule->update(['notified_at' => $now]);

                $this->info("Notification sent to user {$user->first_name} {$user->last_name} for schedule {$schedule->id}");
            }
        } catch (\Throwable $e) {
            $this->error('Error sending notification: ' . $e->getMessage());
        }
    }
}
