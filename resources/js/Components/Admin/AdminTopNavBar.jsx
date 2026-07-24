import React from 'react';

export default function AdminTopNavBar() {
    return (
        <header className="flex h-16 flex-shrink-0 items-center justify-between gap-6 border-b border-outline-variant bg-surface px-6">
            <div className="flex max-w-lg flex-1 items-center">
                <div className="flex w-full items-center rounded-md border border-outline-variant bg-surface-container-low px-3 transition-all focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
                    <span className="material-symbols-outlined text-on-surface-variant">search</span>
                    <input
                        className="w-full border-none bg-transparent py-2 pl-2 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant outline-none focus:ring-0"
                        placeholder="Search system logs, users, or jobs..."
                        type="text"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="relative text-on-surface-variant transition-colors hover:text-primary">
                    <span className="material-symbols-outlined text-[24px]">notifications</span>
                    <span className="absolute right-0 top-0 h-2 w-2 rounded-full border-2 border-surface bg-error"></span>
                </button>
                <button
                    onClick={() => {
                        const isDark = document.documentElement.classList.toggle('dark');
                        localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    }}
                    className="text-on-surface-variant transition-colors hover:text-primary"
                    title="Toggle Theme"
                >
                    <span className="material-symbols-outlined text-[24px] dark:hidden">dark_mode</span>
                    <span className="material-symbols-outlined text-[24px] hidden dark:block">light_mode</span>
                </button>
            </div>
        </header>
    );
}
