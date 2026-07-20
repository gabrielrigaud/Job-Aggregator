<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;


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

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'role' => 'required|in:admin,user',
        ]);

        $user = User::findOrFail($id);
        $user->update($validated);
        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,user',
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $user = User::create($validated);
        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }
}

