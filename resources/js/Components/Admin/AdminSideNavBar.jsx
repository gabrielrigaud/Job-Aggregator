import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminSideNavBar() {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const isOverview = url.startsWith('/admin/dashboard');
    const isUsers = url.startsWith('/admin/users');
    const isJobs = url.startsWith('/admin/jobs');
    const isAdminMgmt = url.startsWith('/admin/admins');

    return (
        <aside className="flex w-64 flex-col justify-between border-r border-outline-variant bg-surface px-4 py-6">
            <div>
                {/* Brand */}
                <div className="mb-8 flex items-center px-4">
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-on-primary">
                        <span className="material-symbols-outlined text-[20px]">admin_panel_settings</span>
                    </div>
                    <h1 className="text-lg font-bold tracking-tight text-on-surface">
                        JobMind <span className="font-normal text-xs text-primary">Admin</span>
                    </h1>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-1">
                    <Link
                        className={`flex items-center rounded-lg px-3 py-2.5 transition-all ${
                            isOverview
                                ? 'bg-primary/10 text-primary dark:bg-primary/25 dark:text-indigo-300 font-semibold'
                                : 'text-on-surface-variant hover:bg-surface-variant/50 dark:hover:bg-white/5 font-medium'
                        }`}
                        href="/admin/dashboard"
                    >
                        <span className="material-symbols-outlined mr-3 text-[20px]">grid_view</span>
                        <span className="text-sm">Overview</span>
                    </Link>
                    <Link
                        className={`flex items-center rounded-lg px-3 py-2.5 transition-all ${
                            isUsers
                                ? 'bg-primary/10 text-primary dark:bg-primary/25 dark:text-indigo-300 font-semibold'
                                : 'text-on-surface-variant hover:bg-surface-variant/50 dark:hover:bg-white/5 font-medium'
                        }`}
                        href="/admin/users"
                    >
                        <span className="material-symbols-outlined mr-3 text-[20px]">group</span>
                        <span className="text-sm">Users</span>
                    </Link>
                    <Link
                        className={`flex items-center rounded-lg px-3 py-2.5 transition-all ${
                            isJobs
                                ? 'bg-primary/10 text-primary dark:bg-primary/25 dark:text-indigo-300 font-semibold'
                                : 'text-on-surface-variant hover:bg-surface-variant/50 dark:hover:bg-white/5 font-medium'
                        }`}
                        href="/admin/jobs"
                    >
                        <span className="material-symbols-outlined mr-3 text-[20px]">work</span>
                        <span className="text-sm">Jobs</span>
                    </Link>
                    <Link
                        className={`flex items-center rounded-lg px-3 py-2.5 transition-all ${
                            isAdminMgmt
                                ? 'bg-primary/10 text-primary dark:bg-primary/25 dark:text-indigo-300 font-semibold'
                                : 'text-on-surface-variant hover:bg-surface-variant/50 dark:hover:bg-white/5 font-medium'
                        }`}
                        href="/admin/admins"
                    >
                        <span className="material-symbols-outlined mr-3 text-[20px]" style={isAdminMgmt ? { fontVariationSettings: "'FILL' 1" } : {}}>shield_person</span>
                        <span className="text-sm">Admins</span>
                    </Link>
                </nav>
            </div>

            {/* Profile Card Bottom */}
            <div className="border-t border-outline-variant pt-4">
                <div className="flex items-center gap-3 px-2">
                    <img
                        alt={user?.name || 'Admin User'}
                        className="h-9 w-9 rounded-full border border-outline-variant object-cover"
                        src={user?.name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random` : 'https://ui-avatars.com/api/?name=Admin&background=random'}
                    />
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-on-surface truncate">{user?.name || 'Administrator'}</p>
                        <p className="text-xs text-on-surface-variant">Admin</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
