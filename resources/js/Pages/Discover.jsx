import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import JobDetailPanel from '../Components/JobDetailPanel';
import MainLayout from '../Layouts/MainLayout';

function formatRelativeDate(dateStr) {
    if (!dateStr) return "Récemment";
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "À l'instant";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

function formatSalary(job) {
    if (!job.salary_min && !job.salary_max) {
        return { text: 'Salaire non communiqué', isDisclosed: false };
    }
    
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
    const curr = job.salary_currency === 'USD' ? '$' : '€';
    const suffix = isFreelance ? ' / j' : ' / an';
    
    if (min && max) return { text: `${min} - ${max} ${curr}${suffix}`, isDisclosed: true };
    if (min) return { text: `Dès ${min} ${curr}${suffix}`, isDisclosed: true };
    return { text: `Jusqu'à ${max} ${curr}${suffix}`, isDisclosed: true };
}

export default function Discover({ auth, jobs = [], savedJobIds = [], filters = {}, selectedJobInitial = null }) {
    const safeFilters = Array.isArray(filters) ? {} : (filters || {});

    const [selectedJob, setSelectedJob] = useState(selectedJobInitial);

    useEffect(() => {
        if (selectedJobInitial) {
            setSelectedJob(selectedJobInitial);
        }
    }, [selectedJobInitial]);

    const [search, setSearch] = useState(safeFilters.search || '');
    const [location, setLocation] = useState(safeFilters.location || '');
    const [contractType, setContractType] = useState(safeFilters.contract_type || '');
    const [remoteOnly, setRemoteOnly] = useState(safeFilters.remote_only === 'true');
    const [salaryMin, setSalaryMin] = useState(safeFilters.salary_min || '');
    const [sort, setSort] = useState(typeof safeFilters.sort === 'string' ? safeFilters.sort : 'recent');

    // Handle Escape key to close the selected job detail
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedJob(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Debounce keyword search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search !== (filters.search || '')) {
                updateFilters({ search });
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [search]);

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

    const resetFilters = () => {
        setSearch('');
        setLocation('');
        setContractType('');
        setRemoteOnly(false);
        setSalaryMin('');
        setSort('recent');
        router.get('/', {}, { preserveState: true, preserveScroll: true });
    };

    const hasActiveFilters = Boolean(search || location || contractType || remoteOnly || salaryMin || (sort && sort !== 'recent'));

    const contractOptions = [
        { label: 'Tous', value: '' },
        { label: 'CDI', value: 'CDI' },
        { label: 'CDD', value: 'CDD' },
        { label: 'Stage', value: 'Stage' },
        { label: 'Alternance', value: 'Alternance' },
        { label: 'Freelance', value: 'Freelance' },
    ];

    return (
        <MainLayout>
            <Head title="JobMind - Recherche d'offres" />

            {/* Main Application Shell (Full viewport height minus topnav) */}
            <div className="pt-14 pb-2 px-3 md:px-6 max-w-[1560px] w-full mx-auto flex flex-col h-screen overflow-hidden">
                
                {/* Unified Master Toolbar */}
                <header className="flex flex-wrap items-center justify-between gap-2.5 py-2.5 flex-shrink-0 border-b border-outline-variant/60">
                    
                    {/* Left: Dual Search Capsule + Contract pills + Salary + Remote */}
                    <div className="flex flex-wrap items-center gap-2">
                        
                        {/* Unified Search Capsule (Quoi + Où) */}
                        <div className="flex items-center rounded-lg bg-surface-container-low/90 border border-outline-variant/60 focus-within:border-primary/80 focus-within:bg-surface focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-150 shadow-2xs">
                            
                            {/* Keyword Search */}
                            <div className="flex items-center px-2.5 py-1 min-w-[180px] lg:min-w-[220px]">
                                <span className="material-symbols-outlined text-outline text-base mr-1.5">search</span>
                                <input 
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 text-xs py-1 outline-none font-medium" 
                                    placeholder="Poste, compétence, entreprise..." 
                                    type="text" 
                                />
                                {search && (
                                    <button 
                                        onClick={() => setSearch('')}
                                        className="text-outline hover:text-on-surface p-0.5 rounded-full"
                                        title="Effacer"
                                    >
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                )}
                            </div>

                            <div className="h-4 w-px bg-outline-variant/60"></div>

                            {/* Location Search */}
                            <div className="flex items-center px-2.5 py-1 min-w-[140px] lg:min-w-[160px]">
                                <span className="material-symbols-outlined text-outline text-base mr-1.5">location_on</span>
                                <input 
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    className="w-full bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 text-xs py-1 outline-none font-medium" 
                                    placeholder="Ville ou région..." 
                                    type="text" 
                                />
                                {location && (
                                    <button 
                                        onClick={() => setLocation('')}
                                        className="text-outline hover:text-on-surface p-0.5 rounded-full"
                                        title="Effacer"
                                    >
                                        <span className="material-symbols-outlined text-xs">close</span>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Contract Type Pills */}
                        <div className="flex items-center gap-1 bg-surface-container/70 p-1 rounded-lg border border-outline-variant/50">
                            {contractOptions.map((opt) => {
                                const isActive = contractType === opt.value;
                                return (
                                    <button
                                        key={opt.label}
                                        onClick={() => {
                                            const newVal = isActive ? '' : opt.value;
                                            setContractType(newVal);
                                            updateFilters({ contract_type: newVal });
                                        }}
                                        className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                                            isActive
                                                ? 'bg-primary text-on-primary shadow-xs'
                                                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'
                                        }`}
                                    >
                                        {opt.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Salary Popover */}
                        <Popover className="relative">
                            <PopoverButton className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 cursor-pointer outline-none border text-xs font-medium transition-colors ${
                                salaryMin 
                                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold' 
                                    : 'bg-surface-container/70 border-outline-variant/50 text-on-surface hover:border-outline-variant'
                            }`}>
                                <span className="material-symbols-outlined text-sm">payments</span>
                                <span>{salaryMin ? `Dès ${salaryMin / 1000}k €` : 'Salaire'}</span>
                                <span className="material-symbols-outlined text-xs">expand_more</span>
                            </PopoverButton>

                            <PopoverPanel 
                                transition
                                anchor="bottom start"
                                className="z-50 mt-2 p-4 bg-surface rounded-xl shadow-xl border border-outline-variant/60 min-w-[260px] transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                            >
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center text-xs font-semibold text-on-surface">
                                        <span>Salaire annuel minimum</span>
                                        <span className="text-primary">{salaryMin ? `Dès ${salaryMin} €` : 'Tous'}</span>
                                    </div>
                                    
                                    <input 
                                        type="range" 
                                        min="0" max="100000" step="5000"
                                        value={salaryMin || 0}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setSalaryMin(val === '0' ? '' : val);
                                        }}
                                        onMouseUp={() => updateFilters({ salary_min: salaryMin })}
                                        onTouchEnd={() => updateFilters({ salary_min: salaryMin })}
                                        className="w-full h-1.5 bg-surface-variant rounded-full appearance-none cursor-pointer accent-primary my-1"
                                    />

                                    <div className="flex items-center gap-1">
                                        {[35000, 45000, 55000].map((preset) => (
                                            <button
                                                key={preset}
                                                onClick={() => {
                                                    const val = String(preset);
                                                    setSalaryMin(val);
                                                    updateFilters({ salary_min: val });
                                                }}
                                                className="flex-1 py-1 text-[11px] font-medium rounded bg-surface-container hover:bg-surface-variant text-on-surface border border-outline-variant/40"
                                            >
                                                {preset / 1000}k+
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </PopoverPanel>
                        </Popover>

                        {/* Remote Toggle */}
                        <button 
                            onClick={() => {
                                const newValue = !remoteOnly;
                                setRemoteOnly(newValue);
                                updateFilters({ remote_only: newValue ? 'true' : '' });
                            }}
                            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 cursor-pointer transition-all whitespace-nowrap border text-xs font-medium ${
                                remoteOnly 
                                    ? 'bg-primary/10 border-primary text-primary font-semibold shadow-2xs' 
                                    : 'bg-surface-container/70 border-outline-variant/50 hover:border-outline-variant text-on-surface'
                            }`}
                        >
                            <span className="material-symbols-outlined text-sm">public</span>
                            <span>Télétravail</span>
                        </button>
                    </div>

                    {/* Right: Results Count + Sort */}
                    <div className="flex items-center gap-3 ml-auto">
                        <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            {jobs.length} {jobs.length > 1 ? 'offres disponibles' : 'offre disponible'}
                        </span>

                        {hasActiveFilters && (
                            <button
                                onClick={resetFilters}
                                className="text-xs text-primary font-medium hover:underline flex items-center gap-0.5"
                                title="Réinitialiser"
                            >
                                <span className="material-symbols-outlined text-xs">refresh</span>
                                Effacer filtres
                            </button>
                        )}

                        <div className="h-4 w-px bg-outline-variant/60"></div>

                        <button 
                            onClick={() => {
                                const newSort = sort === 'recent' ? 'relevance' : 'recent';
                                setSort(newSort);
                                updateFilters({ sort: newSort });
                            }}
                            className="flex items-center gap-1 text-on-surface text-xs font-medium px-2 py-1 rounded-md hover:bg-surface-variant transition-colors"
                        >
                            <span className="material-symbols-outlined text-sm text-primary">
                                {sort === 'relevance' ? 'trending_up' : 'schedule'}
                            </span>
                            <span>{sort === 'relevance' ? 'Pertinence' : 'Récents'}</span>
                        </button>
                    </div>
                </header>

                {/* Main Split-View / Feed Layout */}
                <div className={`flex flex-1 min-h-0 pt-3 gap-4 lg:gap-6 ${selectedJob ? 'items-stretch' : 'justify-between'}`}>
                    
                    {/* Job Cards Container (Adapts: 1-col in split-view, 2-col grid in feed-view) */}
                    <div className={`overflow-y-auto pr-1 pb-4 custom-scrollbar ${
                        selectedJob 
                            ? 'w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 flex flex-col gap-2.5' 
                            : 'flex-1 min-w-0'
                    }`}>
                        {jobs.length === 0 ? (
                            <div className="glass-panel rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3 border border-outline-variant/60 my-auto">
                                <span className="material-symbols-outlined text-4xl text-outline">search_off</span>
                                <h3 className="text-sm font-bold text-on-surface">Aucune offre ne correspond à vos critères</h3>
                                <p className="text-xs text-on-surface-variant">
                                    Modifiez vos filtres ou réinitialisez la recherche.
                                </p>
                                <button
                                    onClick={resetFilters}
                                    className="mt-1 px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors"
                                >
                                    Toutes les offres
                                </button>
                            </div>
                        ) : (
                            <div className={selectedJob ? 'flex flex-col gap-2.5' : 'grid grid-cols-1 md:grid-cols-2 gap-3'}>
                                {jobs.map(job => {
                                    const isSelected = selectedJob?.id === job.id;
                                    const salaryInfo = formatSalary(job);
                                    const relativeDate = formatRelativeDate(job.date_of_publi || job.created_at);
                                    const companyName = job.company?.name || 'Confidentiel';
                                    const logoUrl = job.company?.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4&bold=true`;

                                    return (
                                        <article
                                            key={job.id}
                                            onClick={() => {
                                                if (window.innerWidth < 1024) {
                                                    window.location.href = `/jobs/${job.id}`;
                                                } else {
                                                    setSelectedJob(job);
                                                    if (window.axios) {
                                                        window.axios.post(`/jobs/${job.id}/view`).catch(() => {});
                                                    }
                                                }
                                            }}
                                            className={`rounded-xl p-3.5 flex flex-col justify-between transition-all duration-150 group cursor-pointer relative overflow-hidden border ${
                                                isSelected
                                                    ? 'border-primary ring-1 ring-primary bg-primary/[0.04] shadow-xs'
                                                    : 'border-outline-variant/60 hover:border-primary/50 hover:bg-surface-container-low bg-surface hover:shadow-xs'
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
                                            )}

                                            <div>
                                                {/* Header row: Avatar + Title + Bookmark */}
                                                <div className="flex items-start gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-outline-variant/60 flex-shrink-0 overflow-hidden flex items-center justify-center p-1 shadow-2xs">
                                                        <img 
                                                            className="w-full h-full object-contain" 
                                                            alt={companyName} 
                                                            src={logoUrl} 
                                                        />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex justify-between items-start gap-1">
                                                            <h3 className="text-xs md:text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-tight truncate">
                                                                {job.title}
                                                            </h3>

                                                            <button
                                                                onClick={(e) => { 
                                                                    e.stopPropagation(); 
                                                                    router.post(`/jobs/${job.id}/toggle-save`, {}, { preserveScroll: true, preserveState: true });
                                                                }}
                                                                className="text-outline hover:text-primary transition-colors p-1 rounded-full hover:bg-surface-variant/60 flex-shrink-0 -mt-1"
                                                                title={savedJobIds.includes(job.id) ? "Sauvegardé" : "Sauvegarder"}
                                                            >
                                                                <span 
                                                                    className="material-symbols-outlined text-[18px]" 
                                                                    style={savedJobIds.includes(job.id) ? { fontVariationSettings: "'FILL' 1", color: 'var(--primary)' } : {}}
                                                                >
                                                                    {savedJobIds.includes(job.id) ? 'bookmark' : 'bookmark_border'}
                                                                </span>
                                                            </button>
                                                        </div>
                                                        <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5 truncate">
                                                            {companyName}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Metadata Tags Row */}
                                                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                                                    <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-medium border border-outline-variant/40 flex items-center gap-0.5">
                                                        <span className="material-symbols-outlined text-[11px]">location_on</span>
                                                        {job.location || 'France'}
                                                    </span>

                                                    {job.is_remote ? (
                                                        <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] border border-primary/20 flex items-center gap-0.5 font-semibold">
                                                            <span className="material-symbols-outlined text-[11px]">public</span>
                                                            Remote
                                                        </span>
                                                    ) : null}

                                                    {job.contract_type ? (
                                                        <span className="px-1.5 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-semibold border border-outline-variant/40 capitalize">
                                                            {job.contract_type}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>

                                            {/* Salary Badge & Date */}
                                            <div className="flex justify-between items-center mt-3 pt-2 border-t border-outline-variant/30 text-[10px]">
                                                <span className={`font-semibold px-1.5 py-0.5 rounded ${
                                                    salaryInfo.isDisclosed
                                                        ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20'
                                                        : 'text-on-surface-variant'
                                                }`}>
                                                    {salaryInfo.text}
                                                </span>

                                                <span className="text-outline font-medium">
                                                    {relativeDate}
                                                </span>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Full Detail Panel OR Profile Completion Widget */}
                    {selectedJob ? (
                        <main className="hidden lg:flex flex-1 min-w-0 h-full pb-4">
                            <JobDetailPanel 
                                job={selectedJob} 
                                onClose={() => setSelectedJob(null)}
                                isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
                            />
                        </main>
                    ) : (
                        <aside className="hidden xl:flex flex-col w-72 xl:w-80 gap-3.5 sticky top-2 h-max pb-4 flex-shrink-0">
                            {/* Profile Completion Widget */}
                            <div className="glass-panel rounded-xl p-5 relative overflow-hidden border border-outline-variant/70 shadow-2xs">
                                <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% -20%, #4648d4 0%, transparent 60%)" }}></div>
                                
                                <h4 className="text-sm font-bold text-on-surface mb-1 relative z-10 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-primary text-base">person_check</span>
                                    Complétion du profil
                                </h4>
                                
                                {!auth?.user ? (
                                    <>
                                        <p className="text-xs text-on-surface-variant mb-3 relative z-10 leading-relaxed">
                                            Créez un compte pour postuler en 1 clic et sauvegarder vos offres préférées.
                                        </p>
                                        <Link href={route('register')} className="w-full py-2 px-3 rounded-lg bg-primary hover:bg-primary/90 text-on-primary text-xs font-semibold transition-colors relative z-10 flex items-center justify-center gap-1.5 shadow-xs">
                                            Créer un compte <span className="material-symbols-outlined text-sm">person_add</span>
                                        </Link>
                                    </>
                                ) : auth.user.profile_completion < 100 ? (
                                    <>
                                        <p className="text-xs text-on-surface-variant mb-3 relative z-10 leading-relaxed">
                                            Complétez votre profil pour maximiser la visibilité de vos candidatures.
                                        </p>
                                        
                                        <div className="mb-3 relative z-10">
                                            <div className="flex justify-between items-center text-xs mb-1">
                                                <span className="text-on-surface-variant font-medium">Progression</span>
                                                <span className="text-primary font-bold">{auth.user.profile_completion}%</span>
                                            </div>
                                            <div className="w-full bg-surface-container-highest rounded-full h-1.5">
                                                <div className="bg-primary h-1.5 rounded-full transition-all duration-500 ease-out" style={{ width: `${auth.user.profile_completion}%` }}></div>
                                            </div>
                                        </div>
                                        
                                        <Link href={route('settings')} className="w-full py-2 px-3 rounded-lg bg-primary hover:bg-primary/90 text-on-primary text-xs font-semibold transition-colors relative z-10 flex items-center justify-center gap-1.5">
                                            Compléter mon profil <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-xs text-on-surface-variant mb-3 relative z-10">
                                            Votre profil est optimisé à 100% ! Vous bénéficiez du Fast Track.
                                        </p>
                                        <div className="flex items-center justify-center p-2.5 bg-primary/10 rounded-lg border border-primary/20 relative z-10">
                                            <span className="material-symbols-outlined text-primary text-sm mr-1.5">verified</span>
                                            <span className="text-xs font-semibold text-primary">Profil Optimisé</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Market Trends Card */}
                            <div className="glass-panel rounded-xl p-4 border border-outline-variant/60 bg-surface-container-low/60 text-xs text-on-surface-variant flex flex-col gap-2">
                                <span className="font-semibold text-on-surface flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm text-emerald-500">trending_up</span>
                                    Aperçu du marché
                                </span>
                                <div className="space-y-1.5 text-[11px]">
                                    <div className="flex justify-between items-center">
                                        <span>Salaire moyen observé</span>
                                        <span className="font-bold text-on-surface">~43 500 €</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Top contrats</span>
                                        <span className="font-semibold text-primary">CDI (78%)</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>Offres en télétravail</span>
                                        <span className="font-semibold text-on-surface">45%</span>
                                    </div>
                                </div>
                            </div>

                            {/* Search tip */}
                            <div className="glass-panel rounded-xl p-3.5 border border-outline-variant/60 bg-surface-container-low/40 text-[11px] text-on-surface-variant flex items-start gap-2">
                                <span className="material-symbols-outlined text-primary text-sm mt-0.5">lightbulb</span>
                                <p className="leading-snug">
                                    Cliquez sur une offre pour ouvrir son volet interactif ou tapez <kbd className="px-1 py-0.5 rounded bg-surface-container border border-outline-variant font-mono text-[9px]">Échap</kbd> pour fermer.
                                </p>
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
