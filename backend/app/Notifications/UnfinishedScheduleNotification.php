<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class UnfinishedScheduleNotification extends Notification
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
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'schedule_id' => $this->schedule->id,
            'title' => "Remember to finish the \"{$this->schedule->courseUnit->name}\" lesson!",
            'course' => $this->schedule->course->name,
            'course_unit' => $this->schedule->courseUnit->name,
            'end_datetime' => $this->schedule->end_datetime,
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     *
     * @param object $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => "Remember to finish the \"{$this->schedule->courseUnit->name}\" lesson!",
        ]);
    }
}
