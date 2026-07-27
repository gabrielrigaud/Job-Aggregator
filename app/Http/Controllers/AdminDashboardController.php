<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\JobOffer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function dashboard(): Response
    {
        $totalUsers = User::count();
        $activeJobs = JobOffer::count();
        $activeAdmins = User::role('admin')->count();
        $logFile = storage_path('logs/laravel.log');
        $systemLogs = [];
        if (file_exists($logFile)) {
            $lines = file($logFile);
            $lines = array_reverse($lines);
            $parsed = 0;
            foreach ($lines as $line) {
                if (preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (.*?): (.*)/', $line, $matches)) {
                    $systemLogs[] = [
                        'date' => Carbon::parse($matches[1])->diffForHumans(),
                        'level' => explode('.', $matches[2])[1] ?? $matches[2], // local.ERROR -> ERROR
                        'message' => \Illuminate\Support\Str::limit($matches[3], 60),
                    ];
                    $parsed++;
                    if ($parsed >= 4) break;
                }
            }
        }

        $pendingJobs = \Illuminate\Support\Facades\DB::table('jobs')->count();
        $failedJobs = \Illuminate\Support\Facades\DB::table('failed_jobs')->count();
        
        $queueStats = [
            'pending' => $pendingJobs,
            'failed' => $failedJobs,
            'status' => $pendingJobs > 0 ? 'Processing' : 'Idle',
            'progress' => $pendingJobs > 0 ? 50 : 100, // Mock progress for DB queue driver since we don't know total
        ];

        $adminsPulse = User::role('admin')->inRandomOrder()->take(2)->get()->map(function ($admin) {
            return [
                'name' => explode(' ', $admin->name)[0],
                'initials' => strtoupper(substr($admin->name, 0, 2)),
                'avatar' => 'https://ui-avatars.com/api/?name=' . urlencode($admin->name) . '&background=random&color=fff',
            ];
        });

        $trendingJobs = JobOffer::with('company')->withCount('offerViews')
            ->orderByDesc('offer_views_count')
            ->orderByDesc('created_at')
            ->take(2)
            ->get()
            ->map(function ($job) {
                return [
                    'id' => $job->id,
                    'title' => \Illuminate\Support\Str::limit($job->title, 25),
                    'company' => $job->company->name ?? 'Unknown',
                    'location' => $job->location ?? 'Remote',
                    'views' => $job->offer_views_count,
                    'url' => route('admin.jobs.preview'), // Simple link to jobs list for now
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalUsers' => number_format($totalUsers),
                'activeJobs' => number_format($activeJobs),
                'activeAdmins' => number_format($activeAdmins),
                'pendingReports' => 0, // Mock for now
            ],
            'logs' => $systemLogs,
            'queue' => $queueStats,
            'adminsPulse' => $adminsPulse,
            'trendingJobs' => $trendingJobs,
        ]);
    }

    public function users(): Response
    {
        // Get all users with their roles, ordered by created_at desc
        $users = User::with('roles')->orderBy('created_at', 'desc')->get()->map(function ($user) {
            return [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->hasRole('admin') ? 'Administrator' : ucfirst($user->getRoleNames()->first() ?? 'User'),
                'dept' => $user->hasRole('admin') ? 'Management' : 'Member',
                'status' => 'Active',
                'joined' => $user->created_at->format('M d, Y'),
                'avatar' => 'https://ui-avatars.com/api/?name=' . urlencode($user->name) . '&background=random',
            ];
        });

        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    public function jobs(): Response
    {
        $jobs = JobOffer::with('company', 'source')->orderBy('created_at', 'desc')->take(200)->get()->map(function ($job) {
            return [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->company->name ?? 'Unknown',
                'location' => $job->location ?? 'Remote',
                'status' => 'Active', 
                'salary' => $job->salary_min ? '$' . number_format($job->salary_min / 1000) . 'k' : 'N/A',
                'views' => $job->offerViews()->count(),
                'date' => $job->date_of_publi ? Carbon::parse($job->date_of_publi)->format('M d, Y') : $job->created_at->format('M d, Y'),
            ];
        });

        $avgSalary = JobOffer::whereNotNull('salary_min')->avg('salary_min');

        $stats = [
            'totalActive' => number_format(JobOffer::count()),
            'pendingReview' => 0,
            'flagged' => 0,
            'averageSalary' => $avgSalary ? '$' . number_format($avgSalary / 1000) . 'k' : 'N/A',
        ];

        return Inertia::render('Admin/Jobs', [
            'jobs' => $jobs,
            'stats' => $stats,
        ]);
    }

    public function destroyJob(JobOffer $job)
    {
        $job->delete();
        return redirect()->back()->with('success', 'Job offer deleted successfully.');
    }

    public function destroyUser(User $user)
    {
        // Don't allow deleting yourself
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot delete yourself.');
        }

        $user->delete();
        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    public function admins(): Response
    {
        $admins = User::role('admin')->get()->map(function ($admin) {
            return [
                'id' => $admin->id,
                'name' => $admin->name,
                'email' => $admin->email,
                'role' => 'Administrator',
                'joined' => $admin->created_at->format('M d, Y'),
                'avatar' => 'https://ui-avatars.com/api/?name=' . urlencode($admin->name) . '&background=random',
            ];
        });

        return Inertia::render('Admin/Admins', [
            'admins' => $admins
        ]);
    }
}
