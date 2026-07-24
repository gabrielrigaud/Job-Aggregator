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
                        href={`/jobs/${job.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2.5 rounded-lg bg-[#2557a7] text-white hover:bg-[#1e4687] transition-colors text-sm font-semibold shadow-sm"
                    >
                        Postuler sur {job.source?.name || 'le site'}
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
                        <div
                            className="prose dark:prose-invert max-w-none text-on-surface space-y-4 text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: job.description }}
                        />
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
