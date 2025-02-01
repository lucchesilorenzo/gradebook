<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class UpcomingScheduleNotification extends Notification
{
    use Queueable;

    protected $schedule;

    /**
     * Create a new notification instance.
     */
    public function __construct($schedule)
    {
        $this->schedule = $schedule;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param [type] $notifiable
     * @return void
     */
    public function toDatabase(object $notifiable): array
    {
        return [
            'schedule_id' => $this->schedule->id,
            'title' => 'Lesson "' . $this->schedule->courseUnit->name . '" is starting in 10 minutes',
            'course' => $this->schedule->course->name,
            'course_unit' => $this->schedule->courseUnit->name,
            'start_datetime' => $this->schedule->start_datetime,
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     *
     * @param object $notifiable
     * @return array
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => 'Your next lesson starts in 10 minutes!',
        ]);
    }
}
