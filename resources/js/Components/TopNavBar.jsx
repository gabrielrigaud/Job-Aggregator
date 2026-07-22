import React from 'react';

export default function TopNavBar() {
    return (
        <header className="fixed top-0 w-full lg:w-[calc(100%-16rem)] z-30 flex justify-between items-center px-lg h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant shadow-sm transition-all duration-200">
            {/* Mobile Brand */}
            <div className="lg:hidden flex items-center">
                <h1 className="font-display-lg text-headline-md font-bold text-primary tracking-tight">JobMind</h1>
            </div>

            {/* Command Palette Search Bar */}
            <div className="flex-1 max-w-2xl mr-auto hidden sm:flex">
                <div className="w-full relative group glass-input rounded-lg flex items-center px-sm transition-all duration-200">
                    <span className="material-symbols-outlined text-outline p-sm">search</span>
                    <input className="w-full bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 font-body-sm py-sm outline-none" placeholder="Search roles, skills, or companies... (Cmd + K)" type="text" />
                    <div className="hidden lg:flex items-center gap-xs px-2 py-1 bg-surface-container-highest rounded border border-outline-variant text-outline font-code-sm text-xs">
                        <span>⌘</span><span>K</span>
                    </div>
                </div>
            </div>
            {/* Trailing Icons */}
            <div className="flex items-center gap-sm ml-auto">
                <button className="p-sm text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 rounded-full transition-colors relative">
                    <span className="material-symbols-outlined">notifications</span>
                    <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
                </button>
                <button 
                    onClick={() => {
                        const isDark = document.documentElement.classList.toggle('dark');
                        localStorage.setItem('theme', isDark ? 'dark' : 'light');
                    }}
                    className="p-sm text-on-surface-variant hover:text-primary hover:bg-surface-variant/50 rounded-full transition-colors hidden sm:block" 
                    title="Toggle Theme"
                >
                    <span className="material-symbols-outlined dark:hidden">dark_mode</span>
                    <span className="material-symbols-outlined hidden dark:block">light_mode</span>
                </button>
                <div className="w-8 h-8 rounded-full bg-surface-variant border border-outline-variant overflow-hidden ml-sm sm:hidden">
                    <img className="w-full h-full object-cover" alt="Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj1wsbFOkqvdneFxsGNsH33ovG-4qnLuK-EY6m1C1DeYnppMpyDLUjvZpx_kID4fwLVgPHfFA37MUEiNcwKtGx2IaVzMeaoRyXGRSDvffeNwiY1xE_77E4Mo62y25M_jVRPbGO6czMjimRTXDik9jLj0YMpUm0wjf0wyvceShn8VbUri8_BYdiYoRUN9SLkNZf3PrUubvOd--V829R4_ex4LO8NKIQcpX9eiSU-fKKsZDd8CNbRLL8v7wHAotIZAmfvuIQQN6OywZo" />
                </div>
            </div>
        </header>
    );
}
