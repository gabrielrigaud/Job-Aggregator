import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';
import { formatSalary, formatContractType, cleanDescription } from '../utils/jobFormatters';

export default function JobDetail({ job, isSaved = false }) {
    if (!job) return null;

    const handleToggleSave = () => {
        router.post(`/jobs/${job.id}/toggle-save`, {}, { preserveScroll: true, preserveState: true });
    };

    const companyName = job.company?.name || 'Entreprise Confidentielle';
    const logoUrl = job.company?.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4`;
    const salaryInfo = formatSalary(job);
    const contractLabel = formatContractType(job.contract_type);
    const formattedDescription = cleanDescription(job.description);

    return (
        <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
            <Head title={`${job.title} - JobMind`} />

            {/* Simple Top Nav */}
            <header className="px-6 h-14 bg-surface/80 backdrop-blur-xl border-b border-outline-variant flex items-center justify-between sticky top-0 z-30">
                <Link href="/" className="text-xl font-bold text-primary tracking-tight flex items-center gap-1">
                    <span className="material-symbols-outlined">arrow_back</span>
                    JobMind
                </Link>
                <Link href="/" className="px-3 py-1.5 rounded-lg bg-surface-variant hover:bg-surface-container-highest text-on-surface text-xs font-medium transition-colors">
                    Retour aux offres
                </Link>
            </header>

            {/* Main Content Workspace */}
            <main className="flex-1 p-4 md:p-6 max-w-3xl w-full mx-auto my-4 flex flex-col gap-6">
                
                {/* Header Card */}
                <div className="glass-panel rounded-xl p-5 md:p-6 flex flex-col gap-4 border border-outline-variant shadow-sm">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-outline-variant flex items-center justify-center p-1 flex-shrink-0 shadow-sm">
                                <img src={logoUrl} alt={companyName} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-on-surface">
                                    {job.title}
                                </h1>
                                <p className="text-sm text-on-surface-variant font-medium mt-0.5">
                                    {companyName}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs border border-outline-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                            {job.location || 'Localisation non précisée'}
                        </span>

                        {job.is_remote ? (
                            <span className="px-2.5 py-0.5 rounded bg-primary-container/20 text-primary text-xs border border-primary/30 flex items-center gap-1 font-semibold">
                                <span className="material-symbols-outlined text-[14px]">public</span>
                                Télétravail
                            </span>
                        ) : null}

                        {contractLabel && contractLabel !== 'Non spécifié' ? (
                            <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs border border-outline-variant flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                {contractLabel}
                            </span>
                        ) : null}

                        {job.source?.name ? (
                            <span className="px-2.5 py-0.5 rounded bg-secondary-container/20 text-secondary text-xs border border-secondary/30 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">source</span>
                                {job.source.name}
                            </span>
                        ) : null}

                        <span className={`px-2.5 py-0.5 rounded text-xs border font-medium ${
                            salaryInfo.isDisclosed
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25'
                                : 'bg-surface-variant text-on-surface border-outline-variant'
                        }`}>
                            {salaryInfo.text}
                        </span>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center gap-3 mt-2 pt-3 border-t border-outline-variant/60">
                        <a
                            href={job.apply_url || job.source_external_id || (job.source?.url ? `${job.source.url}` : 'https://fr.indeed.com')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 rounded-lg bg-[#2557a7] text-white hover:bg-[#1e4687] transition-colors text-sm font-semibold shadow-sm flex items-center gap-1.5"
                        >
                            Postuler sur {job.source?.name || 'Indeed'}
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                        </a>
                        <button
                            type="button"
                            onClick={handleToggleSave}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                                isSaved 
                                    ? 'bg-primary text-on-primary border-primary shadow-sm' 
                                    : 'bg-surface-container hover:bg-surface-variant text-on-surface border-outline-variant'
                            }`}
                            aria-label={isSaved ? 'Retirer des favoris' : "Sauvegarder l'offre"}
                            aria-pressed={isSaved}
                            title={isSaved ? "Sauvegardé" : "Sauvegarder l'offre"}
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-lg">
                                {isSaved ? 'bookmark' : 'bookmark_border'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Job Description Card */}
                <div className="glass-panel rounded-xl p-5 md:p-6 border border-outline-variant shadow-sm flex flex-col gap-4 text-sm text-on-surface leading-relaxed">
                    <h2 className="text-base font-semibold text-on-surface flex items-center gap-2">
                        <span aria-hidden="true" className="material-symbols-outlined text-primary">description</span>
                        Description du poste
                    </h2>

                    {job.description ? (
                        <div className="text-on-surface text-sm leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    ul: ({node, ...props}) => <ul className="list-disc list-outside pl-5 space-y-2 my-3 text-on-surface opacity-90 marker:text-primary" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal list-outside pl-5 space-y-2 my-3 text-on-surface opacity-90 marker:text-primary font-medium" {...props} />,
                                    li: ({node, ...props}) => <li className="pl-1 leading-relaxed text-on-surface opacity-90" {...props} />,
                                    h1: ({node, ...props}) => <h1 className="text-base font-bold text-primary mt-6 mb-2 uppercase tracking-wide flex items-center gap-1.5" {...props} />,
                                    h2: ({node, ...props}) => <h2 className="text-sm font-bold text-primary mt-5 mb-2 uppercase tracking-wide flex items-center gap-1.5" {...props} />,
                                    h3: ({node, ...props}) => <h3 className="text-sm font-bold text-primary mt-5 mb-2 uppercase tracking-wide flex items-center gap-1.5" {...props} />,
                                    h4: ({node, ...props}) => <h4 className="text-xs font-bold text-primary mt-4 mb-1.5 uppercase tracking-wide" {...props} />,
                                    p: ({node, ...props}) => <p className="mb-3 leading-relaxed text-on-surface opacity-90" {...props} />,
                                    strong: ({node, ...props}) => <strong className="font-semibold text-on-surface" {...props} />,
                                    pre: ({node, ...props}) => <div className="my-3 p-3 rounded-lg bg-surface-container/60 border border-outline-variant font-mono text-xs overflow-x-auto whitespace-pre-wrap" {...props} />,
                                    code: ({node, inline, ...props}) => inline ? <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs" {...props} /> : <code className="font-mono text-xs whitespace-pre-wrap break-words" {...props} />,
                                }}
                            >
                                {formattedDescription}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-on-surface-variant italic">Aucune description détaillée fournie pour cette offre.</p>
                    )}
                </div>

            </main>
        </div>
    );
}
