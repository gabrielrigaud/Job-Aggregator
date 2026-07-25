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
use App\Services\UserService;

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

    public function update(UpdateUserRequest $request, $id, UserService $userService)
    {
        $user = User::findOrFail($id);
        $userService->updateUser($user, $request->validated());
        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(StoreUserRequest $request , UserService $userService)
    {
        $validated = $request->validated();

        $userService->createUser($request->validated());
        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

}
