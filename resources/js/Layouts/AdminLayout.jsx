import React from 'react';
import AdminSideNavBar from '../Components/Admin/AdminSideNavBar';
import AdminTopNavBar from '../Components/Admin/AdminTopNavBar';

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen bg-background font-body-md text-on-surface antialiased overflow-hidden">
            {/* Sidebar */}
            <AdminSideNavBar />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top App Bar */}
                <AdminTopNavBar />

                {/* Scrollable Canvas */}
                <main className="flex-1 overflow-y-auto bg-background p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
