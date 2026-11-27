import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { router } from '@inertiajs/react';
import { formatSalary, formatContractType, formatDate, cleanDescription } from '../utils/jobFormatters';

export default function JobDetailPanel({ job, onClose, isSaved = false }) {
    const [copied, setCopied] = useState(false);

    if (!job) {
        return (
            <div className="glass-panel rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-3 h-[500px] border border-outline-variant/60">
                <span className="material-symbols-outlined text-4xl text-outline">touch_app</span>
                <h3 className="text-base font-bold text-on-surface">Sélectionnez une offre</h3>
                <p className="text-xs text-on-surface-variant max-w-xs">Cliquez sur une offre à gauche pour afficher tous ses détails ici.</p>
            </div>
        );
    }

    const companyName = job.company?.name || 'Entreprise Confidentielle';
    const logoUrl = job.company?.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4&bold=true`;
    const salaryInfo = formatSalary(job);
    const contractLabel = formatContractType(job.contract_type);
    const formattedDate = formatDate(job.date_of_publi, job.created_at);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.origin + `/?job=${job.id}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formattedDescription = cleanDescription(job.description);

    return (
        <div className="glass-panel rounded-xl shadow-sm flex flex-col overflow-hidden w-full h-full min-h-0">
            {/* Header Section */}
            <div className="p-4 md:p-5 border-b border-outline-variant/60 bg-surface-container-low/60 flex flex-col gap-3 flex-shrink-0">
                
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-highest border border-outline-variant/70 p-1.5 flex items-center justify-center flex-shrink-0 shadow-2xs">
                            <img className="w-full h-full object-contain" alt={companyName} src={logoUrl} />
                        </div>
                        <div>
                            <h2 className="text-base md:text-lg font-bold text-on-surface leading-tight">
                                {job.title}
                            </h2>
                            <p className="text-xs font-semibold text-on-surface-variant mt-0.5 flex items-center gap-1">
                                {companyName}
                            </p>
                        </div>
                    </div>

                    {onClose && (
                        <button 
                            type="button"
                            onClick={onClose}
                            className="w-8 h-8 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/80 transition-colors flex items-center justify-center flex-shrink-0"
                            aria-label="Fermer le détail de l'offre"
                            title="Fermer le volet"
                        >
                            <span aria-hidden="true" className="material-symbols-outlined text-sm">close</span>
                        </button>
                    )}
                </div>

                {/* Key Stat Cards Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2 rounded-lg bg-surface-container/70 border border-outline-variant/50 flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-primary">work</span>
                            Contrat
                        </span>
                        <span className="text-xs font-bold text-on-surface truncate mt-0.5">
                            {contractLabel}
                        </span>
                    </div>

                    <div className="p-2 rounded-lg bg-surface-container/70 border border-outline-variant/50 flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-emerald-500">payments</span>
                            Salaire
                        </span>
                        <span className={`text-xs font-bold truncate mt-0.5 ${salaryInfo.isDisclosed ? 'text-emerald-600 dark:text-emerald-400' : 'text-on-surface-variant'}`}>
                            {salaryInfo.text}
                        </span>
                    </div>

                    <div className="p-2 rounded-lg bg-surface-container/70 border border-outline-variant/50 flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-secondary">location_on</span>
                            Lieu
                        </span>
                        <span className="text-xs font-bold text-on-surface truncate mt-0.5">
                            {job.location || 'France'}
                        </span>
                    </div>

                    <div className="p-2 rounded-lg bg-surface-container/70 border border-outline-variant/50 flex flex-col">
                        <span className="text-[10px] text-on-surface-variant font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-primary">public</span>
                            Télétravail
                        </span>
                        <span className="text-xs font-bold text-on-surface truncate mt-0.5">
                            {job.is_remote ? 'Oui' : 'Non précisé'}
                        </span>
                    </div>
                </div>

                {/* Primary Action Row */}
                <div className="flex items-center gap-2 pt-1">
                    <a
                        href={job.apply_url || job.source_external_id || (job.source?.url ? `${job.source.url}` : 'https://fr.indeed.com')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary transition-all text-xs font-bold shadow-xs flex items-center justify-center gap-1.5"
                    >
                        Postuler sur {job.source?.name || 'Indeed'}
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </a>
                    
                    <button 
                        type="button"
                        onClick={() => {
                            router.post(`/jobs/${job.id}/toggle-save`, {}, { preserveScroll: true, preserveState: true });
                        }}
                        className={`w-10 h-10 rounded-lg transition-colors flex items-center justify-center border flex-shrink-0 ${
                            isSaved 
                                ? 'bg-primary/10 text-primary border-primary/40 hover:bg-error/10 hover:text-error hover:border-error/30' 
                                : 'bg-surface-container hover:bg-surface-variant text-on-surface-variant hover:text-primary border-outline-variant/50'
                        }`}
                        aria-label={isSaved ? "Retirer des favoris" : "Sauvegarder l'offre"}
                        aria-pressed={isSaved}
                        title={isSaved ? "Retirer des favoris" : "Sauvegarder l'offre"}
                    >
                        <span 
                            aria-hidden="true"
                            className="material-symbols-outlined text-base"
                            style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}
                        >
                            {isSaved ? 'bookmark' : 'bookmark_border'}
                        </span>
                    </button>

                    <button 
                        type="button"
                        onClick={handleCopyLink}
                        className="w-10 h-10 rounded-lg bg-surface-container hover:bg-surface-variant transition-colors flex items-center justify-center text-on-surface-variant border border-outline-variant/50 relative flex-shrink-0"
                        aria-label="Copier le lien de l'offre"
                        title="Copier le lien"
                    >
                        <span aria-hidden="true" className="material-symbols-outlined text-base">
                            {copied ? 'check' : 'share'}
                        </span>
                        <span aria-live="polite" className="sr-only">
                            {copied ? 'Lien copié dans le presse-papiers' : ''}
                        </span>
                        {copied && (
                            <span aria-hidden="true" className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-on-surface text-surface text-[10px] font-bold shadow whitespace-nowrap">
                                Copié !
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Scrollable Description Body */}
            <div className="p-4 md:p-5 overflow-y-auto flex-1 min-h-0 flex flex-col gap-3 text-on-surface leading-relaxed custom-scrollbar bg-surface/50">
                <h3 className="text-sm font-bold text-on-surface flex items-center gap-1.5 border-b border-outline-variant/40 pb-2">
                    <span className="material-symbols-outlined text-primary text-base">description</span>
                    Description du poste
                </h3>

                {job.description ? (
                    <div className="text-on-surface text-xs md:text-sm leading-relaxed">
                        <ReactMarkdown
                            components={{
                                ul: ({node, ...props}) => <ul className="list-disc list-outside pl-4 space-y-1.5 my-2.5 text-on-surface opacity-90 marker:text-primary" {...props} />,
                                ol: ({node, ...props}) => <ol className="list-decimal list-outside pl-4 space-y-1.5 my-2.5 text-on-surface opacity-90 marker:text-primary font-medium" {...props} />,
                                li: ({node, ...props}) => <li className="pl-0.5 leading-relaxed text-on-surface opacity-90" {...props} />,
                                h1: ({node, ...props}) => <h1 className="text-sm md:text-base font-bold text-primary mt-5 mb-1.5 uppercase tracking-wide flex items-center gap-1" {...props} />,
                                h2: ({node, ...props}) => <h2 className="text-xs md:text-sm font-bold text-primary mt-4 mb-1.5 uppercase tracking-wide flex items-center gap-1" {...props} />,
                                h3: ({node, ...props}) => <h3 className="text-xs md:text-sm font-bold text-primary mt-4 mb-1.5 uppercase tracking-wide flex items-center gap-1" {...props} />,
                                h4: ({node, ...props}) => <h4 className="text-xs font-bold text-primary mt-3 mb-1 uppercase tracking-wide" {...props} />,
                                p: ({node, ...props}) => <p className="mb-2.5 leading-relaxed text-on-surface opacity-90" {...props} />,
                                strong: ({node, ...props}) => <strong className="font-bold text-on-surface" {...props} />,
                                pre: ({node, ...props}) => <div className="my-2.5 p-3 rounded-lg bg-surface-container/70 border border-outline-variant font-mono text-xs overflow-x-auto whitespace-pre-wrap" {...props} />,
                                code: ({node, inline, ...props}) => inline ? <code className="px-1 py-0.5 rounded bg-surface-container font-mono text-[11px]" {...props} /> : <code className="font-mono text-xs whitespace-pre-wrap break-words" {...props} />,
                            }}
                        >
                            {formattedDescription}
                        </ReactMarkdown>
                    </div>
                ) : (
                    <p className="text-on-surface-variant italic text-xs">Aucune description détaillée fournie pour cette offre.</p>
                )}
            </div>

            {/* Footer */}
            <div className="px-5 py-2.5 border-t border-outline-variant/60 bg-surface-container-low/60 flex items-center justify-between text-[11px] text-on-surface-variant flex-shrink-0">
                <span>Offre publiée le {formattedDate}</span>
                <span className="font-mono text-[10px] text-outline">ID #{job.id}</span>
            </div>
        </div>
    );
}
