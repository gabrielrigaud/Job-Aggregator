import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';

export default function Admins({ admins = [] }) {
    const [openMenuId, setOpenMenuId] = useState(null);

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };
    return (
        <AdminLayout>
            <Head title="JobMind Admin Console - Admin Management" />

            <div className="mx-auto max-w-7xl">
                <PageHeader 
                    title="Admin Management" 
                    description="Manage your core team, security permissions, and administrative access."
                />
                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Invite Form (Bento Style Left) */}
                    <div className="space-y-6 lg:col-span-4">
                        <section className="h-fit rounded-xl border border-outline-variant bg-surface-container/80 p-6 backdrop-blur-md">
                            <div className="mb-6 flex items-center gap-2">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-container/20 text-primary">
                                    <span className="material-symbols-outlined">person_add</span>
                                </div>
                                <h3 className="text-2xl font-bold text-on-surface">Invite New Admin</h3>
                            </div>
                            <form className="space-y-4">
                                <div className="space-y-1">
                                    <label className="ml-1 block text-sm font-medium text-on-surface-variant">Email Address</label>
                                    <input className="w-full rounded-lg border-outline-variant bg-surface glass-input p-4 text-on-surface transition-all placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="colleague@jobmind.com" type="email" />
                                </div>
                                <div className="space-y-1">
                                    <label className="ml-1 block text-sm font-medium text-on-surface-variant">Permission Level</label>
                                    <select className="w-full cursor-pointer appearance-none rounded-lg border-outline-variant bg-surface glass-input p-4 text-on-surface transition-all focus:outline-none focus:ring-2 focus:ring-primary">
                                        <option value="view">Viewer - Read Only</option>
                                        <option value="edit">Editor - Content Management</option>
                                        <option value="mod">Moderator - User Management</option>
                                        <option value="admin">Administrator - Full Control</option>
                                    </select>
                                </div>
                                <div className="pt-2">
                                    <button className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-primary py-4 text-sm font-medium text-on-primary transition-all hover:brightness-110 active:scale-[0.98]" type="button">
                                        <span>Send Invitation</span>
                                        <span className="material-symbols-outlined text-[18px]">send</span>
                                    </button>
                                </div>
                            </form>
                            <div className="mt-12 border-t border-outline-variant/30 pt-6">
                                <h4 className="mb-2 text-sm font-medium text-on-surface-variant">Pending Invitations</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between rounded-lg border border-outline-variant/20 bg-surface-container/30 p-2">
                                        <span className="font-mono text-sm text-on-surface">sarah.j@jobmind.io</span>
                                        <span className="rounded bg-tertiary-container/20 px-2 py-1 text-[10px] font-bold uppercase tracking-tighter text-tertiary">Expires 2d</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/* System Health Mini Card */}
                        <div className="rounded-xl border-l-4 border-primary bg-surface-container/80 p-6 backdrop-blur-md">
                            <h4 className="mb-1 text-[10px] font-medium uppercase tracking-widest text-primary">Security Protocol</h4>
                            <p className="text-sm text-on-surface-variant">All administrative actions are logged in the immutable audit trail. Ensure 2FA is active for all accounts.</p>
                        </div>
                    </div>
                    
                    {/* Admin List (Bento Style Right) */}
                    <div className="lg:col-span-8">
                        <section className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container/80 backdrop-blur-md">
                            <div className="flex items-center justify-between border-b border-outline-variant/30 p-6">
                                <h3 className="text-2xl font-bold text-on-surface">Team Directory</h3>
                                <div className="flex gap-2">
                                    <button className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-variant/50">
                                        <span className="material-symbols-outlined">filter_list</span>
                                    </button>
                                    <button className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-variant/50">
                                        <span className="material-symbols-outlined">download</span>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 p-6">
                                {admins.length === 0 ? (
                                    <div className="col-span-full py-8 text-center text-on-surface-variant">
                                        No admins found.
                                    </div>
                                ) : admins.map((admin) => (
                                    <div key={admin.id} className="group relative flex items-start gap-4 rounded-xl border border-outline-variant/30 bg-surface-container/30 p-4 transition-all hover:border-primary/30 hover:bg-surface-variant/20">
                                        <img 
                                            src={admin.avatar} 
                                            alt={admin.name} 
                                            className="h-12 w-12 rounded-lg border border-outline-variant/50 object-cover"
                                        />
                                        <div className="flex-1 relative">
                                            <div className="flex items-center justify-between">
                                                <h4 className="text-base font-bold text-on-surface">{admin.name}</h4>
                                                <div className="relative">
                                                    <button 
                                                        onClick={() => toggleMenu(admin.id)}
                                                        className={`flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface text-on-surface transition-all hover:bg-surface-variant hover:text-primary ${openMenuId === admin.id ? 'opacity-100 bg-surface-variant' : 'opacity-0 group-hover:opacity-100'}`}
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">more_vert</span>
                                                    </button>
                                                    
                                                    {openMenuId === admin.id && (
                                                        <>
                                                            <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)}></div>
                                                            <div className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-xl">
                                                                <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-on-surface transition-colors hover:bg-surface-variant/50">
                                                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                                                    Edit Role
                                                                </button>
                                                                <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm font-medium text-error transition-colors hover:bg-error/10">
                                                                    <span className="material-symbols-outlined text-[18px]">person_remove</span>
                                                                    Revoke
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm font-medium text-primary">{admin.role}</p>
                                            <p className="font-mono text-xs text-on-surface-variant">{admin.email}</p>
                                            <p className="font-mono text-[10px] text-on-surface-variant/70 mt-1">Joined: {admin.joined}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
