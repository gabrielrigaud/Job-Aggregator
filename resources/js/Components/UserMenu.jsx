import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function UserMenu({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <div className="relative border-l border-outline-variant/40 pl-2.5 ml-1" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-2 group outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
                aria-label="Menu utilisateur"
                title="Menu Utilisateur"
            >
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface/95 backdrop-blur-xl border border-outline-variant/60 rounded-xl shadow-lg p-1 z-50 flex flex-col gap-0.5">
                    <div className="px-3 py-2 border-b border-outline-variant/30 mb-1">
                        <p className="text-sm font-semibold text-on-surface truncate">{user.name}</p>
                        <p className="text-[10px] text-on-surface-variant truncate">{user.email}</p>
                    </div>
                    <Link
                        href="/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    >
                        <span aria-hidden="true" className="material-symbols-outlined text-[18px]">settings</span>
                        Paramètres
                    </Link>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center w-full text-left gap-2.5 px-3 py-2 text-xs font-medium text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                    >
                        <span aria-hidden="true" className="material-symbols-outlined text-[18px]">logout</span>
                        Déconnexion
                    </Link>
                </div>
            )}
        </div>
    );
}
