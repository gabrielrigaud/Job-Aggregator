import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatCard from '@/Components/Admin/StatCard';

export default function Dashboard({ stats, logs = [], queue = { pending: 0, failed: 0, status: 'Idle', progress: 100 }, adminsPulse = [], trendingJobs = [] }) {
    const [logsExpanded, setLogsExpanded] = useState(false);
    const [logsPerPage, setLogsPerPage] = useState(15);
    const [logsPage, setLogsPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(logs.length / logsPerPage));
    const currentPage = Math.min(logsPage, totalPages);
    const visibleLogs = logsExpanded
        ? logs.slice((currentPage - 1) * logsPerPage, currentPage * logsPerPage)
        : logs.slice(0, 4);

    const handlePerPageChange = (value) => {
        setLogsPerPage(value);
        setLogsPage(1);
    };

    return (
        <AdminLayout>
            <Head title="Administration - Vue d'ensemble" />

            <div className="w-full space-y-5">
                <PageHeader
                    title="Vue d'ensemble"
                    description="Indicateurs clés de la plateforme, offres populaires et journaux système."
                />

                {/* KPIs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Utilisateurs inscrits"
                        value={stats?.totalUsers || '0'}
                        icon="group"
                        variant="primary"
                    />
                    <StatCard
                        title="Offres actives"
                        value={stats?.activeJobs || '0'}
                        icon="work"
                        variant="tertiary"
                    />
                    <StatCard
                        title="Administrateurs"
                        value={stats?.activeAdmins || '0'}
                        icon="shield_person"
                        variant="secondary"
                    />
                    <StatCard
                        title="Tâches en échec"
                        value={String(stats?.failedJobs ?? 0)}
                        icon="error_outline"
                        variant="error"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Offres les plus consultées */}
                    <div className="glass-panel rounded-xl p-5 shadow-2xs lg:col-span-7 flex flex-col">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-base font-bold text-on-surface">Offres les plus consultées</h3>
                            <Link className="text-xs font-semibold text-primary hover:underline" href={route('admin.jobs.preview')}>
                                Gérer les offres
                            </Link>
                        </div>

                        <div className="space-y-2.5 flex-1">
                            {trendingJobs.length > 0 ? trendingJobs.map((job) => (
                                <Link
                                    key={job.id}
                                    href={`/?job=${job.id}`}
                                    className="flex items-center justify-between rounded-lg border border-outline-variant/50 bg-surface-container-low/50 p-3 transition-colors hover:border-primary/40"
                                >
                                    <div className="min-w-0 pr-3">
                                        <p className="truncate text-sm font-semibold text-on-surface">{job.title}</p>
                                        <p className="truncate text-xs text-on-surface-variant">{job.company} • {job.location}</p>
                                    </div>
                                    <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                                        {job.views} {job.views > 1 ? 'vues' : 'vue'}
                                    </span>
                                </Link>
                            )) : (
                                <p className="py-8 text-center text-xs text-on-surface-variant">Aucune offre consultée pour le moment.</p>
                            )}
                        </div>
                    </div>

                    {/* Équipe Admin & File d'attente */}
                    <div className="space-y-5 lg:col-span-5">
                        <div className="glass-panel rounded-xl p-5 shadow-2xs">
                            <div className="mb-3 flex items-center justify-between">
                                <h3 className="text-base font-bold text-on-surface">Équipe d'administration</h3>
                                <Link className="text-xs font-semibold text-primary hover:underline" href={route('admin.admins.preview')}>
                                    Gérer
                                </Link>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {adminsPulse.map((admin, idx) => (
                                    <div key={idx} className="flex items-center gap-2 rounded-lg border border-outline-variant/50 bg-surface-container-low/50 px-3 py-1.5">
                                        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                                            {admin.initials}
                                        </div>
                                        <span className="text-xs font-semibold text-on-surface">{admin.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-panel rounded-xl p-5 shadow-2xs">
                            <h3 className="mb-3 text-base font-bold text-on-surface">File de tâches (Queue)</h3>
                            <div className="flex items-center justify-between text-xs mb-2">
                                <span className="font-medium text-on-surface-variant">
                                    Statut : <strong className="text-on-surface">{queue.pending > 0 ? 'En cours' : 'Inactive'}</strong>
                                </span>
                                <span className="text-on-surface-variant">
                                    {queue.pending} en attente / {queue.failed} en échec
                                </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container">
                                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${queue.progress}%` }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logs système */}
                <div className="glass-panel rounded-xl p-5 shadow-2xs">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={() => setLogsExpanded((prev) => !prev)}
                            className="flex items-center gap-1.5 text-left group outline-none"
                            aria-expanded={logsExpanded}
                        >
                            <h3 className="text-base font-bold text-on-surface group-hover:text-primary transition-colors">
                                Logs système récents
                            </h3>
                            <span className="text-xs text-on-surface-variant font-normal">({logs.length})</span>
                            <span aria-hidden="true" className="material-symbols-outlined text-[20px] text-on-surface-variant group-hover:text-primary transition-transform">
                                {logsExpanded ? 'expand_less' : 'expand_more'}
                            </span>
                        </button>

                        {logsExpanded && logs.length > 0 && (
                            <div className="flex items-center gap-3 text-xs">
                                <div className="flex items-center gap-1 rounded-lg border border-outline-variant/60 bg-surface-container-low p-0.5">
                                    {[15, 30].map((size) => (
                                        <button
                                            key={size}
                                            type="button"
                                            onClick={() => handlePerPageChange(size)}
                                            className={`px-2 py-0.5 rounded-md font-semibold transition-colors ${
                                                logsPerPage === size
                                                    ? 'bg-primary text-on-primary'
                                                    : 'text-on-surface-variant hover:text-on-surface'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => setLogsPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage <= 1}
                                        aria-label="Page précédente des logs"
                                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-outline-variant/60 text-on-surface-variant hover:border-primary/50 hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
                                    >
                                        <span aria-hidden="true" className="material-symbols-outlined text-[18px]">chevron_left</span>
                                    </button>
                                    <span className="text-xs font-medium text-on-surface-variant min-w-[54px] text-center">
                                        {currentPage} / {totalPages}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setLogsPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage >= totalPages}
                                        aria-label="Page suivante des logs"
                                        className="flex h-7 w-7 items-center justify-center rounded-lg border border-outline-variant/60 text-on-surface-variant hover:border-primary/50 hover:text-primary disabled:opacity-40 disabled:pointer-events-none transition-colors"
                                    >
                                        <span aria-hidden="true" className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        {visibleLogs.length > 0 ? visibleLogs.map((log, idx) => (
                            <div key={idx} className="flex items-start justify-between gap-4 rounded-lg border border-outline-variant/40 bg-surface-container-low/40 p-2.5 text-xs">
                                <div className="flex items-start gap-2.5 min-w-0">
                                    <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                                        log.level === 'ERROR'
                                            ? 'bg-error/10 text-error'
                                            : 'bg-primary/10 text-primary'
                                    }`}>
                                        {log.level}
                                    </span>
                                    <span className="truncate text-on-surface">{log.message}</span>
                                </div>
                                <span className="shrink-0 text-on-surface-variant">{log.date}</span>
                            </div>
                        )) : (
                            <p className="py-4 text-center text-xs text-on-surface-variant">Aucun log système récent.</p>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
