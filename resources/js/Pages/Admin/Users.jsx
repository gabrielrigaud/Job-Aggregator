import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatCard from '@/Components/Admin/StatCard';

export default function Users({ users = [], platformGrowth = [], roleDistribution = {}, stats = {} }) {
    const { auth } = usePage().props;
    const [search, setSearch] = useState('');

    const filteredUsers = users.filter((u) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    });

    const maxCount = Math.max(...platformGrowth.map((d) => d.count), 5);

    const handleDelete = (id, name) => {
        if (confirm(`Supprimer définitivement l'utilisateur "${name}" ?`)) {
            router.delete(route('admin.users.destroy', id));
        }
    };

    const handleToggleRole = (user) => {
        const nextRole = user.role === 'Administrator' ? 'user' : 'admin';
        const label = nextRole === 'admin' ? 'Administrateur' : 'Utilisateur';
        if (confirm(`Passer "${user.name}" au rôle ${label} ?`)) {
            router.patch(route('admin.users.changeRole', user.id), { role: nextRole });
        }
    };

    return (
        <AdminLayout>
            <Head title="Administration - Utilisateurs" />

            <div className="w-full space-y-5">
                <PageHeader
                    title="Gestion des utilisateurs"
                    description="Consultez les comptes inscrits, gérez leurs rôles et modérez les accès."
                >
                    <div className="flex items-center rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-1.5 min-w-[240px]">
                        <span aria-hidden="true" className="material-symbols-outlined text-outline text-base mr-2">search</span>
                        <input
                            aria-label="Rechercher un utilisateur"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher par nom ou email..."
                            className="w-full border-none bg-transparent text-xs text-on-surface placeholder:text-outline focus:ring-0 outline-none"
                        />
                    </div>
                </PageHeader>

                {/* KPIs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Total utilisateurs" value={stats?.totalUsers || '0'} icon="group" variant="primary" />
                    <StatCard title="Sessions actives (15m)" value={String(stats?.activeNow ?? 0)} icon="bolt" variant="secondary" />
                    <StatCard title="Sans rôle assigné" value={String(stats?.pendingRoles ?? 0)} icon="hourglass_empty" variant="tertiary" />
                    <StatCard title="Santé du système" value={stats?.systemHealth || '100.0%'} icon="verified_user" variant="primary" />
                </div>

                {/* Tableau */}
                <div className="glass-panel overflow-hidden rounded-xl shadow-2xs">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-outline-variant/60 bg-surface-container-low/60 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                                    <th className="px-5 py-3.5">Utilisateur</th>
                                    <th className="px-5 py-3.5">Rôle</th>
                                    <th className="px-5 py-3.5">Inscription</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/40 text-sm">
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-5 py-8 text-center text-xs text-on-surface-variant">
                                            Aucun utilisateur trouvé.
                                        </td>
                                    </tr>
                                ) : filteredUsers.map((user) => {
                                    const isSelf = auth?.user?.id === user.id;
                                    const isAdmin = user.role === 'Administrator';
                                    return (
                                        <tr key={user.id} className="hover:bg-surface-container-low/40 transition-colors">
                                            <td className="px-5 py-3.5">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary border border-primary/20">
                                                        {user.initials || user.name.slice(0, 2).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-on-surface text-xs md:text-sm">
                                                            {user.name} {isSelf && <span className="text-[11px] text-primary">(Vous)</span>}
                                                        </p>
                                                        <p className="text-xs text-on-surface-variant">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                    isAdmin
                                                        ? 'bg-primary/10 text-primary border border-primary/20'
                                                        : 'bg-surface-container text-on-surface-variant border border-outline-variant/40'
                                                }`}>
                                                    {isAdmin ? 'Administrateur' : 'Utilisateur'}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3.5 text-xs text-on-surface-variant">{user.joined}</td>
                                            <td className="px-5 py-3.5 text-right">
                                                {!isSelf && (
                                                    <div className="inline-flex items-center gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleRole(user)}
                                                            className="rounded-lg border border-outline-variant/60 px-2.5 py-1 text-xs font-medium text-on-surface hover:border-primary/50 hover:text-primary transition-colors"
                                                        >
                                                            {isAdmin ? 'Rétrograder' : 'Promouvoir Admin'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(user.id, user.name)}
                                                            aria-label={`Supprimer ${user.name}`}
                                                            title="Supprimer"
                                                            className="rounded-lg p-1.5 text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors"
                                                        >
                                                            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">delete</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Graphiques */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="glass-panel rounded-xl p-6 shadow-2xs lg:col-span-8">
                        <h3 className="mb-4 text-base font-bold text-on-surface">Inscriptions (7 derniers jours)</h3>
                        <div className="flex h-36 items-end justify-between gap-2 pt-4">
                            {platformGrowth.map((item) => {
                                const heightPct = item.count > 0 ? Math.max(15, Math.round((item.count / maxCount) * 100)) : 4;
                                return (
                                    <div key={item.date} className="flex flex-1 flex-col items-center gap-1.5 h-full justify-end">
                                        <span className="text-[11px] font-semibold text-on-surface-variant">{item.count}</span>
                                        <div
                                            className={`w-full max-w-[44px] rounded-t-md transition-all ${item.count > 0 ? 'bg-primary' : 'bg-surface-container'}`}
                                            style={{ height: `${heightPct}%` }}
                                        ></div>
                                        <span className="text-[10px] text-on-surface-variant">{item.date}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="glass-panel rounded-xl p-6 shadow-2xs lg:col-span-4 flex flex-col justify-between">
                        <h3 className="mb-4 text-base font-bold text-on-surface">Répartition des rôles</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-1 flex justify-between text-xs font-semibold">
                                    <span className="text-on-surface">Utilisateurs</span>
                                    <span className="text-primary">{roleDistribution?.candidates ?? 0}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-surface-container overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${roleDistribution?.candidates ?? 0}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 flex justify-between text-xs font-semibold">
                                    <span className="text-on-surface">Administrateurs</span>
                                    <span className="text-secondary">{roleDistribution?.admins ?? 0}%</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-surface-container overflow-hidden">
                                    <div className="h-full bg-secondary rounded-full" style={{ width: `${roleDistribution?.admins ?? 0}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
