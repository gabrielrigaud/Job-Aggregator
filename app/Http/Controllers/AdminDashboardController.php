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

        $registrations = User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(6))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get()
            ->pluck('count', 'date');

        $platformGrowth = [];
        for ($i = 6; $i >= 0; $i--) {
            $dateObj = now()->subDays($i);
            $dateStr = $dateObj->format('Y-m-d');
            $platformGrowth[] = [
                'date' => $dateObj->format('M d'),
                'count' => $registrations[$dateStr] ?? 0,
            ];
        }

        $totalUsers = User::count();
        $rolesCount = \DB::table('model_has_roles')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('model_type', User::class)
            ->select('roles.name', \DB::raw('count(*) as count'))
            ->groupBy('roles.name')
            ->pluck('count', 'name');

        $adminsCount = $rolesCount['admin'] ?? 0;
        $recruitersCount = $rolesCount['recruiter'] ?? 0;
        // Anyone who isn't an admin or recruiter is considered a candidate
        $candidatesCount = max(0, $totalUsers - $adminsCount - $recruitersCount);

        $roleDistribution = [
            'candidates' => $totalUsers > 0 ? round(($candidatesCount / $totalUsers) * 100) : 0,
            'recruiters' => $totalUsers > 0 ? round(($recruitersCount / $totalUsers) * 100) : 0,
            'admins' => $totalUsers > 0 ? round(($adminsCount / $totalUsers) * 100) : 0,
        ];

        // Active sessions in the last 15 minutes
        $activeSessions = \DB::table('sessions')
            ->where('last_activity', '>=', now()->subMinutes(15)->getTimestamp())
            ->count();

        $pendingRoles = User::doesntHave('roles')->count();

        // Growth last 30 days vs previous
        $usersThisMonth = User::where('created_at', '>=', now()->subDays(30))->count();
        $usersLastMonth = User::whereBetween('created_at', [now()->subDays(60), now()->subDays(30)])->count();
        $growth = $usersLastMonth > 0 ? round((($usersThisMonth - $usersLastMonth) / $usersLastMonth) * 100, 1) : 100;
        $growthSign = $growth >= 0 ? '+' : '';

        $stats = [
            'totalUsers' => number_format($totalUsers),
            'activeNow' => $activeSessions,
            'pendingRoles' => $pendingRoles,
            'growth' => $growthSign . $growth . '%',
            'isGrowthPositive' => $growth >= 0,
        ];

        // Calculate a dynamic System Health based on failed jobs (just as an example of a real metric)
        try {
            $failedJobsCount = \Illuminate\Support\Facades\DB::table('failed_jobs')->count();
            $health = 100 - ($failedJobsCount * 0.5); // Minus 0.5% for each failed job
            $stats['systemHealth'] = number_format(max(0, $health), 1) . '%';
        } catch (\Exception $e) {
            $stats['systemHealth'] = '100.0%'; // Fallback if table doesn't exist
        }

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'platformGrowth' => $platformGrowth,
            'roleDistribution' => $roleDistribution,
            'stats' => $stats
        ]);
    }

    public function jobs(): Response
    {
        $jobs = JobOffer::with('company', 'source')->orderBy('created_at', 'desc')->paginate(10)->through(function ($job) {
            return [
                'id' => $job->id,
                'title' => $job->title,
                'company' => $job->company->name ?? 'Unknown',
                'location' => $job->location ?? 'Remote',
                'status' => 'Active', 
                'salary_range' => $job->salary_min ? '$' . number_format($job->salary_min) . ' - $' . number_format($job->salary_max) : 'N/A',
                'views' => $job->offerViews()->count(),
                'date' => $job->date_of_publi ? Carbon::parse($job->date_of_publi)->format('M d, Y') : $job->created_at->format('M d, Y'),
            ];
        });

        $avgSalary = JobOffer::whereNotNull('salary_min')->avg('salary_min');

        $stats = [
            'totalActive' => number_format(JobOffer::count()),
            'pendingReview' => 0,
            'flagged' => 0,
            'averageSalary' => $avgSalary ? '$' . number_format($avgSalary) : 'N/A',
        ];

        // Audit Logs (using 3 most recent jobs)
        $auditLogs = JobOffer::with('company')->orderBy('created_at', 'desc')->take(3)->get()->map(function ($job) {
            return [
                'id' => $job->id,
                'message' => 'Listing <span class="font-semibold">"' . \Illuminate\Support\Str::limit($job->title, 30) . '"</span> imported from <span class="text-primary">' . ($job->company->name ?? 'Unknown') . '</span>',
                'time' => $job->created_at->diffForHumans(),
                'icon' => 'check_circle',
                'color' => 'green',
            ];
        });

        // Moderation Health
        $totalJobs = JobOffer::count();
        $jobsWithSalary = JobOffer::whereNotNull('salary_min')->count();
        $queueClearance = $totalJobs > 0 ? round(($jobsWithSalary / $totalJobs) * 100) : 100;
        
        $todayJobs = JobOffer::where('created_at', '>=', now()->subDays(1))->count();
        $responseTime = $todayJobs > 0 ? round(24 / $todayJobs, 1) . 'h avg' : 'N/A';

        $healthStats = [
            'clearance' => $queueClearance,
            'response' => $responseTime,
            'responsePercent' => $todayJobs > 0 ? min(100, round(($todayJobs / 50) * 100)) : 0, // Mock progress bar
            'message' => $queueClearance > 50 ? '"Salary extraction rate is healthy. Keep maintaining high standards for listing quality."' : '"Salary extraction rate is low. Check scraper configurations."'
        ];

        return Inertia::render('Admin/Jobs', [
            'jobs' => $jobs,
            'stats' => $stats,
            'auditLogs' => $auditLogs,
            'healthStats' => $healthStats,
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

    public function addExistingUser(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email']
        ]);

        $userToPromote = User::where('email', $validated['email'])->first();

        if (!$userToPromote) {
            return redirect()->back()->with('error', 'User not found with this email address.');
        }

        if ($userToPromote->hasRole('admin')) {
            return redirect()->back()->with('error', 'User is already an admin.');
        }

        $userToPromote->syncRoles(['admin']);

        return redirect()->back()->with('success', 'User promoted to admin successfully.');
    }

    public function updateRole(Request $request, User $user)
    {
        // For now, simply ensure they have an allowed role
        $validated = $request->validate([
            'role' => ['required', 'string', 'in:admin,user']
        ]);

        // Prevent changing own role to avoid locking oneself out
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot change your own role.');
        }

        if ($validated['role'] === 'user') {
            $user->removeRole('admin');
        } else {
            $user->syncRoles([$validated['role']]);
        }

        return redirect()->back()->with('success', 'Admin role updated successfully.');
    }

    public function revokeAdmin(User $user)
    {
        // Prevent revoking oneself
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'You cannot revoke your own admin rights.');
        }

        // Revoke admin rights by removing the admin role
        $user->removeRole('admin');

        return redirect()->back()->with('success', 'Admin rights revoked successfully.');
    }
}
