<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('notify:upcoming-schedules')->everyMinute();
Schedule::command('notify:unfinished-schedules')->everyMinute();
