<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Http\Requests\Admin\ChangeRoleRequest;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
        ]);
    }

    public function changeRole(ChangeRoleRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $user->syncRoles([$request->validated()['role']]);
        return redirect()->route('admin.users.index')->with('success', 'User role updated successfully.');
    }

    public function destroy($id)
    {
        $userCurrent = Auth::user();
        if ($userCurrent->id == $id) {
            return redirect()->route('admin.users.index')->with('error', 'You cannot delete your own account.');
        }
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->only(['name', 'email']));
        $user->syncRoles([$request->validated()['role']]);
        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(StoreUserRequest $request)
    {
        $validated = $request->validated();

        $validated['password'] = Hash::make($validated['password']);
        $role = $validated['role'];
        unset($validated['role']);
        $user = User::create($validated);
        $user->assignRole($role); // Assign the selected role
        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

}
