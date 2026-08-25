import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ReactMarkdown from 'react-markdown';

export default function JobDetail({ job }) {
    if (!job) return null;

    const companyName = job.company?.name || 'Company Confidential';
    const logoUrl = job.company?.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4`;

    const isFreelance = job.contract_type && job.contract_type.toLowerCase() === 'freelance';
    
    let formattedSalary = 'Salary undisclosed';
    if (job.salary_min || job.salary_max) {
        const formatNum = (num) => {
            if (!num) return null;
            const n = Number(num);
            if (n < 200) return `${n}k`; 
            if (n >= 1000) return `${Math.round(n / 1000)}k`; 
            return `${n}`; 
        };
        
        const min = formatNum(job.salary_min);
        const max = formatNum(job.salary_max);
        const curr = job.salary_currency || '€';
        const suffix = isFreelance ? ' / j' : '';
        
        if (min && max) formattedSalary = `${min} - ${max} ${curr}${suffix}`;
        else if (min) formattedSalary = `From ${min} ${curr}${suffix}`;
        else formattedSalary = `Up to ${max} ${curr}${suffix}`;
    }

    const cleanDescription = (job.description || '')
        // 1. Remove leading spaces/tabs (prevents Markdown from interpreting them as code blocks)
        .replace(/^[ \t]{2,}/gm, '')
        // 2. Normalize bullet points
        .replace(/^[ \t]*[•·▪⁃►]\s*/gm, '- ')
        // 3. Convert hashtags (e.g. #FinanceTransformative) into bold tags instead of H1 titles
        .replace(/^#([a-zA-Z0-9_\u00C0-\u017F]+)/gm, '**#$1**')
        // 4. Auto-detect list items ending with semicolon
        .replace(/^[ \t]*([A-ZÀ-Ÿ].*;\s*)$/gm, '- $1')
        // 5. Auto-promote ANY standalone line ending with a colon (:), e.g. "Votre profil :", "Vos missions :"
        .replace(/^(?!#+)\s*([A-ZÀ-Ÿ0-9][^:\n]{1,60})\s*:\s*$/gm, '\n\n### $1\n')
        // 6. Auto-promote common section titles without a colon
        .replace(/^(?!#+)\s*(Description (?:de l['’]entreprise|du poste|de l['’]offre)|(?:Vos|Votre|Nos|Notre)?\s*(?:Missions?|Rôle|Profil(?: recherché)?|Compétences(?: requises)?|Prérequis|Stack technique|Technologies|Environnement(?: technique)?|Avantages|À propos|A propos|Ce que nous offrons)|Qui (?:êtes|etes)-vous(?:\s*\?)?|Pourquoi nous rejoindre(?:\s*\?)?)\s*$/gmi, '\n\n### $1\n');

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
                    Back to Jobs
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
                            {job.location || 'Location unspecified'}
                        </span>

                        {job.is_remote ? (
                            <span className="px-2.5 py-0.5 rounded bg-primary-container/20 text-primary text-xs border border-primary/30 flex items-center gap-1 font-semibold">
                                <span className="material-symbols-outlined text-[14px]">public</span>
                                Remote
                            </span>
                        ) : null}

                        {job.contract_type ? (
                            <span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs border border-outline-variant flex items-center gap-1 capitalize">
                                <span className="material-symbols-outlined text-[14px]">schedule</span>
                                {job.contract_type}
                            </span>
                        ) : null}

                        {job.source?.name ? (
                            <span className="px-2.5 py-0.5 rounded bg-secondary-container/20 text-secondary text-xs border border-secondary/30 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">source</span>
                                {job.source.name}
                            </span>
                        ) : null}

                        <span className="px-2.5 py-0.5 rounded bg-surface-variant text-on-surface text-xs border border-outline-variant font-medium">
                            {formattedSalary}
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
                            onClick={handleToggleSave}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all ${
                                isSaved 
                                    ? 'bg-primary text-on-primary border-primary shadow-sm' 
                                    : 'bg-surface-container hover:bg-surface-variant text-on-surface border-outline-variant'
                            }`}
                            title={isSaved ? "Saved" : "Save Job"}
                        >
                            <span className="material-symbols-outlined text-lg">
                                {isSaved ? 'bookmark' : 'bookmark_border'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Job Description Card */}
                <div className="glass-panel rounded-xl p-5 md:p-6 border border-outline-variant shadow-sm flex flex-col gap-4 text-sm text-on-surface leading-relaxed">
                    <h2 className="text-base font-semibold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">description</span>
                        Full Description
                    </h2>

                    {job.description ? (
                        <div className="text-on-surface text-sm leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    ul: ({node, ...props}) => <ul className="list-disc list-outside pl-5 space-y-2 my-3 text-on-surface/90 marker:text-primary" {...props} />,
                                    ol: ({node, ...props}) => <ol className="list-decimal list-outside pl-5 space-y-2 my-3 text-on-surface/90 marker:text-primary font-medium" {...props} />,
                                    li: ({node, ...props}) => <li className="pl-1 leading-relaxed text-on-surface/90" {...props} />,
                                    h1: ({node, ...props}) => <h1 className="text-base font-bold text-primary mt-6 mb-2 uppercase tracking-wide flex items-center gap-1.5" {...props} />,
                                    h2: ({node, ...props}) => <h2 className="text-sm font-bold text-primary mt-5 mb-2 uppercase tracking-wide flex items-center gap-1.5" {...props} />,
                                    h3: ({node, ...props}) => <h3 className="text-sm font-bold text-primary mt-5 mb-2 uppercase tracking-wide flex items-center gap-1.5" {...props} />,
                                    h4: ({node, ...props}) => <h4 className="text-xs font-bold text-primary mt-4 mb-1.5 uppercase tracking-wide" {...props} />,
                                    p: ({node, ...props}) => <p className="mb-3 leading-relaxed text-on-surface/90" {...props} />,
                                    strong: ({node, ...props}) => <strong className="font-semibold text-on-surface" {...props} />,
                                    pre: ({node, ...props}) => <div className="my-3 p-3 rounded-lg bg-surface-container/60 border border-outline-variant font-mono text-xs overflow-x-auto whitespace-pre-wrap" {...props} />,
                                    code: ({node, inline, ...props}) => inline ? <code className="px-1.5 py-0.5 rounded bg-surface-container font-mono text-xs" {...props} /> : <code className="font-mono text-xs whitespace-pre-wrap break-words" {...props} />,
                                }}
                            >
                                {cleanDescription}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-on-surface-variant italic">No full description provided for this job offer.</p>
                    )}
                </div>

            </main>
        </div>
    );
}
