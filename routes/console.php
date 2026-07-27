<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command('jobs:fetch-indeed Développeur Paris')
    ->dailyAt('02:00')
    ->onOneServer();

Schedule::command('jobs:fetch-welovedevs --pages=5')
    ->dailyAt('02:30')
    ->onOneServer();
