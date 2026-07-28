import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatCard from '@/Components/Admin/StatCard';

export default function Jobs({ jobs = [], stats = {}, auditLogs = [], healthStats = {} }) {
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
                        value={stats?.totalActive || "0"}
                        icon="work"
                        variant="primary"
                        badge={<span className="rounded bg-green-500/10 px-1.5 py-0.5 font-mono text-[10px] text-green-600">Live</span>}
                    />

                    <StatCard
                        title="Pending Review"
                        value={stats?.pendingReview || "0"}
                        icon="timer"
                        variant="tertiary"
                        badge={<span className="rounded bg-tertiary/10 px-1.5 py-0.5 font-mono text-[10px] text-tertiary">Stable</span>}
                    />

                    <StatCard
                        title="Flagged Offers"
                        value={stats?.flagged || "0"}
                        icon="flag"
                        variant="error"
                        badge={<span className="rounded bg-error/10 px-1.5 py-0.5 font-mono text-[10px] text-error">Stable</span>}
                    />

                    <StatCard
                        title="Average Salary"
                        value={stats?.averageSalary || "N/A"}
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
                                {jobs.data && jobs.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-on-surface-variant">
                                            No jobs found.
                                        </td>
                                    </tr>
                                ) : (jobs.data || jobs).map((job) => (
                                    <tr key={job.id} className="group transition-colors hover:bg-surface-variant/20">
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant bg-surface-container">
                                                    <span className="material-symbols-outlined text-primary">bolt</span>
                                                </div>
                                                <div>
                                                    <p className="text-base font-semibold text-on-surface">{job.company_name}</p>
                                                    <p className="font-mono text-xs text-on-surface-variant">{job.website}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <p className="text-sm font-bold text-on-surface">{job.title}</p>
                                            <p className="flex items-center gap-1 text-xs text-on-surface-variant">
                                                <span className="material-symbols-outlined text-[14px]">location_on</span>
                                                {job.location}
                                            </p>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className="font-mono text-[13px] text-on-surface">{job.salary_range}</span>
                                        </td>
                                        <td className="px-6 py-6 text-center">
                                            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-green-400">{job.status}</span>
                                        </td>
                                        <td className="px-6 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Link 
                                                    href={`/jobs/${job.id}`} 
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface transition-all hover:text-primary"
                                                    title="View Public Job Page"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                                                </Link>
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Are you sure you want to delete this job offer?')) {
                                                            router.delete(`/admin/jobs/${job.id}`);
                                                        }
                                                    }}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-outline-variant/30 bg-surface transition-all hover:text-error"
                                                    title="Delete Job"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Table Footer / Pagination */}
                    {jobs.links && (
                        <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant bg-surface-container-low/50 px-6 py-4 sm:flex-row">
                            <span className="text-sm text-on-surface-variant">
                                Showing {jobs.from} to {jobs.to} of {jobs.total} jobs
                            </span>
                            <div className="flex items-center gap-1">
                                {jobs.links.map((link, index) => {
                                    const isChevron = link.label.includes('Previous') || link.label.includes('Next');
                                    let label = link.label;
                                    if (label.includes('Previous')) label = '<span class="material-symbols-outlined text-[18px]">chevron_left</span>';
                                    if (label.includes('Next')) label = '<span class="material-symbols-outlined text-[18px]">chevron_right</span>';

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`flex h-8 min-w-8 items-center justify-center rounded border px-2 text-xs font-semibold ${
                                                link.active 
                                                ? 'bg-primary border-primary text-on-primary' 
                                                : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant/50'
                                            } ${!link.url && 'opacity-50 cursor-not-allowed'}`}
                                            dangerouslySetInnerHTML={{ __html: label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Activity Panel */}
                <div className="mt-8 flex flex-col gap-6 lg:flex-row">
                    <div className="flex w-full flex-col rounded-xl border border-outline-variant bg-surface-container/80 p-6 backdrop-blur-md lg:w-2/3">
                        <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold text-on-surface">
                            <span className="material-symbols-outlined text-primary">history</span>
                            Audit Log
                        </h3>
                        <div className="space-y-4">
                            {auditLogs?.map(log => (
                                <div key={log.id} className="flex items-start gap-4 rounded-lg border border-transparent p-4 transition-all hover:border-outline-variant/30 hover:bg-surface-variant/20">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                                        <span className="material-symbols-outlined text-sm text-green-400">{log.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm text-on-surface" dangerouslySetInnerHTML={{ __html: log.message }}></p>
                                        <p className="mt-1 text-xs text-on-surface-variant">{log.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container/80 p-6 backdrop-blur-md lg:w-1/3">
                        <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl"></div>
                        <h3 className="mb-6 text-2xl font-bold text-on-surface">Data Health</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Salary Extraction</span>
                                    <span className="font-bold text-primary">{healthStats?.clearance ?? 0}%</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                                    <div className="h-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${healthStats?.clearance ?? 0}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="mb-1 flex justify-between text-sm">
                                    <span className="text-on-surface-variant">Import Frequency</span>
                                    <span className="font-bold text-on-surface">{healthStats?.response ?? 'N/A'}</span>
                                </div>
                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
                                    <div className="h-full bg-secondary" style={{ width: `${healthStats?.responsePercent ?? 0}%` }}></div>
                                </div>
                            </div>
                            <div className="mt-4 border-t border-outline-variant/30 pt-4">
                                <p className="text-xs italic text-on-surface-variant">{healthStats?.message}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
