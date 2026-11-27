import React from 'react';
import AdminSideNavBar from '../Components/Admin/AdminSideNavBar';
import AdminTopNavBar from '../Components/Admin/AdminTopNavBar';

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-background text-on-surface flex">
            <AdminSideNavBar />

            <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
                <AdminTopNavBar />

                <main className="flex-1 pt-14 px-4 md:px-8 py-6">
                    <div className="max-w-[1560px] mx-auto w-full pt-4">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
