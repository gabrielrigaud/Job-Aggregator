import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';
import StatCard from '@/Components/Admin/StatCard';

export default function Jobs({ jobs = [], stats = {}, auditLogs = [], healthStats = {} }) {
    const [search, setSearch] = useState('');
    const rows = jobs.data || jobs;

    const filteredRows = rows.filter((job) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
            job.title.toLowerCase().includes(q) ||
            job.company.toLowerCase().includes(q) ||
            job.location.toLowerCase().includes(q)
        );
    });

    const handleDelete = (id, title) => {
        if (confirm(`Supprimer l'offre "${title}" ?`)) {
            router.delete(route('admin.jobs.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Administration - Offres d'emploi" />

            <div className="w-full space-y-5">
                <PageHeader
                    title="Modération des offres"
                    description="Consultez, vérifiez et modérez les offres d'emploi collectées."
                >
                    <div className="flex items-center rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-1.5 min-w-[240px]">
                        <span aria-hidden="true" className="material-symbols-outlined text-outline text-base mr-2">search</span>
                        <input
                            aria-label="Filtrer les offres"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Filtrer par titre, entreprise, lieu..."
                            className="w-full border-none bg-transparent text-xs text-on-surface placeholder:text-outline focus:ring-0 outline-none"
                        />
                    </div>
                </PageHeader>

                {/* KPIs */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard title="Offres actives" value={stats?.totalActive || '0'} icon="work" variant="primary" />
                    <StatCard title="Avec salaire renseigné" value={stats?.withSalary || '0'} icon="check_circle" variant="secondary" />
                    <StatCard title="Importées (24h)" value={String(stats?.todayCount ?? 0)} icon="schedule" variant="tertiary" />
                    <StatCard title="Salaire moyen" value={stats?.averageSalary || 'N/D'} icon="payments" variant="primary" />
                </div>

                {/* Tableau des offres */}
                <div className="glass-panel overflow-hidden rounded-xl shadow-2xs">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-outline-variant/60 bg-surface-container-low/60 text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                                    <th className="px-5 py-3.5">Offre & Lieu</th>
                                    <th className="px-5 py-3.5">Entreprise</th>
                                    <th className="px-5 py-3.5">Source</th>
                                    <th className="px-5 py-3.5">Salaire</th>
                                    <th className="px-5 py-3.5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/40 text-sm">
                                {filteredRows.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-8 text-center text-xs text-on-surface-variant">
                                            Aucune offre trouvée.
                                        </td>
                                    </tr>
                                ) : filteredRows.map((job) => (
                                    <tr key={job.id} className="hover:bg-surface-container-low/40 transition-colors">
                                        <td className="px-5 py-3.5">
                                            <p className="font-semibold text-on-surface text-xs md:text-sm">{job.title}</p>
                                            <p className="text-xs text-on-surface-variant">{job.location} • {job.date}</p>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs font-medium text-on-surface">{job.company}</td>
                                        <td className="px-5 py-3.5">
                                            <span className="rounded-full bg-surface-container px-2.5 py-0.5 text-xs font-medium text-on-surface-variant border border-outline-variant/40">
                                                {job.source}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs font-semibold text-on-surface">{job.salary_range}</td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="inline-flex items-center gap-1.5">
                                                <Link
                                                    href={`/?job=${job.id}`}
                                                    className="rounded-lg border border-outline-variant/60 px-2.5 py-1 text-xs font-medium text-on-surface hover:border-primary/50 hover:text-primary transition-colors"
                                                >
                                                    Voir
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(job.id, job.title)}
                                                    aria-label={`Supprimer ${job.title}`}
                                                    title="Supprimer"
                                                    className="rounded-lg p-1.5 text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors"
                                                >
                                                    <span aria-hidden="true" className="material-symbols-outlined text-[18px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {jobs.links && jobs.links.length > 3 && (
                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-outline-variant/60 px-5 py-3">
                            <span className="text-xs text-on-surface-variant">
                                Page {jobs.current_page} sur {jobs.last_page} ({jobs.total} offres)
                            </span>
                            <div className="flex items-center gap-1">
                                {jobs.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        disabled={!link.url}
                                        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                                            link.active
                                                ? 'bg-primary text-on-primary'
                                                : link.url
                                                    ? 'text-on-surface-variant hover:bg-surface-container'
                                                    : 'text-outline pointer-events-none'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label.replace('Previous', 'Préc.').replace('Next', 'Suiv.') }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Journal d'importation & Qualité */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    <div className="glass-panel rounded-xl p-6 shadow-2xs lg:col-span-8">
                        <h3 className="mb-4 text-base font-bold text-on-surface">Dernières offres collectées</h3>
                        <div className="space-y-2.5">
                            {auditLogs.map((log) => (
                                <div key={log.id} className="flex items-center justify-between rounded-lg border border-outline-variant/40 bg-surface-container-low/40 p-3 text-xs">
                                    <p className="text-on-surface">
                                        <span className="font-semibold">"{log.title}"</span> chez {log.company} ({log.source})
                                    </p>
                                    <span className="shrink-0 text-on-surface-variant">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel rounded-xl p-6 shadow-2xs lg:col-span-4 flex flex-col justify-between">
                        <div>
                            <h3 className="mb-3 text-base font-bold text-on-surface">Qualité des données</h3>
                            <div className="mb-1 flex justify-between text-xs font-semibold">
                                <span className="text-on-surface-variant">Extraction des salaires</span>
                                <span className="text-primary">{healthStats?.clearance ?? 0}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-surface-container overflow-hidden">
                                <div className="h-full bg-primary rounded-full" style={{ width: `${healthStats?.clearance ?? 0}%` }}></div>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-on-surface-variant">{healthStats?.message}</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
