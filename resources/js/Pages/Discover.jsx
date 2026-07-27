import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import JobDetailPanel from '../Components/JobDetailPanel';
import MainLayout from '../Layouts/MainLayout';

export default function Discover({ jobs = [], savedJobIds = [], filters = {} }) {
    const safeFilters = Array.isArray(filters) ? {} : (filters || {});

    const [selectedJob, setSelectedJob] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const [location, setLocation] = useState(safeFilters.location || '');
    const [contractType, setContractType] = useState(safeFilters.contract_type || '');
    const [remoteOnly, setRemoteOnly] = useState(safeFilters.remote_only === 'true');
    const [salaryMin, setSalaryMin] = useState(safeFilters.salary_min || '');
    const [sort, setSort] = useState(typeof safeFilters.sort === 'string' ? safeFilters.sort : 'recent');

    // Debounce location search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (location !== (filters.location || '')) {
                updateFilters({ location });
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [location]);

    const updateFilters = (newFilters) => {
        const queryParams = { ...filters, ...newFilters };
        // Remove empty values to clean URL
        Object.keys(queryParams).forEach(key => {
            if (queryParams[key] === '' || queryParams[key] === null || queryParams[key] === false) {
                delete queryParams[key];
            }
        });
        
        router.get('/', queryParams, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

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
                    <section className="flex flex-col gap-4 flex-shrink-0 bg-background pt-2 pb-4">
                        {/* Scrollable container for filters to prevent unwanted wrapping */}
                        <div className="flex items-center gap-3 md:gap-4 overflow-x-auto hide-scrollbar w-full pb-2">
                            <div className="flex items-center glass-input rounded-lg px-3 min-w-[180px]">
                                <span className="material-symbols-outlined text-outline text-sm">location_on</span>
                                <input 
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 font-body-sm py-2 outline-none" 
                                    placeholder="Location..." 
                                    type="text" 
                                />
                            </div>
                            <div className="relative min-w-[150px]">
                                <select 
                                    value={contractType}
                                    onChange={(e) => {
                                        setContractType(e.target.value);
                                        updateFilters({ contract_type: e.target.value });
                                    }}
                                    className="w-full glass-input rounded-lg pl-3 pr-8 py-2 font-body-sm text-on-surface outline-none cursor-pointer"
                                >
                                    <option className="bg-surface" value="">Contract Type (All)</option>
                                    <option className="bg-surface" value="full-time">Full-Time</option>
                                    <option className="bg-surface" value="contract">Contract</option>
                                    <option className="bg-surface" value="freelance">Freelance</option>
                                </select>
                            </div>
                            <Popover className="relative">
                                <PopoverButton className="flex items-center gap-2 glass-input rounded-lg px-3 py-2 cursor-pointer outline-none min-w-[150px]">
                                    <span className="material-symbols-outlined text-outline text-sm">payments</span>
                                    <span className="font-body-sm text-on-surface whitespace-nowrap">
                                        {salaryMin ? `> ${salaryMin / 1000}k €` : 'Salary Range'}
                                    </span>
                                    <span className="material-symbols-outlined text-outline text-sm ml-auto">expand_more</span>
                                </PopoverButton>
                                <PopoverPanel 
                                    transition
                                    anchor="bottom start"
                                    className="z-50 mt-2 p-4 bg-surface rounded-xl shadow-lg border border-outline-variant/30 min-w-[250px] transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                                >
                                    <div className="flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-body-sm text-on-surface-variant font-medium whitespace-nowrap">0 €</span>
                                            <span className="font-body-sm text-on-surface-variant font-medium whitespace-nowrap">150k+ €</span>
                                        </div>
                                        <div className="w-full relative mt-2 mb-2 flex items-center">
                                            <input 
                                                type="range" 
                                                min="0" max="150000" step="10000"
                                                value={salaryMin || 0}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setSalaryMin(val === '0' ? '' : val);
                                                }}
                                                onMouseUp={() => updateFilters({ salary_min: salaryMin })}
                                                onTouchEnd={() => updateFilters({ salary_min: salaryMin })}
                                                className="w-full h-1.5 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary"
                                            />
                                        </div>
                                        <div className="text-center font-body-sm text-primary font-bold mt-1">
                                            {salaryMin ? `Minimum: ${salaryMin} €` : 'Any Salary'}
                                        </div>
                                    </div>
                                </PopoverPanel>
                            </Popover>
                            <div 
                                onClick={() => {
                                    const newValue = !remoteOnly;
                                    setRemoteOnly(newValue);
                                    updateFilters({ remote_only: newValue ? 'true' : '' });
                                }}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 cursor-pointer transition-colors whitespace-nowrap border ${remoteOnly ? 'bg-primary-container/20 border-primary text-primary' : 'glass-panel border-transparent hover:border-outline-variant text-on-surface'}`}
                            >
                                <div className={`w-8 h-4 rounded-full relative transition-colors ${remoteOnly ? 'bg-primary' : 'bg-surface-variant'}`}>
                                    <div className={`absolute top-0.5 w-3 h-3 rounded-full shadow-sm transition-all ${remoteOnly ? 'right-1 bg-white' : 'left-1 bg-outline'}`}></div>
                                </div>
                                <span className="font-body-sm">Remote Only</span>
                            </div>
                            {/* Sort Button pushed to right */}
                            <div className="flex-1 min-w-[150px] flex justify-end ml-auto">
                                <button 
                                    onClick={() => {
                                        const newSort = sort === 'recent' ? 'relevance' : 'recent';
                                        setSort(newSort);
                                        updateFilters({ sort: newSort });
                                    }}
                                    className="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors font-body-sm font-medium px-3 py-2 rounded-lg hover:bg-surface-variant/50 border border-transparent hover:border-outline-variant whitespace-nowrap outline-none focus:ring-0"
                                >
                                    <span className="material-symbols-outlined text-sm">sort</span>
                                    {sort === 'relevance' ? 'Sort: Relevance' : 'Sort: Recent'}
                                </button>
                            </div>
                        </div>
                        <div className={`w-full h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent hidden md:block transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-50'}`}></div>
                    </section>

                    {/* Job Feed Split-View Layout (LinkedIn / Indeed Style) */}
                    <section className={`flex flex-1 min-h-0 ${selectedJob ? 'gap-lg w-full items-stretch' : 'gap-xl justify-center'}`}>
                        {/* Left Column: Job Cards List */}
                        <div 
                            className={`flex flex-col gap-md w-full lg:overflow-y-auto lg:h-full lg:pr-sm lg:py-xs custom-scrollbar ${selectedJob ? 'lg:w-5/12' : 'max-w-3xl'}`}
                            onScroll={(e) => setIsScrolled(e.target.scrollTop > 10)}
                        >
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
                                                if (window.axios) {
                                                    window.axios.post(`/jobs/${job.id}/view`).catch(e => console.error(e));
                                                }
                                            }
                                        }}
                                        className={`glass-panel rounded-xl p-4 flex flex-col sm:flex-row gap-4 transition-all duration-200 group cursor-pointer relative overflow-hidden flex-shrink-0 ${isSelected
                                                ? 'ring-2 ring-primary bg-primary/5 shadow-md'
                                                : 'hover:border-primary/50 hover:shadow-md'
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
                                        )}
                                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-surface-container-highest border border-outline-variant flex-shrink-0 overflow-hidden flex items-center justify-center p-1 shadow-sm">
                                            <img className="w-full h-full object-contain" alt="Logo" src={job.company?.logo_url || "https://ui-avatars.com/api/?name=" + encodeURIComponent(job.company?.name || 'Company') + "&background=eaedff&color=4648d4"} />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-1 z-10">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-base font-semibold text-on-surface group-hover:text-primary transition-colors">{job.title}</h3>
                                                    <p className="text-sm text-on-surface-variant mt-0.5">{job.company?.name || 'Company Confidential'}</p>
                                                </div>
                                                <button
                                                    onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        router.post(`/jobs/${job.id}/toggle-save`, {}, { preserveScroll: true, preserveState: true });
                                                    }}
                                                    className="text-outline hover:text-primary transition-colors p-xs rounded-full hover:bg-surface-variant/50"
                                                >
                                                    <span className="material-symbols-outlined" style={savedJobIds.includes(job.id) ? { fontVariationSettings: "'FILL' 1", color: 'var(--primary)' } : {}}>
                                                        {savedJobIds.includes(job.id) ? 'bookmark' : 'bookmark_border'}
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-1 mt-1">
                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-xs border border-outline-variant flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[12px]">location_on</span> {job.location || 'Not specified'}
                                                </span>
                                                {job.is_remote ? (
                                                    <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary text-xs border border-primary/30 flex items-center gap-1 font-semibold">
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
                                                <span className="font-medium text-xs text-on-surface bg-surface-variant px-2 py-0.5 rounded border border-outline-variant">
                                                    {(() => {
                                                        if (!job.salary_min && !job.salary_max) return 'Salary undisclosed';
                                                        
                                                        const isFreelance = job.contract_type && job.contract_type.toLowerCase() === 'freelance';
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
                                                        
                                                        if (min && max) return `${min} - ${max} ${curr}${suffix}`;
                                                        if (min) return `From ${min} ${curr}${suffix}`;
                                                        return `Up to ${max} ${curr}${suffix}`;
                                                    })()}
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
                            <aside className="hidden xl:flex flex-col w-72 gap-6 sticky top-32 h-max">
                                {/* Right Side Asymmetric Highlight */}
                                <div className="glass-panel rounded-xl p-6 border-t-2 border-t-primary relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% -20%, #4648d4 0%, transparent 60%)" }}></div>
                                    <h4 className="text-lg font-semibold text-on-surface mb-2 relative z-10 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">bolt</span> Fast Track
                                    </h4>
                                    <p className="text-sm text-on-surface-variant mb-4 relative z-10">Complete your technical profile to instantly skip initial HR screening rounds at top companies.</p>
                                    <button className="w-full py-2 px-4 rounded-lg bg-surface-variant hover:bg-surface-container-highest border border-outline-variant text-on-surface text-sm font-medium transition-colors relative z-10">
                                        Update Profile
                                    </button>
                                </div>
                                <div className="glass-panel rounded-xl p-4 border border-outline-variant">
                                    <h4 className="text-sm font-medium text-on-surface mb-3">Trending Skills</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {['Rust', 'Go', 'Kubernetes', 'Next.js'].map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-surface-container rounded font-mono text-xs text-on-surface-variant hover:text-primary hover:border-primary border border-transparent cursor-pointer transition-colors">{skill}</span>
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
