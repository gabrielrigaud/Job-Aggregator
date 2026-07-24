import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';

export default function Admins() {
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
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse text-left">
                                    <thead>
                                        <tr className="bg-surface-container-highest/30">
                                            <th className="whitespace-nowrap border-b border-outline-variant/20 px-4 py-4 text-sm font-medium text-on-surface-variant">Name</th>
                                            <th className="whitespace-nowrap border-b border-outline-variant/20 px-4 py-4 text-sm font-medium text-on-surface-variant">Role</th>
                                            <th className="whitespace-nowrap border-b border-outline-variant/20 px-4 py-4 text-sm font-medium text-on-surface-variant">Status</th>
                                            <th className="whitespace-nowrap border-b border-outline-variant/20 px-4 py-4 text-sm font-medium text-on-surface-variant">Last Active</th>
                                            <th className="whitespace-nowrap border-b border-outline-variant/20 px-4 py-4 text-right text-sm font-medium text-on-surface-variant">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/20">
                                        {/* Admin Row 1 */}
                                        <tr className="group transition-all hover:bg-surface-variant/20">
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img className="h-10 w-10 rounded-full border border-outline-variant/30 object-cover" src="https://ui-avatars.com/api/?name=Elena+Vance&background=random" />
                                                    <div>
                                                        <p className="text-sm font-medium text-on-surface">Elena Vance</p>
                                                        <p className="font-mono text-sm text-on-surface-variant">elena.v@jobmind.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <span className="rounded border border-primary/20 bg-primary-container/10 px-3 py-1 font-mono text-sm text-primary">Super Admin</span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                                                    <span className="text-sm text-on-surface">Active</span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-on-surface-variant">2 mins ago</td>
                                            <td className="whitespace-nowrap px-4 py-4 text-right">
                                                <button className="text-on-surface-variant transition-colors hover:text-primary">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Admin Row 2 */}
                                        <tr className="group transition-all hover:bg-surface-variant/20">
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img className="h-10 w-10 rounded-full border border-outline-variant/30 object-cover" src="https://ui-avatars.com/api/?name=Marcus+Thorne&background=random" />
                                                    <div>
                                                        <p className="text-sm font-medium text-on-surface">Marcus Thorne</p>
                                                        <p className="font-mono text-sm text-on-surface-variant">m.thorne@jobmind.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <span className="rounded border border-outline-variant/20 bg-surface-variant/50 px-3 py-1 font-mono text-sm text-on-surface-variant">Moderator</span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center gap-2 text-on-surface-variant">
                                                    <span className="h-2 w-2 rounded-full bg-outline-variant"></span>
                                                    <span className="text-sm">Offline</span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-on-surface-variant">5 hours ago</td>
                                            <td className="whitespace-nowrap px-4 py-4 text-right">
                                                <button className="text-on-surface-variant transition-colors hover:text-primary">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Admin Row 3 */}
                                        <tr className="group transition-all hover:bg-surface-variant/20">
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img className="h-10 w-10 rounded-full border border-outline-variant/30 object-cover" src="https://ui-avatars.com/api/?name=Lina+Choi&background=random" />
                                                    <div>
                                                        <p className="text-sm font-medium text-on-surface">Lina Choi</p>
                                                        <p className="font-mono text-sm text-on-surface-variant">l.choi@jobmind.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <span className="rounded border border-outline-variant/20 bg-surface-variant/50 px-3 py-1 font-mono text-sm text-on-surface-variant">Editor</span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                                                    <span className="text-sm text-on-surface">Active</span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-on-surface-variant">Online Now</td>
                                            <td className="whitespace-nowrap px-4 py-4 text-right">
                                                <button className="text-on-surface-variant transition-colors hover:text-primary">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                        {/* Admin Row 4 */}
                                        <tr className="group transition-all hover:bg-surface-variant/20">
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img className="h-10 w-10 rounded-full border border-outline-variant/30 object-cover" src="https://ui-avatars.com/api/?name=David+Chen&background=random" />
                                                    <div>
                                                        <p className="text-sm font-medium text-on-surface">David Chen</p>
                                                        <p className="font-mono text-sm text-on-surface-variant">d.chen@jobmind.com</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <span className="rounded border border-outline-variant/20 bg-surface-variant/50 px-3 py-1 font-mono text-sm text-on-surface-variant">Viewer</span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4">
                                                <div className="flex items-center gap-2 text-on-surface-variant">
                                                    <span className="h-2 w-2 rounded-full bg-outline-variant"></span>
                                                    <span className="text-sm">Offline</span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-sm text-on-surface-variant">Yesterday</td>
                                            <td className="whitespace-nowrap px-4 py-4 text-right">
                                                <button className="text-on-surface-variant transition-colors hover:text-primary">
                                                    <span className="material-symbols-outlined">more_vert</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-between border-t border-outline-variant/30 bg-surface-container/50 p-6">
                                <span className="text-sm text-on-surface-variant">Showing 4 of 12 admins</span>
                                <div className="flex gap-2">
                                    <button className="rounded border border-outline-variant px-4 py-2 text-on-surface-variant transition-colors hover:bg-surface-variant/50 disabled:opacity-30" disabled>Previous</button>
                                    <button className="rounded border border-outline-variant px-4 py-2 text-on-surface-variant transition-colors hover:bg-surface-variant/50">Next</button>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
