import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatCard from '@/Components/Admin/StatCard';

export default function Dashboard() {
    return (
        <AdminLayout>
            <Head title="Admin Console - Overview" />

            <div className="mx-auto max-w-7xl">
                        {/* Header Section */}
                        <PageHeader 
                            title="System Overview" 
                            description="Real-time platform performance and core metrics."
                        >
                            <button className="flex items-center gap-2 rounded-md border border-outline-variant bg-surface px-4 py-2 text-sm font-medium text-on-surface transition-all hover:bg-surface-variant">
                                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                                Last 24 Hours
                            </button>
                            <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-on-primary shadow-sm transition-all hover:brightness-110 active:scale-95">
                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>download</span>
                                Export Report
                            </button>
                        </PageHeader>

                        {/* Bento Grid Stats */}
                        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                title="Total Users"
                                value="24,592"
                                icon="group"
                                variant="primary"
                                badge={<span className="rounded bg-green-500/10 px-1.5 py-0.5 font-mono text-[10px] text-green-600">+12.4%</span>}
                            />
                            <StatCard
                                title="Active Jobs"
                                value="1,842"
                                icon="work"
                                variant="tertiary"
                                badge={<span className="rounded bg-green-500/10 px-1.5 py-0.5 font-mono text-[10px] text-green-600">+8.1%</span>}
                            />
                            <StatCard
                                title="Pending Reports"
                                value="14"
                                icon="report"
                                variant="error"
                                badge={<span className="rounded bg-error/10 px-1.5 py-0.5 font-mono text-[10px] text-error">-2.4%</span>}
                            />
                            <StatCard
                                title="Active Admins"
                                value="38"
                                icon="shield_person"
                                variant="secondary"
                                badge={<span className="rounded bg-surface-variant px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">Stable</span>}
                            />
                        </div>

                        {/* Main Charts & Activity */}
                        <div className="flex flex-col gap-6 lg:flex-row">
                            {/* Health Chart */}
                            <div className="flex w-full flex-col rounded-xl border border-outline-variant bg-surface p-6 shadow-sm lg:w-2/3">
                                <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-on-surface">Platform Health</h3>
                                        <p className="mt-0.5 text-sm text-on-surface-variant">Resource allocation & uptime metrics</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-[#4f46e5]"></span>
                                            <span className="text-xs font-medium text-on-surface-variant">API Latency</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-[#9333ea]"></span>
                                            <span className="text-xs font-medium text-on-surface-variant">Error Rate</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Mock Chart Container */}
                                <div className="relative flex min-h-[220px] flex-1 flex-col justify-end pt-4">
                                    {/* Chart Lines Simulation */}
                                    <div className="pointer-events-none absolute inset-0 mb-6 flex flex-col justify-between opacity-15">
                                        <div className="w-full border-t border-on-surface-variant"></div>
                                        <div className="w-full border-t border-on-surface-variant"></div>
                                        <div className="w-full border-t border-on-surface-variant"></div>
                                    </div>
                                    {/* X-Axis Labels */}
                                    <div className="flex w-full justify-between px-2 text-[10px] font-bold text-on-surface-variant">
                                        <span>00:00</span>
                                        <span>04:00</span>
                                        <span>08:00</span>
                                        <span>12:00</span>
                                        <span>16:00</span>
                                        <span>20:00</span>
                                    </div>
                                </div>
                            </div>

                            {/* System Logs */}
                            <div className="flex w-full flex-col justify-between rounded-xl border border-outline-variant bg-surface p-6 shadow-sm lg:w-1/3">
                                <div>
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-on-surface">System Logs</h3>
                                        <button className="text-on-surface-variant hover:text-primary">
                                            <span className="material-symbols-outlined">more_vert</span>
                                        </button>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div className="group flex gap-4">
                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
                                                <span className="material-symbols-outlined text-[18px]">person_add</span>
                                            </div>
                                            <div className="flex-1 border-b border-outline-variant pb-3">
                                                <div className="mb-0.5 flex items-start justify-between">
                                                    <p className="text-sm font-semibold text-on-surface transition-colors group-hover:text-primary">New Admin Added</p>
                                                    <span className="font-mono text-[10px] text-on-surface-variant">2m ago</span>
                                                </div>
                                                <p className="line-clamp-1 text-xs text-on-surface-variant">Sarah K. was granted Super Admin...</p>
                                            </div>
                                        </div>
                                        <div className="group flex gap-4">
                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:bg-red-500/20 dark:text-red-400">
                                                <span className="material-symbols-outlined text-[18px]">priority_high</span>
                                            </div>
                                            <div className="flex-1 border-b border-outline-variant pb-3">
                                                <div className="mb-0.5 flex items-start justify-between">
                                                    <p className="text-sm font-semibold text-on-surface transition-colors group-hover:text-red-600">Critical Report</p>
                                                    <span className="font-mono text-[10px] text-on-surface-variant">45m ago</span>
                                                </div>
                                                <p className="line-clamp-1 text-xs text-on-surface-variant">Job ID #8812 flagged for...</p>
                                            </div>
                                        </div>
                                        <div className="group flex gap-4">
                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                                                <span className="material-symbols-outlined text-[18px]">sync</span>
                                            </div>
                                            <div className="flex-1 border-b border-outline-variant pb-3">
                                                <div className="mb-0.5 flex items-start justify-between">
                                                    <p className="text-sm font-semibold text-on-surface transition-colors group-hover:text-indigo-600">Database Sync</p>
                                                    <span className="font-mono text-[10px] text-on-surface-variant">1h ago</span>
                                                </div>
                                                <p className="line-clamp-1 text-xs text-on-surface-variant">Global database replication...</p>
                                            </div>
                                        </div>
                                        <div className="group flex gap-4">
                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">
                                                <span className="material-symbols-outlined text-[18px]">login</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-0.5 flex items-start justify-between">
                                                    <p className="text-sm font-semibold text-on-surface transition-colors group-hover:text-purple-600">Security Audit</p>
                                                    <span className="font-mono text-[10px] text-on-surface-variant">3h ago</span>
                                                </div>
                                                <p className="line-clamp-1 text-xs text-on-surface-variant">Login attempt from unknown IP:...</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-6 w-full rounded-lg bg-surface-container-high py-2.5 text-center text-sm font-medium text-on-surface transition-colors hover:bg-surface-variant hover:text-primary">
                                    View Full System Logs
                                </button>
                            </div>
                        </div>

                        {/* Secondary Grid - Top Performers & Queue */}
                        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
                            {/* Active Postings List */}
                            <div className="flex w-full flex-col justify-between rounded-xl border border-outline-variant bg-surface p-6 shadow-sm lg:w-1/2">
                                <div>
                                    <div className="mb-5 flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-on-surface">Trending Jobs</h3>
                                        <a className="text-sm font-semibold text-[#4f46e5] hover:underline" href="#">Manage All</a>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex cursor-pointer items-center justify-between rounded-xl border border-outline-variant/50 bg-surface-container-low/50 p-4 transition-all hover:border-primary">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant/40 bg-white p-1 shadow-sm">
                                                    <span className="material-symbols-outlined text-[#4f46e5]">corporate_fare</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-on-surface">Senior Frontend Engineer</p>
                                                    <p className="mt-0.5 text-xs text-on-surface-variant">TechNexus • Remote</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-mono text-base font-bold text-on-surface">412</p>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Applicants</p>
                                            </div>
                                        </div>
                                        <div className="flex cursor-pointer items-center justify-between rounded-xl border border-outline-variant/50 bg-surface-container-low/50 p-4 transition-all hover:border-primary">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant/40 bg-white p-1 shadow-sm">
                                                    <span className="material-symbols-outlined text-[#9333ea]">account_balance</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-on-surface">Product Design Lead</p>
                                                    <p className="mt-0.5 text-xs text-on-surface-variant">FinFlow • San Francisco</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-mono text-base font-bold text-on-surface">285</p>
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Applicants</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Admin Team Performance */}
                            <div className="flex w-full flex-col justify-between rounded-xl border border-outline-variant bg-surface p-6 shadow-sm lg:w-1/2">
                                <div>
                                    <div className="mb-5 flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-on-surface">Admin Pulse</h3>
                                        <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">Live Now</span>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-outline-variant/50 bg-surface-container-low/50 p-4">
                                            <img
                                                alt="Elena G."
                                                className="mb-2.5 h-12 w-12 rounded-full border-2 border-[#4f46e5] object-cover shadow-sm"
                                                src="https://ui-avatars.com/api/?name=Elena+G&background=4f46e5&color=fff"
                                            />
                                            <p className="text-center text-xs font-semibold text-on-surface">Elena G.</p>
                                            <p className="mt-1 font-mono text-[10px] font-medium text-[#4f46e5]">12 Tasks</p>
                                        </div>
                                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-outline-variant/50 bg-surface-container-low/50 p-4">
                                            <img
                                                alt="Marcus V."
                                                className="mb-2.5 h-12 w-12 rounded-full border-2 border-outline-variant object-cover shadow-sm"
                                                src="https://ui-avatars.com/api/?name=Marcus+V&background=0d9488&color=fff"
                                            />
                                            <p className="text-center text-xs font-semibold text-on-surface">Marcus V.</p>
                                            <p className="mt-1 font-mono text-[10px] text-on-surface-variant">8 Tasks</p>
                                        </div>
                                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-outline-variant/50 bg-surface-container-low/50 p-4">
                                            <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-outline-variant bg-surface-variant/40">
                                                <span className="material-symbols-outlined text-[22px] text-on-surface-variant">add</span>
                                            </div>
                                            <p className="text-center text-xs font-semibold text-on-surface">Invite</p>
                                            <p className="mt-1 font-mono text-[10px] text-on-surface-variant">New Seat</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 rounded-xl border border-outline-variant/60 bg-surface-container-high/40 p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-semibold text-on-surface">Global Queue Progress</span>
                                        <span className="font-mono text-xs font-bold text-[#4f46e5]">82%</span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                                        <div className="h-full w-[82%] rounded-full bg-[#4f46e5]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </AdminLayout>
    );
}
