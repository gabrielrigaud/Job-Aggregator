import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import UserMenu from './UserMenu';

export default function TopNavBar() {
    const { auth } = usePage().props;
    const { url } = usePage();
    const user = auth?.user;

    const getPageTitle = () => {
        if (url.startsWith('/saved')) return 'Favoris & Historique';
        if (url.startsWith('/insights')) return 'Marché & Salaires';
        if (url.startsWith('/settings')) return 'Paramètres du compte';
        if (url.startsWith('/panel')) return 'Administration';
        return 'Découvrir les offres';
    };

    return (
        <header className="fixed top-0 w-full lg:w-[calc(100%-16rem)] z-30 flex items-center justify-between px-4 md:px-8 h-14 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/60 shadow-2xs transition-all duration-200">
            <div className="flex items-center gap-2">
                <div className="lg:hidden flex items-center mr-2">
                    <span className="text-lg font-extrabold text-primary tracking-tight">JobMind</span>
                </div>
                <h1 className="text-sm md:text-base font-bold text-on-surface flex items-center gap-1.5">
                    {getPageTitle()}
                </h1>
            </div>

            <div className="flex items-center gap-2 ml-auto">
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

                {!user ? (
                    <div className="flex items-center gap-2 border-l border-outline-variant/40 pl-3 ml-1">
                        <Link
                            href="/login"
                            className="text-xs font-semibold text-on-surface hover:text-primary px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                            Connexion
                        </Link>
                        <Link
                            href="/register"
                            className="text-xs font-semibold bg-primary text-on-primary hover:bg-primary/90 px-3 py-1.5 rounded-lg transition-all shadow-xs"
                        >
                            Inscription
                        </Link>
                    </div>
                ) : (
                    <UserMenu user={user} />
                )}
            </div>
        </header>
    );
}
