import React, { useEffect } from 'react';

export default function JobDetailModal({ job, onClose }) {
    if (!job) return null;

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const companyName = job.company?.name || 'Company Confidential';
    const logoUrl = job.company?.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4`;

    const formattedSalary = job.salary_min && job.salary_max
        ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency || '€'}`
        : (job.salary_min ? `From ${job.salary_min} ${job.salary_currency || '€'}` : 'Salary undisclosed');

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-md md:p-xl bg-on-surface/40 backdrop-blur-md animate-fade-in">
            {/* Backdrop click listener */}
            <div className="absolute inset-0" onClick={onClose}></div>

            {/* Modal Card */}
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 animate-scale-up">
                
                {/* Modal Header */}
                <div className="p-lg md:p-xl border-b border-outline-variant bg-surface-container-low/50 flex flex-col gap-md">
                    <div className="flex justify-between items-start gap-md">
                        <div className="flex items-center gap-md">
                            <div className="w-14 h-14 rounded-xl bg-surface-container-highest border border-outline-variant flex items-center justify-center p-xs flex-shrink-0 shadow-sm">
                                <img src={logoUrl} alt={companyName} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h2 className="font-headline-lg text-body-lg md:text-headline-md font-bold text-on-surface">
                                    {job.title}
                                </h2>
                                <p className="font-body-md text-on-surface-variant font-medium mt-1">
                                    {companyName}
                                </p>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button 
                            onClick={onClose} 
                            className="p-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center"
                            title="Close (Esc)"
                        >
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

                    {/* Meta Badges */}
                    <div className="flex flex-wrap items-center gap-sm mt-xs">
                        <span className="px-3 py-1 rounded-md bg-surface-container text-on-surface-variant font-code-sm text-xs border border-outline-variant flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[16px]">location_on</span>
                            {job.location || 'Location unspecified'}
                        </span>

                        {job.is_remote ? (
                            <span className="px-3 py-1 rounded-md bg-primary-container/20 text-primary font-code-sm text-xs border border-primary/30 flex items-center gap-xs font-semibold">
                                <span className="material-symbols-outlined text-[16px]">public</span>
                                Remote
                            </span>
                        ) : null}

                        {job.contract_type ? (
                            <span className="px-3 py-1 rounded-md bg-surface-container text-on-surface-variant font-code-sm text-xs border border-outline-variant flex items-center gap-xs capitalize">
                                <span className="material-symbols-outlined text-[16px]">schedule</span>
                                {job.contract_type}
                            </span>
                        ) : null}

                        {job.source?.name ? (
                            <span className="px-3 py-1 rounded-md bg-secondary-container/20 text-secondary font-code-sm text-xs border border-secondary/30 flex items-center gap-xs">
                                <span className="material-symbols-outlined text-[16px]">source</span>
                                {job.source.name}
                            </span>
                        ) : null}

                        <span className="px-3 py-1 rounded-md bg-surface-variant text-on-surface font-label-md text-xs border border-outline-variant font-medium">
                            {formattedSalary}
                        </span>
                    </div>
                </div>

                {/* Modal Body - Description */}
                <div className="p-lg md:p-xl overflow-y-auto flex-1 flex flex-col gap-lg font-body-md text-on-surface leading-relaxed">
                    <h3 className="font-headline-md text-body-lg font-semibold text-on-surface flex items-center gap-xs">
                        <span className="material-symbols-outlined text-primary">description</span>
                        Job Description
                    </h3>

                    {job.description ? (
                        <div 
                            className="prose dark:prose-invert max-w-none text-on-surface space-y-4 text-sm md:text-base leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: job.description }}
                        />
                    ) : (
                        <p className="text-on-surface-variant italic">No full description provided for this job offer.</p>
                    )}
                </div>

                {/* Modal Footer / Actions */}
                <div className="p-md md:p-lg border-t border-outline-variant bg-surface-container-low/80 flex items-center justify-between gap-md">
                    <span className="text-xs text-on-surface-variant hidden sm:inline">
                        Published on {new Date(job.date_of_publi || job.created_at).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-sm ml-auto">
                        <a 
                            href={`/jobs/${job.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-md py-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-variant transition-colors font-label-md text-sm flex items-center gap-xs"
                        >
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                            Direct Link
                        </a>
                        <button 
                            onClick={onClose}
                            className="px-lg py-sm rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors font-label-md text-sm font-semibold shadow-md"
                        >
                            Close
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
