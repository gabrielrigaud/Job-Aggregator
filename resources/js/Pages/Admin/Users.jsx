import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatCard from '@/Components/Admin/StatCard';

export default function Users() {
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState({});

    const initialUsers = [
        {
            id: 1,
            name: 'Jordan Rivera',
            email: 'jordan.r@jobmind.tech',
            role: 'Senior Frontend',
            dept: 'Engineering',
            status: 'Active',
            joined: 'Oct 12, 2023',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        },
        {
            id: 2,
            name: 'Elena Soros',
            email: 'elena.design@jobmind.tech',
            role: 'UX Lead',
            dept: 'Creative',
            status: 'Away',
            joined: 'Jan 04, 2024',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        },
        {
            id: 3,
            name: 'Marcus Wu',
            email: 'm.wu@jobmind.tech',
            role: 'Data Analyst',
            dept: 'Insights',
            status: 'Inactive',
            joined: 'Nov 22, 2023',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        },
        {
            id: 4,
            name: 'Sarah Jenkins',
            email: 's.jenkins@jobmind.tech',
            role: 'Operations Director',
            dept: 'Management',
            status: 'Active',
            joined: 'Aug 15, 2023',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        },
    ];

    const [usersList, setUsersList] = useState(initialUsers);

    const toggleSelectAll = () => {
        const nextState = !selectedAll;
        setSelectedAll(nextState);
        const updated = {};
        usersList.forEach((u) => {
            updated[u.id] = nextState;
        });
        setSelectedUsers(updated);
    };

    const toggleSelectUser = (id) => {
        setSelectedUsers((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDelete = (id, name) => {
        if (confirm(`Are you sure you want to delete user: ${name}? This action is permanent.`)) {
            setUsersList((prev) => prev.filter((u) => u.id !== id));
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Active':
                return (
                    <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-green-500">
                        Active
                    </span>
                );
            case 'Away':
                return (
                    <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-yellow-500">
                        Away
                    </span>
                );
            default:
                return (
                    <span className="rounded-full border border-outline-variant bg-surface-variant/30 px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
                        Inactive
                    </span>
                );
        }
    };

    return (
        <AdminLayout>
            <Head title="JobMind Admin - User Management" />

            <div className="mx-auto max-w-7xl">
                <PageHeader 
                    title="User Management" 
                    description="View, filter, and manage user accounts across the platform."
                >
                    <button className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface px-4 py-2 text-sm font-semibold text-on-surface transition-all hover:bg-surface-variant/50">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filters
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-all hover:brightness-110 active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        Add User
                    </button>
                    <button className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface px-4 py-2 text-sm font-semibold text-on-surface transition-all hover:bg-surface-variant/50">
                        <span className="material-symbols-outlined text-[18px]">download</span>
                        Export CSV
                    </button>
                </PageHeader>

                {/* Dashboard Stats Summary (Bento Style) */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Users"
                        value="1,284"
                        icon="group"
                        variant="primary"
                        badge={<span className="rounded bg-green-500/10 px-1.5 py-0.5 font-mono text-[10px] text-green-600">+12.0%</span>}
                    />
                    
                    <StatCard
                        title="Active Now"
                        value="42"
                        icon="person"
                        variant="secondary"
                        badge={
                            <span className="flex items-center gap-1.5 rounded bg-surface-variant px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                </span>
                                Live
                            </span>
                        }
                    />

                    <StatCard
                        title="Pending Roles"
                        value="18"
                        icon="pending_actions"
                        variant="tertiary"
                        badge={<span className="rounded bg-error/10 px-1.5 py-0.5 font-mono text-[10px] text-error">Review</span>}
                    />

                    <StatCard
                        title="System Health"
                        value="99.9%"
                        icon="health_and_safety"
                        variant="primary"
                        badge={<span className="rounded bg-surface-variant px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">Optimal</span>}
                    />
                </div>

                {/* Users Table Container */}
                <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm">
                    {/* Table Header Controls */}
                    <div className="flex flex-wrap items-center justify-between border-b border-outline-variant bg-surface-container-low/40 p-4">
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    checked={selectedAll}
                                    onChange={toggleSelectAll}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
                                />
                                <span className="text-xs font-semibold text-on-surface-variant">Select All</span>
                            </label>
                            <div className="h-4 w-[1px] bg-outline-variant"></div>
                            <span className="text-xs font-semibold text-on-surface-variant">
                                {usersList.length} Users Found
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-on-surface-variant">Sort by:</span>
                            <select className="cursor-pointer border-none bg-transparent py-1 text-xs font-bold text-primary outline-none focus:ring-0">
                                <option className="bg-surface text-on-surface">Join Date</option>
                                <option className="bg-surface text-on-surface">Name</option>
                                <option className="bg-surface text-on-surface">Status</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-outline-variant/50 bg-surface-container-low/20 text-on-surface-variant">
                                    <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider">User Information</th>
                                    <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider">Role / Dept</th>
                                    <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/30">
                                {usersList.map((user) => (
                                    <tr key={user.id} className="group transition-colors hover:bg-primary/5">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    checked={!!selectedUsers[user.id]}
                                                    onChange={() => toggleSelectUser(user.id)}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
                                                />
                                                <img
                                                    alt={user.name}
                                                    src={user.avatar}
                                                    className="h-10 w-10 rounded-lg border border-outline-variant/50 object-cover shadow-sm"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-on-surface">{user.name}</span>
                                                    <span className="font-mono text-xs text-on-surface-variant">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-on-surface">{user.role}</span>
                                                <span className="font-mono text-xs text-primary">{user.dept}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-xs text-on-surface-variant">{user.joined}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-1 opacity-80 transition-opacity group-hover:opacity-100">
                                                <button className="rounded-lg p-1.5 text-primary hover:bg-primary/10 transition-colors" title="View Details">
                                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id, user.name)}
                                                    className="rounded-lg p-1.5 text-error hover:bg-error/10 transition-colors"
                                                    title="Delete User"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-wrap items-center justify-between border-t border-outline-variant bg-surface-container-low/20 p-4">
                        <span className="text-xs font-semibold text-on-surface-variant">
                            Showing 1 to {usersList.length} of 154 entries
                        </span>
                        <div className="flex items-center gap-1">
                            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-variant/50">
                                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                            </button>
                            <button className="h-8 w-8 rounded bg-primary text-xs font-bold text-on-primary">1</button>
                            <button className="h-8 w-8 rounded border border-outline-variant text-xs font-semibold text-on-surface-variant hover:bg-surface-variant/50">2</button>
                            <button className="h-8 w-8 rounded border border-outline-variant text-xs font-semibold text-on-surface-variant hover:bg-surface-variant/50">3</button>
                            <span className="px-2 text-xs text-on-surface-variant">...</span>
                            <button className="h-8 w-8 rounded border border-outline-variant text-xs font-semibold text-on-surface-variant hover:bg-surface-variant/50">39</button>
                            <button className="flex h-8 w-8 items-center justify-center rounded border border-outline-variant text-on-surface-variant hover:bg-surface-variant/50">
                                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Contextual Grid */}
                <div className="mt-6 flex flex-col gap-6 lg:flex-row">
                    {/* Platform Growth */}
                    <div className="flex w-full flex-col justify-between rounded-xl border border-outline-variant bg-surface p-6 shadow-sm lg:w-2/3">
                        <h3 className="mb-4 text-xl font-bold text-on-surface">Platform Growth</h3>
                        <div className="flex h-48 w-full items-end justify-between gap-3 rounded-lg bg-surface-container-low/40 p-4">
                            <div className="h-[40%] w-full rounded-t bg-primary/30 transition-all hover:bg-primary"></div>
                            <div className="h-[55%] w-full rounded-t bg-primary/30 transition-all hover:bg-primary"></div>
                            <div className="h-[35%] w-full rounded-t bg-primary/30 transition-all hover:bg-primary"></div>
                            <div className="h-[65%] w-full rounded-t bg-primary/30 transition-all hover:bg-primary"></div>
                            <div className="h-[80%] w-full rounded-t bg-primary/30 transition-all hover:bg-primary"></div>
                            <div className="h-[45%] w-full rounded-t bg-primary/30 transition-all hover:bg-primary"></div>
                            <div className="h-[90%] w-full rounded-t bg-primary/30 transition-all hover:bg-primary"></div>
                        </div>
                    </div>

                    {/* Role Distribution */}
                    <div className="flex w-full flex-col rounded-xl border border-outline-variant bg-surface p-6 shadow-sm lg:w-1/3">
                        <h3 className="mb-4 text-xl font-bold text-on-surface">Role Distribution</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                                    <span className="text-on-surface-variant">Engineering</span>
                                    <span className="font-mono text-primary">45%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                                    <div className="h-full rounded-full bg-primary" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                                    <span className="text-on-surface-variant">Marketing</span>
                                    <span className="font-mono text-secondary">25%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                                    <div className="h-full rounded-full bg-secondary" style={{ width: '25%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-1.5 flex justify-between text-xs font-semibold">
                                    <span className="text-on-surface-variant">Management</span>
                                    <span className="font-mono text-tertiary">30%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                                    <div className="h-full rounded-full bg-tertiary" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
