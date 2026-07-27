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
        
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalUsers' => number_format($totalUsers),
                'activeJobs' => number_format($activeJobs),
                'activeAdmins' => number_format($activeAdmins),
                'pendingReports' => 0, // Mock for now
            ]
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
