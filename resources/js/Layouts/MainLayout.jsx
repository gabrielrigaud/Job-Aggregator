import React from 'react';
import SideNavBar from '../Components/SideNavBar';
import TopNavBar from '../Components/TopNavBar';
import BottomNavBar from '../Components/BottomNavBar';

export default function MainLayout({ children }) {
    return (
        <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col md:flex-row overflow-x-hidden">
            <SideNavBar />
            
            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 flex flex-col min-h-screen lg:h-screen overflow-y-auto overflow-x-hidden relative">
                <TopNavBar />
                
                {children}
            </main>

            <BottomNavBar />
        </div>
    );
}
