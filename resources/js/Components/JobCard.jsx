import React from 'react';
import { formatContractType, formatRelativeDate, formatSalary } from '../utils/jobFormatters';

export default function JobCard({
    job,
    isSelected = false,
    isSaved = false,
    onSelect,
    onToggleSave,
}) {
    const salaryInfo = formatSalary(job);
    const relativeDate = formatRelativeDate(job.date_of_publi, job.created_at);
    const contractLabel = formatContractType(job.contract_type);
    const companyName = job.company?.name || 'Confidentiel';
    const logoUrl =
        job.company?.logo_url ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4&bold=true`;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect?.(job);
        }
    };

    return (
        <article
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onKeyDown={handleKeyDown}
            onClick={() => onSelect?.(job)}
            className={`rounded-xl p-3.5 flex flex-col justify-between transition-all duration-150 group cursor-pointer relative overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isSelected
                    ? 'border-primary ring-1 ring-primary bg-primary/[0.04] shadow-xs'
                    : 'border-outline-variant/60 hover:border-primary/50 hover:bg-surface-container-low bg-surface-container-lowest dark:bg-surface-container hover:shadow-xs'
            }`}
        >
            {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
            )}

            <div>
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-outline-variant/60 flex-shrink-0 overflow-hidden flex items-center justify-center p-1 shadow-2xs">
                        <img className="w-full h-full object-contain" alt={companyName} src={logoUrl} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                            <h3 className="text-xs md:text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-tight truncate">
                                {job.title}
                            </h3>

                            {onToggleSave && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onToggleSave(job);
                                    }}
                                    className="text-outline hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-variant/60 flex-shrink-0 -mt-1"
                                    aria-label={isSaved ? `Retirer ${job.title} des favoris` : `Sauvegarder ${job.title}`}
                                    aria-pressed={isSaved}
                                    title={isSaved ? 'Sauvegardé' : 'Sauvegarder'}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`material-symbols-outlined text-[18px] ${isSaved ? 'text-primary' : ''}`}
                                        style={isSaved ? { fontVariationSettings: "'FILL' 1" } : {}}
                                    >
                                        {isSaved ? 'bookmark' : 'bookmark_border'}
                                    </span>
                                </button>
                            )}
                        </div>
                        <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5 truncate">
                            {companyName}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-medium border border-outline-variant/40 flex items-center gap-1">
                        <span aria-hidden="true" className="material-symbols-outlined text-[12px]">location_on</span>
                        <span className="truncate max-w-[140px]">{job.location || 'France'}</span>
                    </span>

                    {job.is_remote ? (
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] border border-primary/20 flex items-center gap-1 font-semibold whitespace-nowrap">
                            <span aria-hidden="true" className="material-symbols-outlined text-[12px]">public</span>
                            Télétravail
                        </span>
                    ) : null}

                    {contractLabel && contractLabel !== 'Non spécifié' ? (
                        <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[11px] font-semibold border border-outline-variant/40 whitespace-nowrap">
                            {contractLabel}
                        </span>
                    ) : null}
                </div>
            </div>

            <div className="flex justify-between items-center gap-2 mt-3 pt-2 border-t border-outline-variant/30 text-[10px]">
                <div className="flex items-center gap-1.5 min-w-0">
                    <span
                        className={`font-semibold px-1.5 py-0.5 rounded truncate ${
                            salaryInfo.isDisclosed
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                                : 'text-on-surface-variant'
                        }`}
                    >
                        {salaryInfo.text}
                    </span>
                    {typeof job.ai_match_score === 'number' && (
                        <span
                            className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold border border-primary/20 whitespace-nowrap shrink-0"
                            title={
                                job.ai_matched_keywords?.length
                                    ? `Mots-clés : ${job.ai_matched_keywords.join(', ')}`
                                    : 'Score de pertinence'
                            }
                        >
                            {job.ai_match_score}% match
                        </span>
                    )}
                </div>

                <span className="text-outline font-medium shrink-0">{relativeDate}</span>
            </div>
        </article>
    );
}
