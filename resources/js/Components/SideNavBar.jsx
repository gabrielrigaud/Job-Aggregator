import React from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function SideNavBar() {
    const { url, props } = usePage();
    const user = props.auth?.user;
    
    const isActive = (path) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    return (
        <nav className="hidden lg:flex flex-col p-4 gap-2 bg-surface-container-low/80 backdrop-blur-xl h-screen w-64 left-0 top-0 border-r border-outline-variant fixed z-40 transition-all duration-200 ease-in-out">
            <div className="mb-8 px-2 pt-2">
                <h1 className="text-xl font-bold text-primary tracking-tight">JobMind</h1>
            </div>
            <div className="flex flex-col space-y-1 flex-1 px-2">
                <Link 
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'}`} 
                    href="/"
                >
                    <span className={`material-symbols-outlined text-[20px] ${isActive('/') ? 'text-primary' : 'text-outline'}`}>search</span>
                    Home
                </Link>
                <Link 
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/saved') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'}`} 
                    href="/saved"
                >
                    <span className={`material-symbols-outlined text-[20px] ${isActive('/saved') ? 'text-primary' : 'text-outline'}`}>bookmark</span>
                    Saved
                </Link>
                <Link 
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/insights') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'}`} 
                    href="/insights"
                >
                    <span className={`material-symbols-outlined text-[20px] ${isActive('/insights') ? 'text-primary' : 'text-outline'}`}>query_stats</span>
                    Salary Insights
                </Link>

                {user?.is_admin && (
                    <Link 
                        className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/admin') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'}`} 
                        href="/admin/users"
                    >
                        <span className={`material-symbols-outlined text-[20px] ${isActive('/admin') ? 'text-primary' : 'text-outline'}`}>admin_panel_settings</span>
                        Admin Panel
                    </Link>
                )}
            </div>
            <div className="mt-auto flex flex-col space-y-3 px-2 pt-4 border-t border-outline-variant">
                <Link 
                    className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/settings') ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'}`} 
                    href="/settings"
                >
                    <span className={`material-symbols-outlined text-[20px] ${isActive('/settings') ? 'text-primary' : 'text-outline'}`}>settings</span>
                    Settings
                </Link>

                {user && (
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container/50 border border-outline-variant/60">
                        <div className="flex flex-col min-w-0 pr-2">
                            <span className="text-xs font-semibold text-on-surface truncate">{user.name}</span>
                            <span className="text-[11px] text-on-surface-variant truncate">{user.email}</span>
                        </div>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="text-on-surface-variant hover:text-error transition-colors p-1 rounded-md hover:bg-error/10"
                            title="Log Out"
                        >
                            <span className="material-symbols-outlined text-[18px]">logout</span>
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
