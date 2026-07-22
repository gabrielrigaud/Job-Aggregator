import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function JobDetail({ job }) {
    if (!job) return null;

    const companyName = job.company?.name || 'Company Confidential';
    const logoUrl = job.company?.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4`;

    const formattedSalary = job.salary_min && job.salary_max
        ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency || '€'}`
        : (job.salary_min ? `From ${job.salary_min} ${job.salary_currency || '€'}` : 'Salary undisclosed');

    return (
        <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
            <Head title={`${job.title} - DevHire.io`} />

            {/* Simple Top Nav */}
            <header className="px-lg h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant flex items-center justify-between sticky top-0 z-30">
                <Link href="/" className="font-display-lg text-headline-md font-bold text-primary tracking-tight flex items-center gap-xs">
                    <span className="material-symbols-outlined">arrow_back</span>
                    DevHire.io
                </Link>
                <Link href="/" className="px-md py-sm rounded-lg bg-surface-variant hover:bg-surface-container-highest text-on-surface font-label-md text-sm transition-colors">
                    Back to Jobs
                </Link>
            </header>

            {/* Main Content Workspace */}
            <main className="flex-1 p-md md:p-xl max-w-4xl w-full mx-auto my-md flex flex-col gap-lg">
                
                {/* Header Card */}
                <div className="glass-panel rounded-2xl p-lg md:p-xl flex flex-col gap-md border border-outline-variant shadow-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-md justify-between">
                        <div className="flex items-center gap-md">
                            <div className="w-16 h-16 rounded-xl bg-surface-container-highest border border-outline-variant flex items-center justify-center p-xs flex-shrink-0 shadow-sm">
                                <img src={logoUrl} alt={companyName} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h1 className="font-headline-lg text-headline-md font-bold text-on-surface">
                                    {job.title}
                                </h1>
                                <p className="font-body-md text-on-surface-variant font-medium mt-1">
                                    {companyName}
                                </p>
                            </div>
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

                {/* Job Description Card */}
                <div className="glass-panel rounded-2xl p-lg md:p-xl border border-outline-variant shadow-md flex flex-col gap-lg font-body-md text-on-surface leading-relaxed">
                    <h2 className="font-headline-md text-body-lg font-semibold text-on-surface flex items-center gap-xs">
                        <span className="material-symbols-outlined text-primary">description</span>
                        Full Description
                    </h2>

                    {job.description ? (
                        <div 
                            className="prose dark:prose-invert max-w-none text-on-surface space-y-4 text-sm md:text-base leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: job.description }}
                        />
                    ) : (
                        <p className="text-on-surface-variant italic">No full description provided for this job offer.</p>
                    )}
                </div>

            </main>
        </div>
    );
}
