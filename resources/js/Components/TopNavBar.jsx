import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function TopNavBar() {
    const { auth, filters = {} } = usePage().props;
    const user = auth?.user;
    
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        setSearch(filters.search || '');
    }, [filters.search]);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            router.get('/', { ...filters, search }, { preserveState: true, preserveScroll: true, replace: true });
        }
    };

    return (
        <header className="fixed top-0 w-full lg:w-[calc(100%-16rem)] z-30 flex justify-between items-center px-lg h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant shadow-sm transition-all duration-200">
            <div className="lg:hidden flex items-center">
                <h1 className="text-xl font-bold text-primary tracking-tight">JobMind</h1>
            </div>

            {/* Command Palette Search Bar */}
            <div className="flex-1 max-w-2xl mr-auto hidden sm:flex">
                <div className="w-full relative group glass-input rounded-lg flex items-center px-sm transition-all duration-200">
                    <span className="material-symbols-outlined text-outline p-sm">search</span>
                    <input 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleSearch}
                        className="w-full bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 font-body-sm py-sm outline-none" 
                        placeholder="Search roles, skills, or companies..." 
                        type="text" 
                    />
                </div>
            </div>

            {/* Trailing Icons & Auth Section */}
            <div className="flex items-center gap-3 ml-auto">
                <button className="relative flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 rounded-lg transition-colors outline-none focus:outline-none focus:ring-0">
                    <span className="material-symbols-outlined text-[20px]">notifications</span>
                    <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
                </button>
                <button 
                    onClick={() => {
                        const isDark = document.documentElement.classList.toggle('dark');
                        localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    }}
                    className="flex h-9 w-9 items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 rounded-lg transition-colors hidden sm:flex outline-none focus:outline-none focus:ring-0" 
                    title="Toggle Theme"
                >
                    <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                    <span className="material-symbols-outlined text-[20px] hidden dark:inline-block">light_mode</span>
                </button>

                {!user && (
                    <div className="flex items-center gap-2 border-l border-outline-variant/30 pl-3 ml-1">
                        <Link 
                            href="/login" 
                            className="text-sm font-medium text-on-surface hover:text-primary transition-colors px-3 py-2"
                        >
                            Log in
                        </Link>
                        <Link 
                            href="/register" 
                            className="text-sm font-medium bg-primary text-on-primary hover:brightness-110 px-4 py-2 rounded-lg transition-all"
                        >
                            Sign up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
