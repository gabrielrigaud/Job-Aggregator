import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import UserMenu from '../UserMenu';

export default function AdminTopNavBar() {
    const { url, props } = usePage();
    const user = props.auth?.user;

    const getTitle = () => {
        if (url.startsWith('/panel/users')) return 'Administration / Utilisateurs';
        if (url.startsWith('/panel/jobs')) return 'Administration / Offres';
        if (url.startsWith('/panel/admins')) return 'Administration / Administrateurs';
        return 'Administration / Vue d\'ensemble';
    };

    return (
        <header className="fixed top-0 w-full lg:w-[calc(100%-16rem)] z-30 flex items-center justify-between px-4 md:px-8 h-14 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/60 shadow-2xs">
            <div className="flex items-center gap-2">
                <div className="lg:hidden flex items-center mr-2">
                    <span className="text-lg font-extrabold text-primary tracking-tight">JobMind</span>
                </div>
                <h1 className="text-sm md:text-base font-bold text-on-surface">
                    {getTitle()}
                </h1>
            </div>

            <div className="flex items-center gap-2 ml-auto">
                <Link
                    href="/"
                    className="lg:hidden px-2.5 py-1 rounded-lg border border-outline-variant/60 text-xs font-medium text-on-surface-variant hover:text-primary"
                >
                    Site
                </Link>
                <button
                    type="button"
                    onClick={() => {
                        const isDark = document.documentElement.classList.toggle('dark');
                        localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    }}
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant/60 rounded-lg transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    aria-label="Changer de thème"
                    title="Changer de thème"
                >
                    <span aria-hidden="true" className="material-symbols-outlined text-lg dark:hidden">dark_mode</span>
                    <span aria-hidden="true" className="material-symbols-outlined text-lg hidden dark:inline-block">light_mode</span>
                </button>
                <UserMenu user={user} />
            </div>
        </header>
    );
}
