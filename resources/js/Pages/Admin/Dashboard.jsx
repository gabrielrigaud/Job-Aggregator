import React from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatCard from '@/Components/Admin/StatCard';

export default function Dashboard({ stats, logs = [], queue = { pending: 0, failed: 0, status: 'Idle', progress: 100 }, adminsPulse = [], trendingJobs = [] }) {
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
                                value={stats?.totalUsers || "0"}
                                icon="group"
                                variant="primary"
                                badge={<span className="rounded bg-green-500/10 px-1.5 py-0.5 font-mono text-[10px] text-green-600">Live</span>}
                            />
                            <StatCard
                                title="Active Jobs"
                                value={stats?.activeJobs || "0"}
                                icon="work"
                                variant="tertiary"
                                badge={<span className="rounded bg-green-500/10 px-1.5 py-0.5 font-mono text-[10px] text-green-600">Live</span>}
                            />
                            <StatCard
                                title="Pending Reports"
                                value={stats?.pendingReports || "0"}
                                icon="report"
                                variant="error"
                                badge={<span className="rounded bg-surface-variant px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">Stable</span>}
                            />
                            <StatCard
                                title="Active Admins"
                                value={stats?.activeAdmins || "0"}
                                icon="shield_person"
                                variant="secondary"
                                badge={<span className="rounded bg-surface-variant px-1.5 py-0.5 font-mono text-[10px] text-on-surface-variant">Live</span>}
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
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {logs.length > 0 ? logs.map((log, index) => (
                                            <div key={index} className="group flex gap-4">
                                                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                                                    log.level === 'ERROR' ? 'bg-red-500/15 text-red-600 dark:bg-red-500/20 dark:text-red-400' :
                                                    log.level === 'WARNING' ? 'bg-amber-500/15 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400' :
                                                    'bg-indigo-500/15 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'
                                                }`}>
                                                    <span className="material-symbols-outlined text-[18px]">
                                                        {log.level === 'ERROR' ? 'error' : log.level === 'WARNING' ? 'warning' : 'info'}
                                                    </span>
                                                </div>
                                                <div className="flex-1 border-b border-outline-variant pb-3">
                                                    <div className="mb-0.5 flex items-start justify-between">
                                                        <p className="text-sm font-semibold text-on-surface transition-colors group-hover:text-primary">
                                                            {log.level}
                                                        </p>
                                                        <span className="font-mono text-[10px] text-on-surface-variant">{log.date}</span>
                                                    </div>
                                                    <p className="line-clamp-2 text-xs text-on-surface-variant" title={log.message}>{log.message}</p>
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="text-sm text-on-surface-variant text-center py-4">No recent system logs.</p>
                                        )}
                                    </div>
                                </div>
                                <a href="/log-viewer" target="_blank" className="mt-6 block w-full rounded-lg bg-surface-container-high py-2.5 text-center text-sm font-medium text-on-surface transition-colors hover:bg-surface-variant hover:text-primary">
                                    View Full System Logs
                                </a>
                            </div>
                        </div>

                        {/* Secondary Grid - Top Performers & Queue */}
                        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
                            {/* Active Postings List */}
                            <div className="flex w-full flex-col justify-between rounded-xl border border-outline-variant bg-surface p-6 shadow-sm lg:w-1/2">
                                <div>
                                    <div className="mb-6 flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-on-surface">Trending Jobs</h3>
                                        <a className="text-sm font-semibold text-primary dark:text-indigo-300 hover:underline" href={route('admin.jobs.preview')}>Manage All</a>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        {trendingJobs.length > 0 ? trendingJobs.map((job, index) => (
                                            <div key={job.id} className="flex cursor-pointer items-center justify-between rounded-xl border border-outline-variant/50 bg-surface-container-low/50 p-4 transition-all hover:border-primary" onClick={() => window.location.href = job.url}>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-outline-variant/40 bg-white p-1 shadow-sm">
                                                        <span className="material-symbols-outlined text-primary dark:text-indigo-300">
                                                            {index === 0 ? 'corporate_fare' : 'account_balance'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-on-surface">{job.title}</p>
                                                        <p className="mt-0.5 text-xs text-on-surface-variant">{job.company} • {job.location}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono text-base font-bold text-on-surface">{job.views}</p>
                                                    <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Views</p>
                                                </div>
                                            </div>
                                        )) : (
                                            <p className="text-sm text-on-surface-variant">No jobs found yet.</p>
                                        )}
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
                                        {adminsPulse.map((admin, idx) => (
                                            <div key={idx} className="flex flex-1 flex-col items-center justify-center rounded-xl border border-outline-variant/50 bg-surface-container-low/50 p-4">
                                                <img
                                                    alt={admin.name}
                                                    className="mb-2.5 h-12 w-12 rounded-full border-2 border-primary object-cover shadow-sm"
                                                    src={admin.avatar}
                                                />
                                                <p className="text-center text-xs font-semibold text-on-surface">{admin.name}</p>
                                                <p className="mt-1 font-mono text-[10px] text-on-surface-variant">Admin</p>
                                            </div>
                                        ))}
                                        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-outline-variant/50 bg-surface-container-low/50 p-4">
                                            <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-outline-variant bg-surface-variant/40">
                                                <span className="material-symbols-outlined text-[22px] text-on-surface-variant">add</span>
                                            </div>
                                            <p className="text-center text-xs font-semibold text-on-surface">Invite</p>
                                            <p className="mt-1 font-mono text-[10px] text-on-surface-variant">New Seat</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 rounded-xl border border-outline-variant/60 bg-surface-container-low/60 dark:bg-surface-container-highest/30 p-4">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs font-semibold text-on-surface">Background Queue: {queue.status}</span>
                                        <span className="font-mono text-xs font-bold text-primary dark:text-indigo-300">
                                            {queue.pending} Pending / {queue.failed} Failed
                                        </span>
                                    </div>
                                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest dark:bg-surface-variant/50">
                                        <div className={`h-full rounded-full bg-primary dark:bg-indigo-500 transition-all duration-500`} style={{ width: `${queue.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </AdminLayout>
    );
}
