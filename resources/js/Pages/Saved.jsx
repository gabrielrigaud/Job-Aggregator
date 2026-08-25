import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import JobDetailPanel from '../Components/JobDetailPanel';

export default function Saved({ favorites = [], history = [] }) {
    const [activeTab, setActiveTab] = useState('favorites');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);

    const formatSalary = (job) => {
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
    };

    const formatRelativeDate = (dateString) => {
        if (!dateString) return 'Récemment';
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - date) / 1000);
        
        if (diffInSeconds < 60) return "À l'instant";
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `Il y a ${diffInHours}h`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return 'Hier';
        if (diffInDays < 7) return `Il y a ${diffInDays}j`;
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    };

    const filteredFavorites = favorites.filter(job => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            (job.title && job.title.toLowerCase().includes(q)) ||
            (job.company?.name && job.company.name.toLowerCase().includes(q)) ||
            (job.location && job.location.toLowerCase().includes(q))
        );
    });

    const filteredHistory = history.filter(job => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
            (job.title && job.title.toLowerCase().includes(q)) ||
            (job.company?.name && job.company.name.toLowerCase().includes(q)) ||
            (job.location && job.location.toLowerCase().includes(q))
        );
    });

    const handleSelectJob = (job) => {
        if (window.innerWidth < 1024) {
            window.location.href = `/jobs/${job.id}`;
        } else {
            setSelectedJob(job);
        }
    };

    const isJobFavorite = (jobId) => {
        return favorites.some(f => f.id === jobId);
    };

    return (
        <MainLayout>
            <Head title="JobMind - Offres sauvegardées" />
            
            <div className="pt-16 pb-8 px-4 md:px-8 max-w-[1560px] mx-auto w-full flex flex-col gap-4 min-h-[calc(100vh-4rem)]">
                
                {/* Header Banner */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 border-b border-outline-variant/60 flex-shrink-0">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold text-on-surface tracking-tight">
                            Mes Offres & Historique
                        </h2>
                        <p className="text-xs md:text-sm text-on-surface-variant mt-0.5">
                            Gérez vos opportunités favorites et retrouvez vos offres consultées récemment.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link 
                            href="/"
                            className="px-3.5 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-xs"
                        >
                            <span className="material-symbols-outlined text-sm">search</span>
                            Découvrir de nouvelles offres
                        </Link>
                    </div>
                </header>

                {/* Sub-bar: Tabs & Filter Search */}
                <div className="flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
                    
                    {/* Navigation Tabs */}
                    <div className="flex items-center gap-1 bg-surface-container/70 p-1 rounded-xl border border-outline-variant/60">
                        <button 
                            onClick={() => {
                                setActiveTab('favorites');
                            }}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                                activeTab === 'favorites' 
                                    ? 'bg-primary text-on-primary shadow-xs' 
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'
                            }`}
                        >
                            <span className="material-symbols-outlined text-base">bookmark</span>
                            <span>Favoris</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                activeTab === 'favorites' 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-surface-container-highest text-on-surface-variant'
                            }`}>
                                {favorites.length}
                            </span>
                        </button>

                        <button 
                            onClick={() => {
                                setActiveTab('history');
                            }}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 ${
                                activeTab === 'history' 
                                    ? 'bg-primary text-on-primary shadow-xs' 
                                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/50'
                            }`}
                        >
                            <span className="material-symbols-outlined text-base">history</span>
                            <span>Consultées récemment</span>
                            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                                activeTab === 'history' 
                                    ? 'bg-white/20 text-white' 
                                    : 'bg-surface-container-highest text-on-surface-variant'
                            }`}>
                                {history.length}
                            </span>
                        </button>
                    </div>

                    {/* Filter Input */}
                    {(favorites.length > 0 || history.length > 0) && (
                        <div className="flex items-center rounded-lg bg-surface-container-low/90 px-3 py-1.5 min-w-[220px] border border-outline-variant/60 focus-within:border-primary/80 focus-within:ring-1 focus-within:ring-primary/20 shadow-2xs">
                            <span className="material-symbols-outlined text-outline text-base mr-2">filter_list</span>
                            <input 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-none text-on-surface placeholder:text-outline focus:ring-0 text-xs py-0.5 outline-none font-medium" 
                                placeholder="Filtrer dans la liste..." 
                                type="text" 
                            />
                            {searchQuery && (
                                <button 
                                    onClick={() => setSearchQuery('')}
                                    className="text-outline hover:text-on-surface p-0.5"
                                >
                                    <span className="material-symbols-outlined text-xs">close</span>
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* Main Split-View / Feed Layout */}
                <div className={`flex flex-1 min-h-0 pt-2 gap-4 lg:gap-6 ${selectedJob ? 'items-stretch' : 'justify-between'}`}>
                    
                    {/* Left: Job List (Adapts: 1-col when split, grid/table when full) */}
                    <div className={`overflow-y-auto pr-1 pb-4 custom-scrollbar ${
                        selectedJob 
                            ? 'w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 flex flex-col gap-2.5' 
                            : 'flex-1 min-w-0'
                    }`}>

                        {/* FAVORITES TAB */}
                        {activeTab === 'favorites' && (
                            <>
                                {filteredFavorites.length === 0 ? (
                                    <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 border border-outline-variant/60 my-6 max-w-lg mx-auto">
                                        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                            <span className="material-symbols-outlined text-3xl">bookmark_border</span>
                                        </div>
                                        <h3 className="text-base font-bold text-on-surface">
                                            {favorites.length === 0 ? 'Aucune offre sauvegardée' : 'Aucune offre ne correspond au filtre'}
                                        </h3>
                                        <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
                                            {favorites.length === 0 
                                                ? 'Explorez les offres d\'emploi et cliquez sur l\'icône de marque-page pour les retrouver ici à tout moment.' 
                                                : 'Essayez un autre mot-clé ou effacez le filtre de recherche.'}
                                        </p>
                                        <Link 
                                            href="/" 
                                            className="mt-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                                        >
                                            Explorer les offres
                                        </Link>
                                    </div>
                                ) : (
                                    <div className={selectedJob ? 'flex flex-col gap-2.5' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                                        {filteredFavorites.map(job => {
                                            const isSelected = selectedJob?.id === job.id;
                                            const salaryInfo = formatSalary(job);
                                            const relativeDate = formatRelativeDate(job.date_of_publi || job.created_at);
                                            const companyName = job.company?.name || 'Confidentiel';
                                            const logoUrl = job.company?.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4&bold=true`;

                                            return (
                                                <article 
                                                    key={job.id} 
                                                    onClick={() => handleSelectJob(job)} 
                                                    className={`rounded-xl p-4 flex flex-col justify-between border transition-all duration-150 group cursor-pointer relative ${
                                                        isSelected
                                                            ? 'border-primary ring-1 ring-primary bg-primary/[0.04] shadow-xs'
                                                            : 'border-outline-variant/60 hover:border-primary/60 bg-surface/90 hover:bg-surface-container-low hover:shadow-xs'
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
                                                    )}

                                                    <div>
                                                        {/* Header Row */}
                                                        <div className="flex items-start gap-3">
                                                            <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-outline-variant/60 flex items-center justify-center p-1 shadow-2xs flex-shrink-0">
                                                                <img className="w-full h-full object-contain" alt={companyName} src={logoUrl} />
                                                            </div>

                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex justify-between items-start gap-1">
                                                                    <h3 className="text-xs md:text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug truncate">
                                                                        {job.title}
                                                                    </h3>

                                                                    <button 
                                                                        onClick={(e) => { 
                                                                            e.stopPropagation();
                                                                            router.post(`/jobs/${job.id}/toggle-save`, {}, { preserveScroll: true, preserveState: true });
                                                                            if (selectedJob?.id === job.id) {
                                                                                setSelectedJob(null);
                                                                            }
                                                                        }}
                                                                        className="text-primary hover:text-error transition-colors p-1 rounded-full hover:bg-surface-variant/60 flex-shrink-0 -mt-1"
                                                                        title="Retirer des favoris"
                                                                    >
                                                                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                                                            bookmark
                                                                        </span>
                                                                    </button>
                                                                </div>

                                                                <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5 truncate">
                                                                    {companyName}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Tags Row */}
                                                        <div className="flex flex-wrap items-center gap-1.5 mt-3">
                                                            <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-medium border border-outline-variant/40 flex items-center gap-1">
                                                                <span className="material-symbols-outlined text-xs">location_on</span>
                                                                {job.location || 'France'}
                                                            </span>

                                                            {job.is_remote ? (
                                                                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-semibold border border-primary/20 flex items-center gap-1">
                                                                    <span className="material-symbols-outlined text-xs">public</span>
                                                                    Télétravail
                                                                </span>
                                                            ) : null}

                                                            {job.contract_type ? (
                                                                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant text-[10px] font-semibold border border-outline-variant/40 capitalize">
                                                                    {job.contract_type}
                                                                </span>
                                                            ) : null}
                                                        </div>
                                                    </div>

                                                    {/* Bottom Info */}
                                                    <div className="mt-3 pt-2.5 border-t border-outline-variant/40 flex items-center justify-between gap-2">
                                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                                            salaryInfo.isDisclosed
                                                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25'
                                                                : 'text-on-surface-variant bg-surface-container'
                                                        }`}>
                                                            {salaryInfo.text}
                                                        </span>

                                                        <span className="text-[10px] text-outline font-medium">
                                                            {relativeDate}
                                                        </span>
                                                    </div>
                                                </article>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}

                        {/* HISTORY TAB */}
                        {activeTab === 'history' && (
                            <>
                                {filteredHistory.length === 0 ? (
                                    <div className="glass-panel rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-3 border border-outline-variant/60 my-6 max-w-lg mx-auto">
                                        <div className="w-14 h-14 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                                            <span className="material-symbols-outlined text-3xl">history</span>
                                        </div>
                                        <h3 className="text-base font-bold text-on-surface">
                                            {history.length === 0 ? 'Aucun historique récent' : 'Aucune offre trouvée dans l\'historique'}
                                        </h3>
                                        <p className="text-xs text-on-surface-variant max-w-sm leading-relaxed">
                                            Les offres que vous consultez s'afficheront automatiquement ici pour vous permettre d'y revenir facilement.
                                        </p>
                                        <Link 
                                            href="/" 
                                            className="mt-2 px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary/90 transition-colors shadow-xs"
                                        >
                                            Parcourir les offres
                                        </Link>
                                    </div>
                                ) : selectedJob ? (
                                    /* In Split View: Compact card list for history */
                                    <div className="flex flex-col gap-2.5">
                                        {filteredHistory.map(job => {
                                            const isSelected = selectedJob?.id === job.id;
                                            const salaryInfo = formatSalary(job);
                                            const relativeDate = formatRelativeDate(job.date_of_publi || job.created_at);
                                            const companyName = job.company?.name || 'Confidentiel';
                                            const logoUrl = job.company?.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4&bold=true`;

                                            return (
                                                <article 
                                                    key={job.id} 
                                                    onClick={() => handleSelectJob(job)} 
                                                    className={`rounded-xl p-3.5 flex flex-col justify-between border transition-all duration-150 group cursor-pointer relative ${
                                                        isSelected
                                                            ? 'border-primary ring-1 ring-primary bg-primary/[0.04] shadow-xs'
                                                            : 'border-outline-variant/60 hover:border-primary/60 bg-surface/90 hover:bg-surface-container-low hover:shadow-xs'
                                                    }`}
                                                >
                                                    {isSelected && (
                                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
                                                    )}

                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-outline-variant/60 flex items-center justify-center p-1 shadow-2xs flex-shrink-0">
                                                            <img className="w-full h-full object-contain" alt={companyName} src={logoUrl} />
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-xs md:text-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug truncate">
                                                                {job.title}
                                                            </h3>
                                                            <p className="text-[11px] font-semibold text-on-surface-variant mt-0.5 truncate">
                                                                {companyName} • {job.location || 'France'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="mt-2.5 pt-2 border-t border-outline-variant/40 flex items-center justify-between text-[10px]">
                                                        <span className={`font-semibold ${salaryInfo.isDisclosed ? 'text-emerald-600 dark:text-emerald-400' : 'text-on-surface-variant'}`}>
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
                                ) : (
                                    /* In Full View: Beautiful clean table */
                                    <div className="glass-panel rounded-2xl border border-outline-variant/60 overflow-hidden shadow-2xs">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="border-b border-outline-variant/60 bg-surface-container-low text-xs font-bold text-on-surface-variant">
                                                    <th className="py-3 px-4">Poste & Entreprise</th>
                                                    <th className="py-3 px-4 hidden sm:table-cell">Lieu & Type</th>
                                                    <th className="py-3 px-4 hidden md:table-cell">Rémunération</th>
                                                    <th className="py-3 px-4 text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-outline-variant/40 text-xs text-on-surface">
                                                {filteredHistory.map(job => {
                                                    const salaryInfo = formatSalary(job);
                                                    const companyName = job.company?.name || 'Confidentiel';
                                                    const logoUrl = job.company?.logo_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}&background=eaedff&color=4648d4&bold=true`;

                                                    return (
                                                        <tr 
                                                            key={job.id} 
                                                            onClick={() => handleSelectJob(job)} 
                                                            className="hover:bg-surface-variant/40 transition-colors cursor-pointer group"
                                                        >
                                                            <td className="py-3 px-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="w-8 h-8 rounded-lg bg-surface-container-highest border border-outline-variant/50 flex items-center justify-center p-1 flex-shrink-0">
                                                                        <img className="w-full h-full object-contain" alt={companyName} src={logoUrl} />
                                                                    </div>
                                                                    <div className="min-w-0">
                                                                        <span className="font-bold text-on-surface group-hover:text-primary transition-colors block truncate max-w-xs md:max-w-md">
                                                                            {job.title}
                                                                        </span>
                                                                        <span className="text-[11px] text-on-surface-variant">
                                                                            {companyName}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td className="py-3 px-4 hidden sm:table-cell text-on-surface-variant">
                                                                <div className="flex items-center gap-1.5">
                                                                    <span>{job.location || 'France'}</span>
                                                                    {job.contract_type && (
                                                                        <span className="px-1.5 py-0.5 rounded bg-surface-container font-semibold text-[10px] capitalize">
                                                                            {job.contract_type}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </td>

                                                            <td className="py-3 px-4 hidden md:table-cell">
                                                                <span className={`font-semibold ${salaryInfo.isDisclosed ? 'text-emerald-600 dark:text-emerald-400' : 'text-on-surface-variant'}`}>
                                                                    {salaryInfo.text}
                                                                </span>
                                                            </td>

                                                            <td className="py-3 px-4 text-right">
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleSelectJob(job);
                                                                    }}
                                                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary transition-all text-xs font-semibold text-on-surface"
                                                                >
                                                                    Consulter <span className="material-symbols-outlined text-xs">visibility</span>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Right Column: Full Detail Panel (Split view on Desktop) */}
                    {selectedJob && (
                        <main className="hidden lg:flex flex-1 min-w-0 h-full pb-4">
                            <JobDetailPanel 
                                job={selectedJob} 
                                onClose={() => setSelectedJob(null)}
                                isSaved={isJobFavorite(selectedJob.id)}
                            />
                        </main>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
