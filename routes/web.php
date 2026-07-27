<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\AdminUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $jobs = \App\Models\JobOffer::with(['company'])
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

//Route::get('/jobs/{job}', function (\App\Models\JobOffer $job) {
  //  $job->load(['company', 'source']);

  //  return Inertia::render('JobDetail', [
   //     'job' => $job,
   // ]);
//})->name('jobs.show');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

//route public pour afficher les offres d'emploi et les détails d'une offre
Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{id}', [JobController::class, 'show'])->name('jobs.show');

Route::get('/saved', function () {
    return Inertia::render('Saved');
})->name('saved');

Route::get('/insights', function () {
    return Inertia::render('SalaryInsights');
})->name('insights');

Route::get('/settings', function () {
    return Inertia::render('Settings');
})->name('settings');


//route pour les utilisateurs authentifiés
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Admin Dashboard & Users (Temporary direct access for testing)
Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->name('admin.dashboard');


//commenter les route avant rendue final 
Route::get('/admin/users', function () {
    return Inertia::render('Admin/Users');
})->name('admin.users.preview');

Route::get('/admin/jobs', function () {
    return Inertia::render('Admin/Jobs');
})->name('admin.jobs.preview');

Route::get('/admin/admins', function () {
    return Inertia::render('Admin/Admins');
})->name('admin.admins.preview');

// Admin routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    //modif ou suppression d'un utilisateur
    Route::get('/admin/users', [AdminUserController::class, 'index'])->name('admin.users.index');
    Route::get('/admin/users/create', [AdminUserController::class, 'create'])->name('admin.users.create');
    Route::post('/admin/users', [AdminUserController::class, 'store'])->name('admin.users.store');


    Route::put('/admin/users/{id}', [AdminUserController::class, 'update'])->name('admin.users.update');
    Route::delete('/admin/users/{id}', [AdminUserController::class, 'destroy'])->name('admin.users.destroy');  
    Route::patch('/admin/users/{id}/changeRole', [AdminUserController::class, 'changeRole'])->name('admin.users.changeRole');
    //suppression d'une offre d'emploi
    Route::delete('/admin/jobs/{id}', [JobController::class, 'destroy'])->name('admin.jobs.destroy');
});

require __DIR__.'/auth.php';
