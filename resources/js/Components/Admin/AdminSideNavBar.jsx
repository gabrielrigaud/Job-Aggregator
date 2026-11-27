import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function AdminSideNavBar() {
    const { url } = usePage();

    const isOverview = url.startsWith('/panel/dashboard');
    const isUsers = url.startsWith('/panel/users');
    const isJobs = url.startsWith('/panel/jobs');
    const isAdminMgmt = url.startsWith('/panel/admins');

    const linkClass = (active) =>
        `group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            active
                ? 'bg-primary/10 text-primary'
                : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'
        }`;

    return (
        <nav className="hidden lg:flex flex-col p-4 gap-2 bg-surface-container-low/80 backdrop-blur-xl h-screen w-64 left-0 top-0 border-r border-outline-variant fixed z-40">
            <div className="mb-8 px-2 pt-2 flex items-baseline gap-1.5">
                <Link href="/" className="text-xl font-bold text-primary tracking-tight">
                    JobMind
                </Link>
                <span className="text-[11px] font-semibold text-on-surface-variant">Admin</span>
            </div>

            <div className="flex flex-col space-y-1 flex-1 px-2">
                <Link className={linkClass(isOverview)} href="/panel/dashboard">
                    <span className={`material-symbols-outlined text-[20px] ${isOverview ? 'text-primary' : 'text-outline'}`}>grid_view</span>
                    Vue d'ensemble
                </Link>
                <Link className={linkClass(isUsers)} href="/panel/users">
                    <span className={`material-symbols-outlined text-[20px] ${isUsers ? 'text-primary' : 'text-outline'}`}>group</span>
                    Utilisateurs
                </Link>
                <Link className={linkClass(isJobs)} href="/panel/jobs">
                    <span className={`material-symbols-outlined text-[20px] ${isJobs ? 'text-primary' : 'text-outline'}`}>work</span>
                    Offres
                </Link>
                <Link className={linkClass(isAdminMgmt)} href="/panel/admins">
                    <span className={`material-symbols-outlined text-[20px] ${isAdminMgmt ? 'text-primary' : 'text-outline'}`}>shield_person</span>
                    Administrateurs
                </Link>
            </div>

            <div className="px-2 pt-3 border-t border-outline-variant/60">
                <Link
                    href="/"
                    className="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-colors"
                >
                    <span className="material-symbols-outlined text-[20px] text-outline">arrow_back</span>
                    Retour au site
                </Link>
            </div>
        </nav>
    );
}
