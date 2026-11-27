<?php

namespace App\Services;

use App\Models\JobOffer;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AdminMetricsService
{
    public function getDashboardData(): array
    {
        $totalUsers = User::count();
        $activeJobs = JobOffer::count();
        $activeAdmins = User::role('admin')->count();

        $pendingJobs = DB::table('jobs')->count();
        $failedJobs = DB::table('failed_jobs')->count();

        return [
            'stats' => [
                'totalUsers' => number_format($totalUsers),
                'activeJobs' => number_format($activeJobs),
                'activeAdmins' => number_format($activeAdmins),
                'failedJobs' => $failedJobs,
            ],
            'logs' => $this->readRecentLogs(120),
            'queue' => [
                'pending' => $pendingJobs,
                'failed' => $failedJobs,
                'status' => $pendingJobs > 0 ? 'Processing' : 'Idle',
                'progress' => $pendingJobs > 0 ? 50 : 100,
            ],
            'adminsPulse' => User::role('admin')->take(4)->get()->map(fn ($admin) => [
                'name' => explode(' ', $admin->name)[0],
                'initials' => strtoupper(substr($admin->name, 0, 2)),
            ]),
            'trendingJobs' => JobOffer::with('company')->withCount('offerViews')
                ->orderByDesc('offer_views_count')
                ->orderByDesc('created_at')
                ->take(3)
                ->get()
                ->map(fn ($job) => [
                    'id' => $job->id,
                    'title' => Str::limit($job->title, 28),
                    'company' => $job->company->name ?? 'Unknown',
                    'location' => $job->location ?? 'Remote',
                    'views' => $job->offer_views_count,
                    'url' => route('admin.jobs.preview'),
                ]),
        ];
    }

    public function getUsersMetrics(): array
    {
        $users = User::with('roles')->orderByDesc('created_at')->get()->map(fn ($user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->hasRole('admin') ? 'Administrator' : ucfirst($user->getRoleNames()->first() ?? 'User'),
            'dept' => $user->hasRole('admin') ? 'Management' : 'Member',
            'status' => 'Active',
            'joined' => $user->created_at->format('M d, Y'),
            'initials' => strtoupper(substr($user->name, 0, 2)),
        ]);

        $registrations = User::selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->where('created_at', '>=', now()->subDays(6))
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('count', 'date');

        $platformGrowth = [];
        for ($i = 6; $i >= 0; $i--) {
            $dateObj = now()->subDays($i);
            $platformGrowth[] = [
                'date' => $dateObj->format('M d'),
                'count' => $registrations[$dateObj->format('Y-m-d')] ?? 0,
            ];
        }

        $totalUsers = User::count();
        $rolesCount = DB::table('model_has_roles')
            ->join('roles', 'model_has_roles.role_id', '=', 'roles.id')
            ->where('model_type', User::class)
            ->select('roles.name', DB::raw('count(*) as count'))
            ->groupBy('roles.name')
            ->pluck('count', 'name');

        $adminsCount = $rolesCount['admin'] ?? 0;
        $recruitersCount = $rolesCount['recruiter'] ?? 0;
        $candidatesCount = max(0, $totalUsers - $adminsCount - $recruitersCount);

        $activeSessions = DB::table('sessions')
            ->where('last_activity', '>=', now()->subMinutes(15)->getTimestamp())
            ->count();

        $usersThisMonth = User::where('created_at', '>=', now()->subDays(30))->count();
        $usersLastMonth = User::whereBetween('created_at', [now()->subDays(60), now()->subDays(30)])->count();
        $growth = $usersLastMonth > 0 ? round((($usersThisMonth - $usersLastMonth) / $usersLastMonth) * 100, 1) : 100;

        $failedJobsCount = DB::table('failed_jobs')->count();
        $health = max(0, 100 - ($failedJobsCount * 0.5));

        return [
            'users' => $users,
            'platformGrowth' => $platformGrowth,
            'roleDistribution' => [
                'candidates' => $totalUsers > 0 ? round(($candidatesCount / $totalUsers) * 100) : 0,
                'recruiters' => $totalUsers > 0 ? round(($recruitersCount / $totalUsers) * 100) : 0,
                'admins' => $totalUsers > 0 ? round(($adminsCount / $totalUsers) * 100) : 0,
            ],
            'stats' => [
                'totalUsers' => number_format($totalUsers),
                'activeNow' => $activeSessions,
                'pendingRoles' => User::doesntHave('roles')->count(),
                'growth' => ($growth >= 0 ? '+' : '').$growth.'%',
                'isGrowthPositive' => $growth >= 0,
                'systemHealth' => number_format($health, 1).'%',
            ],
        ];
    }

    public function getJobsMetrics(): array
    {
        $jobs = JobOffer::with(['company', 'source'])
            ->withCount('offerViews')
            ->orderByDesc('created_at')
            ->paginate(10)
            ->through(function ($job) {
                $min = $job->salary_min;
                $max = $job->salary_max;
                $isFreelance = $job->contract_type && strtolower($job->contract_type) === 'freelance';
                $fmt = fn ($v) => $v < 200 ? ($v.'k €') : (number_format($v, 0, ',', ' ').' €');

                $salaryRange = 'Non communiqué';
                if ($min && $max) {
                    $salaryRange = $min == $max ? $fmt($min) : ($fmt($min).' - '.$fmt($max));
                } elseif ($min) {
                    $salaryRange = 'Dès '.$fmt($min);
                }
                if ($salaryRange !== 'Non communiqué' && $isFreelance && $min < 2000) {
                    $salaryRange .= ' / j';
                }

                return [
                    'id' => $job->id,
                    'title' => $job->title,
                    'company' => $job->company->name ?? 'Confidentiel',
                    'source' => $job->source->name ?? 'Inconnue',
                    'location' => $job->location ?? 'Télétravail',
                    'salary_range' => $salaryRange,
                    'views' => $job->offer_views_count,
                    'date' => $job->date_of_publi ? Carbon::parse($job->date_of_publi)->format('d/m/Y') : $job->created_at->format('d/m/Y'),
                ];
            });

        $totalJobs = JobOffer::count();
        $salaries = JobOffer::whereNotNull('salary_min')
            ->where('salary_min', '>', 0)
            ->pluck('salary_min')
            ->map(fn ($s) => (float) $s < 200 ? (float) $s * 1000 : ((float) $s >= 15000 ? (float) $s : null))
            ->filter();

        $avgSalary = $salaries->isNotEmpty() ? $salaries->avg() : null;
        $jobsWithSalary = JobOffer::whereNotNull('salary_min')->count();
        $salaryRate = $totalJobs > 0 ? round(($jobsWithSalary / $totalJobs) * 100) : 100;
        $todayJobs = JobOffer::where('created_at', '>=', now()->subDay())->count();

        $auditLogs = JobOffer::with(['company', 'source'])
            ->orderByDesc('created_at')
            ->take(5)
            ->get()
            ->map(fn ($job) => [
                'id' => $job->id,
                'title' => Str::limit($job->title, 30),
                'company' => $job->company->name ?? 'Confidentiel',
                'source' => $job->source->name ?? 'Inconnue',
                'time' => $job->created_at->diffForHumans(),
            ]);

        return [
            'jobs' => $jobs,
            'stats' => [
                'totalActive' => number_format($totalJobs, 0, ',', ' '),
                'withSalary' => number_format($jobsWithSalary, 0, ',', ' '),
                'todayCount' => $todayJobs,
                'averageSalary' => $avgSalary ? number_format($avgSalary, 0, ',', ' ').' €' : 'N/D',
            ],
            'auditLogs' => $auditLogs,
            'healthStats' => [
                'clearance' => $salaryRate,
                'todayCount' => $todayJobs,
                'message' => $salaryRate > 50
                    ? 'Taux d\'extraction des salaires sain.'
                    : 'Taux d\'extraction des salaires faible, vérifier la normalisation.',
            ],
        ];
    }

    private function readRecentLogs(int $limit): array
    {
        $logFile = storage_path('logs/laravel.log');
        if (! file_exists($logFile)) {
            return [];
        }

        $lines = array_reverse(file($logFile) ?: []);
        $systemLogs = [];

        foreach ($lines as $line) {
            if (preg_match('/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (.*?): (.*)/', $line, $matches)) {
                $systemLogs[] = [
                    'date' => Carbon::parse($matches[1])->diffForHumans(),
                    'level' => explode('.', $matches[2])[1] ?? $matches[2],
                    'message' => Str::limit($matches[3], 60),
                ];
                if (count($systemLogs) >= $limit) {
                    break;
                }
            }
        }

        return $systemLogs;
    }
}
