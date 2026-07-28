import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function BottomNavBar() {
    const { url, props } = usePage();
    const user = props.auth?.user;
    
    const isActive = (path) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-md pb-safe bg-surface/90 backdrop-blur-lg rounded-t-xl shadow-lg border-t border-outline-variant">
            <Link 
                className={`flex flex-col items-center justify-center gap-1 min-w-[64px] rounded-lg p-1 transition-colors duration-150 active:scale-90 ${isActive('/') ? 'text-primary font-bold' : 'text-on-surface-variant active:bg-surface-variant'}`} 
                href="/"
            >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/') ? "'FILL' 1" : "'FILL' 0" }}>search</span>
                <span className="font-medium text-[10px] uppercase tracking-wider">Search</span>
            </Link>
            {user && (
                <Link 
                    className={`flex flex-col items-center justify-center gap-1 min-w-[64px] rounded-lg p-1 transition-colors duration-150 active:scale-90 ${isActive('/saved') ? 'text-primary font-bold' : 'text-on-surface-variant active:bg-surface-variant'}`} 
                    href="/saved"
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/saved') ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
                    <span className="font-medium text-[10px] uppercase tracking-wider">Saved</span>
                </Link>
            )}
            <Link 
                className={`flex flex-col items-center justify-center gap-1 min-w-[64px] rounded-lg p-1 transition-colors duration-150 active:scale-90 ${isActive('/insights') ? 'text-primary font-bold' : 'text-on-surface-variant active:bg-surface-variant'}`} 
                href="/insights"
            >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/insights') ? "'FILL' 1" : "'FILL' 0" }}>insights</span>
                <span className="font-medium text-[10px] uppercase tracking-wider">Stats</span>
            </Link>
            {user ? (
                <Link 
                    className={`flex flex-col items-center justify-center gap-1 min-w-[64px] rounded-lg p-1 transition-colors duration-150 active:scale-90 ${isActive('/settings') ? 'text-primary font-bold' : 'text-on-surface-variant active:bg-surface-variant'}`} 
                    href="/settings"
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/settings') ? "'FILL' 1" : "'FILL' 0" }}>person</span>
                    <span className="font-medium text-[10px] uppercase tracking-wider">Profile</span>
                </Link>
            ) : (
                <Link 
                    className={`flex flex-col items-center justify-center gap-1 min-w-[64px] rounded-lg p-1 transition-colors duration-150 active:scale-90 ${isActive('/login') ? 'text-primary font-bold' : 'text-on-surface-variant active:bg-surface-variant'}`} 
                    href="/login"
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive('/login') ? "'FILL' 1" : "'FILL' 0" }}>login</span>
                    <span className="font-medium text-[10px] uppercase tracking-wider">Login</span>
                </Link>
            )}
        </nav>
    );
}
