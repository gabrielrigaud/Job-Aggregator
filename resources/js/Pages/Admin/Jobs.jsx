import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatCard from '@/Components/Admin/StatCard';

export default function Jobs() {
    return (
        <AdminLayout>
            <Head title="JobMind Admin - Job Moderation" />

            {/* Main Content Canvas */}
            <div className="mx-auto max-w-7xl">
                <PageHeader 
                    title="Job Moderation" 
                    description="Review and manage active job listings across the platform."
                >
                    <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-on-surface hover:bg-surface-variant/50 transition-all active:scale-95 text-sm font-semibold border border-outline-variant/30">
                        <span className="material-symbols-outlined text-[18px]">filter_list</span>
                        Filters
                    </button>
                    <button className="flex items-center gap-1 px-4 py-2 bg-primary rounded-lg text-on-primary text-sm font-semibold transition-all active:scale-95 shadow-sm hover:brightness-110">
                        <span className="material-symbols-outlined text-[18px]">add</span>
                        Manual Listing
                    </button>
                </PageHeader>

                {/* Bento Stats Summary */}
                <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Active"
                        value="1,284"
                        icon="work"
                        variant="primary"
                        badge={<span className="rounded bg-green-500/10 px-1.5 py-0.5 font-mono text-[10px] text-green-600">+12.0%</span>}
                    />

                    <StatCard
                        title="Pending Review"
                        value="42"
                        icon="timer"
                        variant="tertiary"
                        badge={<span className="rounded bg-tertiary/10 px-1.5 py-0.5 font-mono text-[10px] text-tertiary">Critical</span>}
                    />

                    <StatCard
                        title="Flagged Offers"
                        value="8"
                        icon="flag"
                        variant="error"
                        badge={<span className="rounded bg-error/10 px-1.5 py-0.5 font-mono text-[10px] text-error">Requires Action</span>}
                    />

                    <StatCard
                        title="Average Salary"
                        value="$142k"
                        icon="payments"
                        variant="secondary"
                        badge={<span className="rounded bg-surface-variant px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">Global</span>}
                    />
                </div>

                {/* Main Moderation Table */}
                <div className="mt-8 mb-12 overflow-hidden rounded-xl border border-outline-variant bg-surface-container/80 backdrop-blur-md">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-outline-variant bg-surface-container-highest/30">
                                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Company</th>
                                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Job Title</th>
                                    <th className="px-6 py-4 text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Salary Range</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Status</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold uppercase tracking-wider text-on-surface-variant">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/30">
                                {/* Row 1 */}
                                <tr className="group transition-colors hover:bg-surface-variant/20">
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container">
                                                <span className="material-symbols-outlined text-primary">bolt</span>
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold text-on-surface">TechFlow Systems</p>
                                                <p className="font-mono text-xs text-on-surface-variant">techflow.io</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-base text-on-surface">Senior Infrastructure Engineer</p>
                                        <p className="text-xs text-on-surface-variant">Remote · Full-time</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="font-mono text-[13px] text-on-surface">$160k — $210k</span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-green-400">Active</span>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface transition-all hover:text-primary">
                                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            </button>
                                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface transition-all hover:text-error">
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 2 */}
                                <tr className="group transition-colors hover:bg-surface-variant/20">
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container">
                                                <span className="material-symbols-outlined text-secondary">database</span>
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold text-on-surface">QueryCore</p>
                                                <p className="font-mono text-xs text-on-surface-variant">querycore.ai</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-base text-on-surface">Lead Data Scientist</p>
                                        <p className="text-xs text-on-surface-variant">London, UK · Hybrid</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="font-mono text-[13px] text-on-surface">$130k — $175k</span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className="rounded-full border border-tertiary/20 bg-tertiary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-tertiary">Pending</span>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface transition-all hover:text-primary">
                                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            </button>
                                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface transition-all hover:text-error">
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 3 */}
                                <tr className="group transition-colors hover:bg-surface-variant/20">
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container">
                                                <span className="material-symbols-outlined text-primary-container">layers</span>
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold text-on-surface">StackSmith</p>
                                                <p className="font-mono text-xs text-on-surface-variant">stacksmith.com</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-base text-on-surface">Full Stack Developer</p>
                                        <p className="text-xs text-on-surface-variant">Austin, TX · On-site</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="font-mono text-[13px] text-on-surface">$110k — $150k</span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-green-400">Active</span>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface transition-all hover:text-primary">
                                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            </button>
                                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface transition-all hover:text-error">
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                {/* Row 4 */}
                                <tr className="group border-l-2 border-l-error transition-colors hover:bg-surface-variant/20">
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container">
                                                <span className="material-symbols-outlined text-error">warning</span>
                                            </div>
                                            <div>
                                                <p className="text-base font-semibold text-on-surface">CryptoNexus</p>
                                                <p className="font-mono text-xs text-on-surface-variant">nexus.cx</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-base text-on-surface">Solidity Developer</p>
                                        <p className="text-xs text-on-surface-variant">Global · Remote</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <span className="font-mono text-[13px] text-on-surface">$180k — $250k</span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className="rounded-full border border-error/20 bg-error/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-error">Flagged</span>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface transition-all hover:text-primary">
                                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                                            </button>
                                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-error/30 bg-error/20 text-error transition-all hover:bg-error hover:text-white">
                                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Table Footer / Pagination */}
                    <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant bg-surface-container-low/50 px-6 py-4 sm:flex-row">
                        <span className="text-sm text-on-surface-variant">Showing 1 to 4 of 42 entries</span>
                        <div className="flex items-center gap-1">
                            <button className="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg border border-outline-variant/30 bg-surface opacity-50">
                                <span className="material-symbols-outlined">chevron_left</span>
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white">1</button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface text-xs text-on-surface transition-all hover:bg-surface-variant/50">2</button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface text-xs text-on-surface transition-all hover:bg-surface-variant/50">3</button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface text-on-surface transition-all hover:bg-surface-variant/50">
                                <span className="material-symbols-outlined">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Panel */}
                <div className="mt-8 flex flex-col gap-6 lg:flex-row">
                    <div className="flex w-full flex-col rounded-xl border border-outline-variant bg-surface-container/80 p-6 backdrop-blur-md lg:w-2/3">
                        <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-on-surface">
                            <span className="material-symbols-outlined text-primary">history</span>
                            Audit Log
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 rounded-lg border border-transparent p-4 transition-all hover:border-outline-variant/30 hover:bg-surface-variant/20">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                                    <span className="material-symbols-outlined text-sm text-green-400">check_circle</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-on-surface">Listing <span className="font-semibold">"Senior Product Designer"</span> approved by <span className="text-primary">Admin_JSmith</span></p>
                                    <p className="mt-1 text-xs text-on-surface-variant">2 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-lg border border-transparent p-4 transition-all hover:border-outline-variant/30 hover:bg-surface-variant/20">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-error/20">
                                    <span className="material-symbols-outlined text-sm text-error">cancel</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-on-surface">Listing <span className="font-semibold">"Junior React Dev"</span> deleted due to <span className="text-error">Incomplete Salary Info</span></p>
                                    <p className="mt-1 text-xs text-on-surface-variant">14 minutes ago</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 rounded-lg border border-transparent p-4 transition-all hover:border-outline-variant/30 hover:bg-surface-variant/20">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20">
                                    <span className="material-symbols-outlined text-sm text-primary">edit</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-on-surface">Salary range updated for <span className="font-semibold">"Staff Backend"</span> by system automation</p>
                                    <p className="mt-1 text-xs text-on-surface-variant">1 hour ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container/80 p-6 backdrop-blur-md lg:w-1/3">
                        <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl"></div>
                        <h3 className="mb-6 text-2xl font-bold text-on-surface">Moderation Health</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Queue Clearance</span>
                                    <span className="font-bold text-primary">92%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                                    <div className="h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Response Time</span>
                                    <span className="font-bold text-on-surface">1.2h avg</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                                    <div className="h-full bg-secondary" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <div className="mt-4 border-t border-outline-variant/30 pt-4">
                                <p className="text-xs italic text-on-surface-variant">"Moderation efficiency is up 14% this week. Keep maintaining high standards for listing quality."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
