import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import JobDetailPanel from '../Components/JobDetailPanel';
import MainLayout from '../Layouts/MainLayout';

export default function Discover({ jobs = [] }) {
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedJob(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <MainLayout>
            <Head title="JobMind - Search" />

            {/* Page Content Workspace */}
                <div className="pt-16 px-md md:px-xl pb-md flex-1 flex flex-col gap-md max-w-[1440px] w-full mx-auto lg:overflow-hidden h-full">
                    {/* Filter Bar Section */}
                    <section className="flex flex-col gap-md flex-shrink-0 bg-background py-xs">
                        <div className="flex flex-wrap items-center gap-sm md:gap-md">
                            <div className="flex items-center glass-input rounded-lg px-sm min-w-[200px] flex-1 sm:flex-none">
                                <span className="material-symbols-outlined text-outline text-sm">location_on</span>
                                <input className="w-full bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 font-body-sm py-2 outline-none" placeholder="Location..." type="text" />
                            </div>
                            <div className="relative min-w-[160px]">
                                <select defaultValue="" className="w-full appearance-none glass-input rounded-lg pl-sm pr-lg py-2 font-body-sm text-on-surface outline-none cursor-pointer">
                                    <option className="bg-surface" disabled value="">Contract Type</option>
                                    <option className="bg-surface" value="full-time">Full-Time</option>
                                    <option className="bg-surface" value="contract">Contract</option>
                                    <option className="bg-surface" value="freelance">Freelance</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                            </div>
                            <div className="flex items-center gap-sm glass-panel rounded-lg px-md py-2 flex-1 min-w-[250px] hidden md:flex">
                                <span className="material-symbols-outlined text-outline text-sm">payments</span>
                                <span className="font-body-sm text-on-surface-variant whitespace-nowrap">$80k</span>
                                <div className="flex-1 h-1 bg-surface-variant rounded-full relative">
                                    <div className="absolute left-[20%] right-[30%] h-full bg-gradient-to-r from-primary to-secondary-container rounded-full"></div>
                                    <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm cursor-pointer border border-primary"></div>
                                    <div className="absolute right-[30%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm cursor-pointer border border-primary"></div>
                                </div>
                                <span className="font-body-sm text-on-surface-variant whitespace-nowrap">$200k+</span>
                            </div>
                            <div className="flex items-center gap-sm glass-panel rounded-lg px-md py-2 cursor-pointer hover:border-primary transition-colors">
                                <div className="w-8 h-4 bg-primary-container rounded-full relative">
                                    <div className="absolute right-1 top-0.5 w-3 h-3 bg-on-primary-container rounded-full shadow-sm"></div>
                                </div>
                                <span className="font-body-sm text-on-surface">Remote Only</span>
                            </div>
                            <button className="ml-auto flex items-center gap-xs text-on-surface-variant hover:text-primary transition-colors font-body-sm font-medium px-sm py-2 rounded-lg hover:bg-surface-variant/50 border border-transparent hover:border-outline-variant">
                                <span className="material-symbols-outlined text-sm">sort</span>
                                Sort: Relevance
                            </button>
                        </div>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent opacity-50 hidden md:block"></div>
                    </section>

                    {/* Job Feed Split-View Layout (LinkedIn / Indeed Style) */}
                    <section className={`flex flex-1 min-h-0 ${selectedJob ? 'gap-lg w-full items-stretch' : 'gap-xl justify-center'}`}>
                        {/* Left Column: Job Cards List */}
                        <div className={`flex flex-col gap-md w-full lg:overflow-y-auto lg:h-full lg:pr-sm lg:py-xs custom-scrollbar ${selectedJob ? 'lg:w-5/12' : 'max-w-3xl'}`}>
                            {jobs.length === 0 ? (
                                <div className="glass-panel rounded-xl p-xl text-center flex flex-col items-center justify-center gap-md">
                                    <span className="material-symbols-outlined text-display-lg text-outline">search_off</span>
                                    <h3 className="font-headline-md text-body-lg text-on-surface">No jobs found</h3>
                                    <p className="font-body-sm text-on-surface-variant">Try adjusting your filters or check back later.</p>
                                </div>
                            ) : null}

                            {jobs.map(job => {
                                const isSelected = selectedJob?.id === job.id;
                                return (
                                    <article
                                        key={job.id}
                                        onClick={() => {
                                            if (window.innerWidth < 1024) {
                                                window.location.href = `/jobs/${job.id}`;
                                            } else {
                                                setSelectedJob(job);
                                            }
                                        }}
                                        className={`glass-panel rounded-xl p-md md:p-lg flex flex-col sm:flex-row gap-md transition-all duration-200 group cursor-pointer relative overflow-hidden flex-shrink-0 ${isSelected
                                                ? 'ring-2 ring-primary bg-primary/5 shadow-md'
                                                : 'hover:border-primary/50 hover:shadow-md'
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-xl"></div>
                                        )}
                                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-surface-container-highest border border-outline-variant flex-shrink-0 overflow-hidden flex items-center justify-center p-xs shadow-sm">
                                            <img className="w-full h-full object-contain" alt="Logo" src={job.company?.logo_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(job.company?.name || 'Company') + "&background=eaedff&color=4648d4"} />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-xs z-10">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-headline-md text-body-md md:text-body-lg font-semibold text-on-surface group-hover:text-primary transition-colors">{job.title}</h3>
                                                    <p className="font-body-sm text-on-surface-variant mt-0.5">{job.company?.name || 'Company Confidential'}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); }}
                                                    className="text-outline hover:text-primary transition-colors p-xs rounded-full hover:bg-surface-variant/50"
                                                >
                                                    <span className="material-symbols-outlined">bookmark_border</span>
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-xs mt-xs">
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-sm text-xs border border-outline-variant flex items-center gap-xs">
                                                    <span className="material-symbols-outlined text-[12px]">location_on</span> {job.location || 'Not specified'}
                                                </span>
                                                {job.is_remote ? (
                                                    <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-code-sm text-xs border border-primary/30 flex items-center gap-xs font-semibold">
                                                        <span className="material-symbols-outlined text-[12px]">public</span> Remote
                                                    </span>
                                                ) : null}
                                                {job.contract_type ? (
                                                    <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-code-sm text-xs border border-outline-variant flex items-center gap-xs capitalize">
                                                        <span className="material-symbols-outlined text-[12px]">schedule</span> {job.contract_type}
                                                    </span>
                                                ) : null}
                                            </div>
                                            <div className="flex justify-between items-center mt-sm">
                                                <span className="font-label-md text-xs text-on-surface bg-surface-variant px-2 py-0.5 rounded border border-outline-variant">
                                                    {job.salary_min && job.salary_max
                                                        ? `${job.salary_min} - ${job.salary_max} ${job.salary_currency || '€'}`
                                                        : (job.salary_min ? `From ${job.salary_min} ${job.salary_currency || '€'}` : 'Salary undisclosed')}
                                                </span>
                                                <span className="font-body-sm text-outline text-xs">
                                                    {new Date(job.date_of_publi || job.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        {selectedJob ? (
                            <div className="hidden lg:block lg:w-7/12 h-full">
                                {/* Right Column: Sticky Job Detail Panel (Desktop) */}
                                <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />
                            </div>
                        ) : (
                            <aside className="hidden xl:flex flex-col w-72 gap-lg sticky top-32 h-max">
                                {/* Right Side Asymmetric Highlight */}
                                <div className="glass-panel rounded-xl p-lg border-t-2 border-t-primary relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% -20%, #4648d4 0%, transparent 60%)" }}></div>
                                    <h4 className="font-headline-md text-body-lg font-semibold text-on-surface mb-sm relative z-10 flex items-center gap-sm">
                                        <span className="material-symbols-outlined text-primary">bolt</span> Fast Track
                                    </h4>
                                    <p className="font-body-sm text-on-surface-variant mb-md relative z-10">Complete your technical profile to instantly skip initial HR screening rounds at top companies.</p>
                                    <button className="w-full py-2 px-md rounded-lg bg-surface-variant hover:bg-surface-container-highest border border-outline-variant text-on-surface font-label-md text-label-md transition-colors relative z-10">
                                        Update Profile
                                    </button>
                                </div>
                                <div className="glass-panel rounded-xl p-md border border-outline-variant">
                                    <h4 className="font-label-md text-label-md text-on-surface mb-md">Trending Skills</h4>
                                    <div className="flex flex-wrap gap-xs">
                                        {['Rust', 'Go', 'Kubernetes', 'Next.js'].map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-surface-container rounded font-code-sm text-xs text-on-surface-variant hover:text-primary hover:border-primary border border-transparent cursor-pointer transition-colors">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </aside>
                        )}
                    </section>
                </div>
            </MainLayout>
    );
}
