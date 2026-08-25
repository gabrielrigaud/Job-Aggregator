import React from 'react';
import ReactMarkdown from 'react-markdown';
export default function JobDetailPanel({ job, onClose }) {
    if (!job) {
        return (
            <div className="glass-panel rounded-2xl p-xl text-center flex flex-col items-center justify-center gap-md h-[500px]">
                <span className="material-symbols-outlined text-display-lg text-outline">touch_app</span>
                <h3 className="font-headline-md text-body-lg text-on-surface font-semibold">Select a job offer</h3>
                <p className="font-body-sm text-on-surface-variant">Click on any job offer on the left to view its full details here.</p>
            </div>
        );
    }

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
        <div className="glass-panel rounded-2xl border border-outline-variant shadow-lg flex flex-col overflow-hidden h-full">
            {/* Header Section (Sticky at the top of the panel) */}
            <div className="p-5 md:p-6 border-b border-outline-variant bg-surface-container-low flex flex-col gap-3">
                
                <h2 className="text-xl font-bold text-on-surface">
                    {job.title}
                </h2>
                
                <div className="flex flex-col gap-1 text-sm text-on-surface-variant">
                    <div className="flex items-center gap-1">
                        <span className="font-medium underline decoration-outline-variant underline-offset-4 cursor-pointer hover:text-primary transition-colors">{companyName}</span>
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </div>
                    <div>
                        {job.location || 'Localisation non spécifiée'} {job.is_remote ? '• Télétravail' : ''}
                    </div>
                    <div className="font-medium text-on-surface">
                        {formattedSalary} {job.contract_type ? `- ${job.contract_type}` : ''}
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-1">
                    <a
                        href={job.apply_url || job.source_external_id || (job.source?.url ? `${job.source.url}` : 'https://fr.indeed.com')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-lg bg-[#2557a7] text-white hover:bg-[#1e4687] transition-colors text-sm font-semibold shadow-sm flex items-center gap-1.5"
                    >
                        Postuler sur {job.source?.name || 'Indeed'}
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                    
                    <button className="w-11 h-11 rounded-lg bg-surface-container hover:bg-surface-variant transition-colors flex items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined">bookmark_border</span>
                    </button>
                    <button className="w-11 h-11 rounded-lg bg-surface-container hover:bg-surface-variant transition-colors flex items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined">thumb_down</span>
                    </button>
                    
                    {onClose && (
                        <button 
                            onClick={onClose}
                            className="ml-auto w-11 h-11 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center"
                            title="Fermer"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Scrollable Body */}
            <div className="p-lg md:p-xl overflow-y-auto flex-1 flex flex-col gap-xl font-body-md text-on-surface leading-relaxed custom-scrollbar bg-surface/50">
                
                {/* Détails de l'emploi Section */}
                <div className="flex flex-col gap-lg">
                    <h3 className="font-headline-md text-body-lg font-bold text-on-surface">
                        Détails de l'emploi
                    </h3>
                    
                    {(job.salary_min || job.salary_max) && (
                        <div className="flex flex-col gap-sm">
                            <div className="flex items-center gap-sm font-medium text-on-surface">
                                <span className="material-symbols-outlined text-outline">payments</span>
                                Salaire
                            </div>
                            <div className="flex flex-wrap gap-sm pl-8">
                                <span className="px-3 py-1.5 rounded-md bg-surface-container-highest text-on-surface font-body-sm text-sm">
                                    {formattedSalary}
                                </span>
                            </div>
                        </div>
                    )}

                    {job.contract_type && (
                        <div className="flex flex-col gap-sm">
                            <div className="flex items-center gap-sm font-medium text-on-surface">
                                <span className="material-symbols-outlined text-outline">work</span>
                                Type de poste
                            </div>
                            <div className="flex flex-wrap gap-sm pl-8">
                                <span className="px-3 py-1.5 rounded-md bg-surface-container-highest text-on-surface font-body-sm text-sm capitalize">
                                    {job.contract_type}
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                <hr className="border-outline-variant" />

                {/* Job Description */}
                <div className="flex flex-col gap-md">
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
                        <p className="text-on-surface-variant italic">Aucune description complète fournie pour cette offre.</p>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="px-lg py-sm border-t border-outline-variant bg-surface-container-low flex items-center justify-between text-xs text-on-surface-variant">
                <span>Publié le {new Date(job.date_of_publi || job.created_at).toLocaleDateString()}</span>
                <span>ID #{job.id}</span>
            </div>
        </div>
    );
}
