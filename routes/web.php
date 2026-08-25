<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\AdminUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [JobController::class, 'discover'])->name('home');

Route::redirect('/dashboard', '/')->middleware(['auth', 'verified'])->name('dashboard');

//route public pour afficher les offres d'emploi et les détails d'une offre
Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{id}', [JobController::class, 'show'])->name('jobs.show');

Route::get('/saved', [JobController::class, 'saved'])->middleware('auth')->name('saved');

Route::get('/insights', [JobController::class, 'insights'])->name('insights');
Route::inertia('/settings', 'Settings')->middleware('auth')->name('settings');


//route pour les utilisateurs authentifiés
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::post('/jobs/{job}/toggle-save', [JobController::class, 'toggleSave'])->name('jobs.toggle-save');
    Route::post('/jobs/{job}/view', [JobController::class, 'logView'])->name('jobs.log-view');
});

use App\Http\Controllers\AdminDashboardController;

// Admin routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    
    // Dashboard & Views
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/users', [AdminDashboardController::class, 'users'])->name('admin.users.preview');
    Route::delete('/admin/users/{user}', [AdminDashboardController::class, 'destroyUser'])->name('admin.users.destroy');
    Route::get('/admin/jobs', [AdminDashboardController::class, 'jobs'])->name('admin.jobs.preview');
    Route::delete('/admin/jobs/{job}', [AdminDashboardController::class, 'destroyJob'])->name('admin.jobs.destroy');
    Route::get('/admin/admins', [AdminDashboardController::class, 'admins'])->name('admin.admins.preview');
    Route::post('/admin/admins/add-existing', [AdminDashboardController::class, 'addExistingUser'])->name('admin.admins.addExisting');
    Route::patch('/admin/admins/{user}/role', [AdminDashboardController::class, 'updateRole'])->name('admin.admins.updateRole');
    Route::delete('/admin/admins/{user}/revoke', [AdminDashboardController::class, 'revokeAdmin'])->name('admin.admins.revoke');

    //modif ou suppression d'un utilisateur
    Route::get('/admin/users/create', [AdminUserController::class, 'create'])->name('admin.users.create');
    Route::post('/admin/users', [AdminUserController::class, 'store'])->name('admin.users.store');


    Route::put('/admin/users/{id}', [AdminUserController::class, 'update'])->name('admin.users.update');
    Route::delete('/admin/users/{id}', [AdminUserController::class, 'destroy'])->name('admin.users.destroy');  
    Route::patch('/admin/users/{id}/changeRole', [AdminUserController::class, 'changeRole'])->name('admin.users.changeRole');
    //suppression d'une offre d'emploi
    Route::delete('/admin/jobs/{id}', [JobController::class, 'destroy'])->name('admin.jobs.destroy');
});

require __DIR__.'/auth.php';
