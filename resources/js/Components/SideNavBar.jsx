import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function SideNavBar() {
    const { url } = usePage();
    
    const isActive = (path) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    return (
        <nav className="hidden lg:flex flex-col p-md gap-sm bg-surface-container-low/80 backdrop-blur-xl h-screen w-64 left-0 top-0 border-r border-outline-variant fixed z-40 transition-all duration-200 ease-in-out">
            <div className="mb-xl px-sm pt-sm">
                <h1 className="font-display-lg text-headline-md font-bold text-primary tracking-tight">JobMind</h1>
            </div>
            <div className="flex flex-col gap-sm flex-1 font-label-md text-label-md">
                <Link 
                    className={`flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out ${isActive('/') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-highest hover:bg-surface-variant/50'}`} 
                    href="/"
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/') ? "'FILL' 1" : "'FILL' 0" }}>search</span>
                    Home
                </Link>
                <Link 
                    className={`flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out ${isActive('/saved') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-highest hover:bg-surface-variant/50'}`} 
                    href="/saved"
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/saved') ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
                    Saved
                </Link>
                <Link 
                    className={`flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out ${isActive('/insights') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-highest hover:bg-surface-variant/50'}`} 
                    href="/insights"
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/insights') ? "'FILL' 1" : "'FILL' 0" }}>query_stats</span>
                    Salary Insights
                </Link>
            </div>
            <div className="mt-auto flex flex-col gap-sm pt-xl border-t border-outline-variant">
                <Link 
                    className={`flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out font-label-md text-label-md ${isActive('/settings') ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-highest hover:bg-surface-variant/50'}`} 
                    href="/settings"
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/settings') ? "'FILL' 1" : "'FILL' 0" }}>settings</span>
                    Settings
                </Link>
            </div>
        </nav>
    );
}
