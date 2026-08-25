import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function TopNavBar() {
    const { auth } = usePage().props;
    const { url } = usePage();
    const user = auth?.user;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const dropdownRef = useRef(null);
    const notifRef = useRef(null);

    // Close dropdowns on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getPageTitle = () => {
        if (url.startsWith('/saved')) return 'Offres sauvegardées';
        if (url.startsWith('/insights')) return 'Salary Insights & Marché';
        if (url.startsWith('/settings')) return 'Paramètres du compte';
        if (url.startsWith('/admin')) return 'Administration';
        return 'Découvrir les offres';
    };

    // Placeholder notifications — tied to user's real saved jobs count later
    const notifications = user ? [
        {
            id: 1,
            icon: 'bookmark',
            iconColor: 'text-primary',
            iconBg: 'bg-primary/10',
            title: 'Offre sauvegardée',
            body: 'Développeur(se) Java F/H chez CGI est dans vos favoris.',
            time: 'Il y a 2h',
            unread: true,
        },
        {
            id: 2,
            icon: 'trending_up',
            iconColor: 'text-emerald-500',
            iconBg: 'bg-emerald-500/10',
            title: '18 nouvelles offres',
            body: 'Des offres correspondant à votre recherche viennent d\'être ajoutées.',
            time: 'Il y a 3h',
            unread: true,
        },
        {
            id: 3,
            icon: 'verified',
            iconColor: 'text-secondary',
            iconBg: 'bg-secondary/10',
            title: 'Profil analysé',
            body: 'Votre profil est prêt à matcher avec les recruteurs.',
            time: 'Hier',
            unread: false,
        },
    ] : [];

    const unreadCount = notifications.filter(n => n.unread).length;

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

            {/* Trailing Controls & Auth */}
            <div className="flex items-center gap-2 ml-auto">
                {/* Theme Toggle */}
                <button 
                    onClick={() => {
                        const isDark = document.documentElement.classList.toggle('dark');
                        localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    }}
                    className="flex h-8 w-8 items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant/60 rounded-lg transition-colors outline-none" 
                    title="Changer de thème"
                >
                    <span className="material-symbols-outlined text-lg dark:hidden">dark_mode</span>
                    <span className="material-symbols-outlined text-lg hidden dark:inline-block">light_mode</span>
                </button>

                {/* Notifications Bell */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => {
                            setIsNotifOpen(prev => !prev);
                            setIsDropdownOpen(false);
                        }}
                        className="relative flex h-8 w-8 items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant/60 rounded-lg transition-colors outline-none"
                        title="Notifications"
                    >
                        <span className="material-symbols-outlined text-lg">notifications</span>
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 min-w-[14px] h-[14px] px-0.5 text-[9px] font-bold leading-[14px] text-center bg-error text-white rounded-full ring-2 ring-surface">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notifications Dropdown Panel */}
                    {isNotifOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-surface/95 backdrop-blur-xl border border-outline-variant/60 rounded-xl shadow-xl z-50 overflow-hidden">
                            {/* Header */}
                            <div className="px-4 py-3 flex items-center justify-between border-b border-outline-variant/40">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-on-surface">Notifications</span>
                                    {unreadCount > 0 && (
                                        <span className="px-1.5 py-0.5 rounded-full bg-primary text-on-primary text-[10px] font-bold leading-tight">
                                            {unreadCount} nouvelles
                                        </span>
                                    )}
                                </div>
                                <button className="text-[11px] font-semibold text-primary hover:underline">
                                    Tout lire
                                </button>
                            </div>

                            {/* Notification list */}
                            <div className="flex flex-col divide-y divide-outline-variant/30 max-h-[340px] overflow-y-auto custom-scrollbar">
                                {notifications.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center gap-2 py-10 px-4 text-center">
                                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center">
                                            <span className="material-symbols-outlined text-xl text-outline">notifications_off</span>
                                        </div>
                                        <p className="text-xs text-on-surface-variant">Aucune notification pour l'instant.</p>
                                    </div>
                                ) : (
                                    notifications.map(notif => (
                                        <button
                                            key={notif.id}
                                            className={`flex items-start gap-3 px-4 py-3 text-left w-full transition-colors hover:bg-surface-container/60 ${notif.unread ? 'bg-primary/[0.03]' : ''}`}
                                        >
                                            {/* Icon */}
                                            <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 ${notif.iconBg}`}>
                                                <span className={`material-symbols-outlined text-[17px] ${notif.iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                                    {notif.icon}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-1">
                                                    <span className={`text-xs font-semibold leading-snug ${notif.unread ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                                                        {notif.title}
                                                    </span>
                                                    {notif.unread && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1" />
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-on-surface-variant leading-relaxed mt-0.5 line-clamp-2">
                                                    {notif.body}
                                                </p>
                                                <span className="text-[10px] text-outline mt-1 block font-medium">
                                                    {notif.time}
                                                </span>
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2.5 border-t border-outline-variant/40 bg-surface-container/40">
                                <Link
                                    href="/settings"
                                    onClick={() => setIsNotifOpen(false)}
                                    className="text-xs font-semibold text-primary hover:underline flex items-center justify-center gap-1"
                                >
                                    Gérer les préférences de notifications
                                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Auth area */}
                {!user ? (
                    <div className="flex items-center gap-1.5 border-l border-outline-variant/40 pl-2.5 ml-1">
                        <Link 
                            href="/login" 
                            className="text-xs font-semibold text-on-surface hover:text-primary transition-colors px-2.5 py-1.5 rounded-lg hover:bg-surface-variant/50"
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
                    <div className="relative border-l border-outline-variant/40 pl-2.5 ml-1" ref={dropdownRef}>
                        <button
                            onClick={() => {
                                setIsDropdownOpen(prev => !prev);
                                setIsNotifOpen(false);
                            }}
                            className="flex items-center gap-2 group outline-none"
                            title="Menu Utilisateur"
                        >
                            <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-xs border border-primary/20 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-surface/95 backdrop-blur-xl border border-outline-variant/60 rounded-xl shadow-lg p-1 z-50 flex flex-col gap-0.5">
                                <div className="px-3 py-2 border-b border-outline-variant/30 mb-1">
                                    <p className="text-sm font-semibold text-on-surface truncate">{user.name}</p>
                                    <p className="text-[10px] text-on-surface-variant truncate">{user.email}</p>
                                </div>
                                <Link
                                    href="/settings"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-on-surface-variant hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">settings</span>
                                    Paramètres
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="flex items-center w-full text-left gap-2.5 px-3 py-2 text-xs font-medium text-on-surface-variant hover:text-error hover:bg-error/10 rounded-lg transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">logout</span>
                                    Déconnexion
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
