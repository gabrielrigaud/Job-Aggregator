import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Saved({ favorites = [], history = [] }) {
    const [activeTab, setActiveTab] = useState('favorites');

    return (
        <MainLayout>
            <Head title="JobMind - Saved Jobs" />
            
            <div className="flex-1 px-6 lg:px-8 pt-20 pb-16 max-w-[1440px] mx-auto w-full relative z-10">
                {/* Welcome Section */}
                <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-on-surface mb-1">Saved Opportunities</h1>
                        <p className="text-sm text-on-surface-variant">Review and manage your favorite jobs and application history.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-on-surface text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>download</span>
                            Export Resume
                        </button>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex border-b border-white/10 mb-6 gap-6">
                    <button 
                        className={`pb-2 text-sm font-medium flex items-center gap-1.5 ${activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant border-b-2 border-transparent hover:text-primary'}`}
                        onClick={() => setActiveTab('favorites')}
                    >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeTab === 'favorites' ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                        Favorites
                    </button>
                    <button 
                        className={`pb-2 text-sm font-medium flex items-center gap-1.5 ${activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant border-b-2 border-transparent hover:text-primary'}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeTab === 'history' ? "'FILL' 1" : "'FILL' 0" }}>history</span>
                        History
                    </button>
                </div>

                {/* Favorites Content (Grid) */}
                {activeTab === 'favorites' && (
                    <section className="block">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                            {favorites.length === 0 && (
                                <div className="col-span-full glass-panel rounded-xl p-xl text-center flex flex-col items-center justify-center gap-md">
                                    <span className="material-symbols-outlined text-display-lg text-outline">bookmark_border</span>
                                    <h3 className="font-headline-md text-body-lg text-on-surface">No saved jobs</h3>
                                    <p className="font-body-sm text-on-surface-variant">You haven't saved any jobs yet.</p>
                                </div>
                            )}
                            {favorites.map(job => (
                                <article key={job.id} onClick={() => window.location.href = `/jobs/${job.id}`} className="glass-panel rounded-xl p-lg flex flex-col gap-md group hover:bg-white/5 transition-colors relative overflow-hidden cursor-pointer">
                                    <div className="absolute top-0 right-0 p-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation();
                                                router.post(`/jobs/${job.id}/toggle-save`, {}, { preserveScroll: true, preserveState: true });
                                            }}
                                            className="p-xs bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-on-surface hover:text-error transition-colors"
                                            title="Remove from saved"
                                        >
                                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark_remove</span>
                                        </button>
                                    </div>
                                    <div className="flex items-start gap-md">
                                        <div className="w-12 h-12 rounded-lg bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10 overflow-hidden">
                                            <img className="w-full h-full object-contain" alt="Logo" src={job.company?.logo_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(job.company?.name || 'Company') + "&background=eaedff&color=4648d4"} />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-sm text-on-surface mb-xs">{job.title}</h3>
                                            <p className="font-code-sm text-code-sm text-on-surface-variant">{job.company?.name || 'Company'} • {job.location || 'Remote'}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-xs mt-auto">
                                        {job.is_remote ? <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-primary">Remote</span> : null}
                                        {job.contract_type ? <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-primary capitalize">{job.contract_type}</span> : null}
                                        <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-on-surface-variant">
                                            {job.salary_min && job.salary_max ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency || '€'}` : (job.salary_min ? `From ${job.salary_min}` : 'Salary undisclosed')}
                                        </span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {/* History Content (Table) */}
                {activeTab === 'history' && (
                    <section className="block">
                        <div className="glass-panel rounded-xl overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="p-md font-medium text-sm text-on-surface-variant font-medium">Job Title</th>
                                        <th className="p-md font-medium text-sm text-on-surface-variant font-medium">Company</th>
                                        <th className="p-md font-medium text-sm text-on-surface-variant font-medium">Viewed Date</th>
                                        <th className="p-md font-medium text-sm text-on-surface-variant font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="font-body-sm text-body-sm text-on-surface">
                                    {history.length === 0 && (
                                        <tr>
                                            <td colSpan="4" className="p-md text-center text-on-surface-variant">No viewing history yet.</td>
                                        </tr>
                                    )}
                                    {history.map(job => (
                                        <tr key={job.id} onClick={() => window.location.href = `/jobs/${job.id}`} className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                                            <td className="p-md font-medium text-primary">{job.title}</td>
                                            <td className="p-md">{job.company?.name || 'Company'}</td>
                                            <td className="p-md text-on-surface-variant font-code-sm">
                                                {new Date(job.pivot?.viewed_at || job.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="p-md">
                                                <span className="px-xs py-[2px] rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-on-surface-variant font-code-sm text-[11px] uppercase tracking-wider">
                                                    Viewed
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </div>
        </MainLayout>
    );
}
