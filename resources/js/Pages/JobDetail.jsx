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
                </div>

                {/* Job Description Card */}
                <div className="glass-panel rounded-xl p-5 md:p-6 border border-outline-variant shadow-sm flex flex-col gap-4 text-sm text-on-surface leading-relaxed">
                    <h2 className="text-base font-semibold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">description</span>
                        Full Description
                    </h2>

                    {job.description ? (
                        <div className="prose dark:prose-invert max-w-none text-on-surface space-y-3 text-sm leading-relaxed marker:text-primary">
                            <ReactMarkdown>{job.description}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-on-surface-variant italic">No full description provided for this job offer.</p>
                    )}
                </div>

            </main>
        </div>
    );
}
