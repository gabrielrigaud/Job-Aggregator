<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\ChangeRoleRequest;
use App\Models\JobOffer;
use App\Models\User;
use App\Services\AdminMetricsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __construct(private AdminMetricsService $metrics) {}

    public function dashboard(): Response
    {
        return Inertia::render('Admin/Dashboard', $this->metrics->getDashboardData());
    }

    public function users(): Response
    {
        return Inertia::render('Admin/Users', $this->metrics->getUsersMetrics());
    }

    public function jobs(): Response
    {
        return Inertia::render('Admin/Jobs', $this->metrics->getJobsMetrics());
    }

    public function destroyJob(JobOffer $job)
    {
        $job->delete();

        return redirect()->back()->with('success', 'Offre supprimée.');
    }

    public function destroyUser(User $user)
    {
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'Impossible de supprimer votre propre compte.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'Utilisateur supprimé.');
    }

    public function admins(): Response
    {
        $admins = User::role('admin')->get()->map(fn ($admin) => [
            'id' => $admin->id,
            'name' => $admin->name,
            'email' => $admin->email,
            'role' => 'Administrator',
            'joined' => $admin->created_at->format('M d, Y'),
            'initials' => strtoupper(substr($admin->name, 0, 2)),
        ]);

        return Inertia::render('Admin/Admins', [
            'admins' => $admins,
        ]);
    }

    public function addExistingUser(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email'],
        ]);

        $userToPromote = User::where('email', $validated['email'])->first();

        if (! $userToPromote) {
            return redirect()->back()->with('error', 'Aucun utilisateur trouvé avec cet email.');
        }

        if ($userToPromote->hasRole('admin')) {
            return redirect()->back()->with('error', 'Cet utilisateur est déjà administrateur.');
        }

        $userToPromote->syncRoles(['admin']);

        return redirect()->back()->with('success', 'Utilisateur promu administrateur.');
    }

    public function updateRole(ChangeRoleRequest $request, User $user)
    {
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'Impossible de modifier votre propre rôle.');
        }

        $role = $request->validated()['role'];
        if ($role === 'user') {
            $user->removeRole('admin');
        } else {
            $user->syncRoles([$role]);
        }

        return redirect()->back()->with('success', 'Rôle mis à jour.');
    }

    public function revokeAdmin(User $user)
    {
        if (auth()->id() === $user->id) {
            return redirect()->back()->with('error', 'Impossible de révoquer vos propres droits.');
        }

        $user->removeRole('admin');

        return redirect()->back()->with('success', 'Droits administrateur révoqués.');
    }
}
