<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [JobController::class, 'discover'])->name('home');
Route::redirect('/dashboard', '/')->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/jobs/{id}', [JobController::class, 'show'])->name('jobs.show');
Route::get('/insights', [JobController::class, 'insights'])->name('insights');

Route::middleware('auth')->group(function () {
    Route::get('/saved', [JobController::class, 'saved'])->name('saved');
    Route::inertia('/settings', 'Settings')->name('settings');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/jobs/{job}/toggle-save', [JobController::class, 'toggleSave'])->name('jobs.toggle-save');
    Route::post('/jobs/{job}/view', [JobController::class, 'logView'])->name('jobs.log-view');
});

Route::middleware(['auth', 'role:admin'])->prefix('panel')->name('admin.')->group(function () {
    Route::redirect('/', '/panel/dashboard');
    Route::get('/dashboard', [AdminDashboardController::class, 'dashboard'])->name('dashboard');
    Route::get('/users', [AdminDashboardController::class, 'users'])->name('users.preview');
    Route::get('/jobs', [AdminDashboardController::class, 'jobs'])->name('jobs.preview');
    Route::get('/admins', [AdminDashboardController::class, 'admins'])->name('admins.preview');

    Route::delete('/users/{user}', [AdminDashboardController::class, 'destroyUser'])->name('users.destroy');
    Route::delete('/jobs/{job}', [AdminDashboardController::class, 'destroyJob'])->name('jobs.destroy');

    Route::post('/users', [AdminUserController::class, 'store'])->name('users.store');
    Route::put('/users/{id}', [AdminUserController::class, 'update'])->name('users.update');
    Route::patch('/users/{id}/changeRole', [AdminUserController::class, 'changeRole'])->name('users.changeRole');

    Route::post('/admins/add-existing', [AdminDashboardController::class, 'addExistingUser'])->name('admins.addExisting');
    Route::patch('/admins/{user}/role', [AdminDashboardController::class, 'updateRole'])->name('admins.updateRole');
    Route::delete('/admins/{user}/revoke', [AdminDashboardController::class, 'revokeAdmin'])->name('admins.revoke');
});

require __DIR__.'/auth.php';
