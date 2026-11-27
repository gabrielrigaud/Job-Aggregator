import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import FranceMap from '../Components/FranceMap';

export default function SalaryInsights({
    totalJobs = 0,
    remotePercent = 0,
    hybridPercent = 0,
    onSitePercent = 0,
    topCompanies = [],
    specialties = [],
    locations = [],
    topSkills = []
}) {
    // Determine max salary for proportional bar widths
    const maxSalary = specialties.length > 0 ? Math.max(...specialties.map(s => s.salary || 50)) : 60;
    const leadingSkill = topSkills.length > 0 ? topSkills[0] : null;

    return (
        <MainLayout>
            <Head title="JobMind - Marché & Salaires" />
            
            <div className="flex-1 px-4 md:px-8 pt-20 pb-14 max-w-[1440px] mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12">
                    {/* Map Widget */}
                    <div className="glass-panel rounded-xl shadow-2xs col-span-1 lg:col-span-8 p-4 md:p-5 flex flex-col min-h-[360px] lg:min-h-[460px]">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h3 className="text-sm md:text-base font-bold text-on-surface">Densité Géographique des Offres</h3>
                                <p className="text-xs text-on-surface-variant">Survolez une région pour voir les opportunités et salaires moyens</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                                    {locations.length > 0 ? `${locations.length} villes` : 'France'}
                                </span>
                            </div>
                        </div>

                        {/* Interactive France Vector Map */}
                        <div className="flex-1 rounded-lg overflow-hidden relative border border-outline-variant/50 bg-surface-container-low/40 flex items-center justify-center p-2">
                            <FranceMap locations={locations} />
                        </div>
                    </div>
                    
                    {/* Side Stats Widget */}
                    <div className="col-span-1 lg:col-span-4 flex flex-col gap-4">
                        <div className="glass-panel rounded-xl shadow-2xs p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Offres Actives en Base</h3>
                                <div className="text-3xl md:text-4xl font-extrabold text-primary my-1 tracking-tight">
                                    {totalJobs.toLocaleString('fr-FR')}
                                </div>
                            </div>
                            <div className="flex items-center text-emerald-600 dark:text-emerald-400 gap-1.5 text-xs font-bold mt-3 pt-3 border-t border-outline-variant/40">
                                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">trending_up</span>
                                <span>Opportunités tech vérifiées et indexées</span>
                            </div>
                        </div>

                        <div className="glass-panel rounded-xl shadow-2xs p-5 flex-1">
                            <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1">Compétences les plus demandées</h3>
                            <div className="text-xl md:text-2xl font-extrabold text-primary mb-1">
                                {leadingSkill ? `${leadingSkill.name} (${leadingSkill.count} offres)` : 'Analyse du marché'}
                            </div>
                            <p className="text-xs text-on-surface-variant mt-2 border-t border-outline-variant/40 pt-2 mb-3">
                                Technologies extraites en direct des {totalJobs} offres indexées.
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {topSkills.length > 0 ? (
                                    topSkills.map(skill => (
                                        <Link
                                            key={skill.name}
                                            href={`/?search=${encodeURIComponent(skill.name.split(' / ')[0])}`}
                                            className="px-2.5 py-1 bg-surface-container rounded-lg text-xs text-on-surface hover:text-primary hover:border-primary/40 border border-outline-variant/50 transition-colors font-medium inline-flex items-center gap-1.5"
                                        >
                                            <span>{skill.name}</span>
                                            <span className="text-[10px] font-bold text-primary">{skill.count}</span>
                                        </Link>
                                    ))
                                ) : (
                                    <span className="text-xs text-on-surface-variant">Aucune compétence extraite pour le moment.</span>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Bar Chart Widget */}
                    <div className="glass-panel rounded-xl shadow-2xs col-span-1 lg:col-span-7 p-5 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm md:text-base font-bold text-on-surface">Salaire Médian par Spécialité Tech</h3>
                            <span className="text-xs text-on-surface-variant font-medium">Estimations brutes annuelles</span>
                        </div>
                        <div className="flex-1 flex flex-col justify-around gap-3.5">
                            {specialties.map((spec) => {
                                const barWidth = spec.salary > 0 ? Math.min(100, Math.max(12, Math.round((spec.salary / maxSalary) * 100))) : 0;
                                return (
                                    <div key={spec.role} className="flex flex-col gap-1">
                                        <div className="flex justify-between items-center text-xs font-semibold text-on-surface-variant">
                                            <span className="text-on-surface flex items-center gap-1.5">
                                                {spec.role}
                                                {spec.count > 0 && (
                                                    <span className="text-[10px] text-on-surface-variant font-normal">({spec.count} offres)</span>
                                                )}
                                            </span>
                                            <span className="text-primary font-bold">
                                                {spec.salary > 0 ? `${spec.salary}k €` : 'N/D'}
                                            </span>
                                        </div>
                                        <div className="h-2.5 w-full bg-surface-container rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-primary rounded-full transition-all duration-700"
                                                style={{ width: `${barWidth}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    
                    {/* Top Hiring Companies Widget */}
                    <div className="glass-panel rounded-xl shadow-2xs col-span-1 lg:col-span-5 p-5 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm md:text-base font-bold text-on-surface">Top Entreprises Qui Recrutent</h3>
                            <span className="text-xs text-on-surface-variant font-medium">Offres actives</span>
                        </div>
                        <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
                            {topCompanies.length > 0 ? (
                                topCompanies.map((company, index) => (
                                    <div 
                                        key={company.name + index} 
                                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-variant/30 border border-outline-variant/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-7 h-7 rounded-md bg-surface-container-highest flex items-center justify-center text-xs font-bold text-primary shrink-0 overflow-hidden border border-outline-variant/40">
                                                {company.logo_url ? (
                                                    <img src={company.logo_url} alt={company.name} className="w-full h-full object-contain" />
                                                ) : (
                                                    <span>{company.name.charAt(0).toUpperCase()}</span>
                                                )}
                                            </div>
                                            <span className="font-semibold text-xs text-on-surface truncate max-w-[180px]">
                                                {company.name}
                                            </span>
                                        </div>
                                        <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 shrink-0">
                                            {company.count} {company.count > 1 ? 'postes' : 'poste'}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-xs text-on-surface-variant">
                                    Aucune entreprise indexée pour le moment.
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Donut Chart Widget */}
                    <div className="glass-panel rounded-xl shadow-2xs col-span-1 lg:col-span-12 p-5 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm md:text-base font-bold text-on-surface">Répartition Télétravail vs Présentiel</h3>
                            <span className="text-xs text-on-surface-variant font-medium">Sur l'ensemble des opportunités indexées</span>
                        </div>
                        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 py-2">
                            {/* Donut Chart SVG */}
                            <div className="relative w-40 h-40">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    {/* Circle 1: Sur site */}
                                    <circle 
                                        cx="18" 
                                        cy="18" 
                                        r="15.915" 
                                        fill="transparent" 
                                        className="stroke-outline/40" 
                                        strokeWidth="3.5" 
                                        strokeDasharray={`${onSitePercent} ${100 - onSitePercent}`} 
                                        strokeDashoffset="0"
                                    ></circle>
                                    {/* Circle 2: Hybride */}
                                    <circle 
                                        cx="18" 
                                        cy="18" 
                                        r="15.915" 
                                        fill="transparent" 
                                        className="stroke-secondary" 
                                        strokeWidth="3.5" 
                                        strokeDasharray={`${hybridPercent} ${100 - hybridPercent}`} 
                                        strokeDashoffset={`-${onSitePercent}`}
                                    ></circle>
                                    {/* Circle 3: Full Remote */}
                                    <circle 
                                        cx="18" 
                                        cy="18" 
                                        r="15.915" 
                                        fill="transparent" 
                                        className="stroke-primary" 
                                        strokeWidth="3.5" 
                                        strokeDasharray={`${remotePercent} ${100 - remotePercent}`} 
                                        strokeDashoffset={`-${onSitePercent + hybridPercent}`}
                                    ></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-lg font-extrabold text-on-surface">{totalJobs > 0 ? totalJobs : '100%'}</span>
                                    <span className="text-[10px] text-on-surface-variant font-semibold">Offres</span>
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="flex flex-wrap md:flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-3.5 h-3.5 rounded-full bg-primary shrink-0 shadow-xs"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-on-surface">Télétravail complet</span>
                                        <span className="text-xs font-bold text-primary">{remotePercent}% des postes</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3.5 h-3.5 rounded-full bg-secondary shrink-0 shadow-xs"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-on-surface">Hybride (1 à 3j remote)</span>
                                        <span className="text-xs font-bold text-secondary">{hybridPercent}% des postes</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3.5 h-3.5 rounded-full bg-outline/60 shrink-0 shadow-xs"></div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-on-surface">Sur site / Présentiel</span>
                                        <span className="text-xs font-bold text-on-surface-variant">{onSitePercent}% des postes</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

