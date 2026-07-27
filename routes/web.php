<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\AdminUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function (\Illuminate\Http\Request $request) {
    $query = \App\Models\JobOffer::with(['company:id,name,logo_url,website_url', 'source:id,name'])
        ->select('job_offers.id', 'company_id', 'source_internal_id', 'title', 'description', 'location', 'country', 'is_remote', 'contract_type', 'date_of_publi', 'salary_min', 'salary_max', 'salary_currency', 'salary_period', 'job_offers.created_at');

    $filters = $request->only(['search', 'location', 'contract_type', 'remote_only', 'salary_min', 'sort']);

    if (!empty($filters['search'])) {
        $query->where(function ($q) use ($filters) {
            $q->where('title', 'ilike', '%' . $filters['search'] . '%')
              ->orWhereHas('company', function ($q2) use ($filters) {
                  $q2->where('name', 'ilike', '%' . $filters['search'] . '%');
              });
        });
    }

    if (!empty($filters['location'])) {
        $query->where('location', 'ilike', '%' . $filters['location'] . '%');
    }

    if (!empty($filters['contract_type'])) {
        $query->where('contract_type', $filters['contract_type']);
    }

    if (!empty($filters['remote_only']) && $filters['remote_only'] === 'true') {
        $query->where('is_remote', true);
    }

    if (!empty($filters['salary_min'])) {
        $query->where('salary_min', '>=', (int) $filters['salary_min']);
    }

    if (!empty($filters['sort']) && $filters['sort'] === 'relevance') {
        if (!empty($filters['search'])) {
            // Sort by whether title matches search term first, then by date
            $query->orderByRaw("CASE WHEN title ILIKE ? THEN 1 ELSE 2 END", ['%' . $filters['search'] . '%'])
                  ->orderBy('job_offers.created_at', 'desc')
                  ->orderBy('job_offers.id', 'desc');
        } else {
            // "Relevance" without search -> Recommend highest salary jobs first (ignore NULLs)
            $query->orderByRaw('salary_max DESC NULLS LAST')
                  ->orderBy('job_offers.created_at', 'desc')
                  ->orderBy('job_offers.id', 'desc');
        }
    } else {
        $query->orderBy('job_offers.created_at', 'desc')
              ->orderBy('job_offers.id', 'desc');
    }

    $jobs = $query->take(50)->get();

    $savedJobIds = [];
    if ($user = $request->user()) {
        $savedJobIds = $user->savedJobs()->pluck('job_offers.id')->toArray();
    }

    return Inertia::render('Discover', [
        'jobs' => $jobs,
        'savedJobIds' => $savedJobIds,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'filters' => (object) $filters,
    ]);
});

//Route::get('/jobs/{job}', function (\App\Models\JobOffer $job) {
  //  $job->load(['company', 'source']);

  //  return Inertia::render('JobDetail', [
   //     'job' => $job,
   // ]);
//})->name('jobs.show');

Route::get('/dashboard', function () {
    return redirect('/');
})->middleware(['auth', 'verified'])->name('dashboard');

//route public pour afficher les offres d'emploi et les détails d'une offre
Route::get('/jobs', [JobController::class, 'index'])->name('jobs.index');
Route::get('/jobs/{id}', [JobController::class, 'show'])->name('jobs.show');

Route::get('/saved', function (\Illuminate\Http\Request $request) {
    $user = $request->user();
    $favorites = $user->savedJobs()->with(['company', 'source'])->get();
    
    // Fetch history (views) and map to the actual jobOffer relationship
    $historyViews = $user->offerViews()->with(['jobOffer.company', 'jobOffer.source'])->latest('viewed_at')->get();
    $history = $historyViews->map(function ($view) {
        return $view->jobOffer;
    })->filter();

    return Inertia::render('Saved', [
        'favorites' => $favorites,
        'history' => $history
    ]);
})->middleware('auth')->name('saved');

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
