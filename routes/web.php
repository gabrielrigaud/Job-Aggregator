<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $jobs = \App\Models\JobOffer::with(['company:id,name,logo_url,website_url', 'source:id,name'])
        ->select('id', 'company_id', 'source_internal_id', 'title', 'description', 'location', 'country', 'is_remote', 'contract_type', 'date_of_publi', 'salary_min', 'salary_max', 'salary_currency', 'salary_period', 'created_at')
        ->latest()
        ->take(50)
        ->get();

    return Inertia::render('Discover', [
        'jobs' => $jobs,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/jobs/{job}', function (\App\Models\JobOffer $job) {
    $job->load(['company', 'source']);

    return Inertia::render('JobDetail', [
        'job' => $job,
    ]);
})->name('jobs.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
