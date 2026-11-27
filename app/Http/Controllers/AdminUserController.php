<?php

namespace App\Http\Controllers;

use App\Http\Requests\Admin\ChangeRoleRequest;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;

class AdminUserController extends Controller
{
    public function changeRole(ChangeRoleRequest $request, $id)
    {
        if (Auth::id() == $id) {
            return redirect()->route('admin.users.preview')->with('error', 'Impossible de modifier votre propre rôle.');
        }

        $user = User::findOrFail($id);
        $user->syncRoles([$request->validated()['role']]);

        return redirect()->route('admin.users.preview')->with('success', 'Rôle mis à jour.');
    }

    public function destroy($id)
    {
        if (Auth::id() == $id) {
            return redirect()->route('admin.users.preview')->with('error', 'Impossible de supprimer votre propre compte.');
        }

        $user = User::findOrFail($id);
        $user->delete();

        return redirect()->route('admin.users.preview')->with('success', 'Utilisateur supprimé.');
    }

    public function update(UpdateUserRequest $request, $id, UserService $userService)
    {
        $user = User::findOrFail($id);
        $userService->updateUser($user, $request->validated());

        return redirect()->route('admin.users.preview')->with('success', 'Utilisateur mis à jour.');
    }

    public function store(StoreUserRequest $request, UserService $userService)
    {
        $userService->createUser($request->validated());

        return redirect()->route('admin.users.preview')->with('success', 'Utilisateur créé.');
    }
}
