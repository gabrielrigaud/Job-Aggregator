import React from 'react';

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

    const formattedSalary = job.salary_min && job.salary_max
        ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency || '€'}`
        : (job.salary_min ? `From ${job.salary_min} ${job.salary_currency || '€'}` : 'Salary undisclosed');

    return (
        <div className="glass-panel rounded-2xl border border-outline-variant shadow-lg flex flex-col overflow-hidden h-[calc(100vh-8.5rem)] sticky top-28">
            {/* Header Section */}
            <div className="p-lg md:p-xl border-b border-outline-variant bg-surface-container-low/60 flex flex-col gap-md">
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

                    <div className="flex items-center gap-sm flex-shrink-0">
                        <a
                            href={`/jobs/${job.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-md py-sm rounded-lg bg-primary text-on-primary hover:bg-primary/90 transition-colors font-label-md text-xs font-semibold flex items-center gap-xs shadow-sm"
                        >
                            <span className="material-symbols-outlined text-sm">open_in_new</span>
                            Open
                        </a>
                        {onClose && (
                            <button 
                                onClick={onClose}
                                className="p-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center"
                                title="Close details"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Badges */}
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

            {/* Scrollable Description */}
            <div className="p-lg md:p-xl overflow-y-auto flex-1 flex flex-col gap-lg font-body-md text-on-surface leading-relaxed">
                <h3 className="font-headline-md text-body-lg font-semibold text-on-surface flex items-center gap-xs">
                    <span className="material-symbols-outlined text-primary">description</span>
                    Job Description
                </h3>

                {job.description ? (
                    <div
                        className="prose dark:prose-invert max-w-none text-on-surface space-y-4 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                ) : (
                    <p className="text-on-surface-variant italic">No full description provided for this job offer.</p>
                )}
            </div>

            {/* Footer */}
            <div className="px-lg py-sm border-t border-outline-variant bg-surface-container-low/40 flex items-center justify-between text-xs text-on-surface-variant">
                <span>Published on {new Date(job.date_of_publi || job.created_at).toLocaleDateString()}</span>
                <span>ID #{job.id}</span>
            </div>
        </div>
    );
}
