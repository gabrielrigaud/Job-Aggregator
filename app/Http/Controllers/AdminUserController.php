<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function changeRole(Request $request, $id)
    {
            $validated = $request->validate([
                'role' => 'required|in:admin,user',
            ]);
        
        $user = User::findOrFail($id);
        $user->syncRoles([$validated['role']]);
        return redirect()->route('admin.users.index')->with('success', 'User role updated successfully.');
    }
}
