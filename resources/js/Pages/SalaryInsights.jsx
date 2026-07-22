import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function SalaryInsights() {
    return (
        <MainLayout>
            <Head title="JobMind - Analytics & AI Insights" />
            
            <div className="flex-1 px-lg lg:px-xl pt-24 pb-32 max-w-[1440px] mx-auto w-full relative z-10">
                <header className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
                    <div>
                        <h2 className="font-headline-lg-mobile lg:font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface mb-xs">Analytics & AI Insights</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Real-time developer market intelligence and trends.</p>
                    </div>
                    <div className="hidden md:flex gap-sm">
                        <button className="px-md py-sm border border-white/20 text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-variant/30 backdrop-blur-sm transition-colors flex items-center gap-xs">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>download</span> Export Report
                        </button>
                    </div>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg pb-32">
                    {/* Map Widget */}
                    <div className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg col-span-1 lg:col-span-8 p-lg flex flex-col h-[500px]">
                        <div className="flex justify-between items-center mb-md">
                            <h3 className="font-headline-md text-headline-md text-on-surface">Global Job Density</h3>
                            <div className="flex gap-xs">
                                <span className="font-code-sm px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">Remote</span>
                                <span className="font-code-sm px-2 py-1 rounded bg-surface-container/50 border-white/10 text-on-surface-variant backdrop-blur-sm border">On-site</span>
                            </div>
                        </div>
                        <div className="flex-1 rounded-lg overflow-hidden relative border border-white/10 bg-surface-container-lowest/30">
                            <img alt="Job density map" className="w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeQ3IpprjkD8Y50snCbrghqXMaYsGWr3EVIlxDQyQg7Uu0L5RXGe2R_NJOV6JzpIEac_QZIaq77n5dVK-cF8axfLzXj8tlMs1FnZ7x3lDdO4IpHOBUKqhCEygLt335J2Q7YdeIIBwH8QkANjq4EnJsqa1nw_oUCkdm59kLTaQeL8DRKh3GueRistzkG3ZduLyMLUIN3Y8KcfNqWcZJVCKbjcs5256u8jqQhzHIoHGvog58Z8KyCo_cl9rk8zeZEr9RzVs7PoPj6KNn" />
                            {/* Faux Map Overlay Elements */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_#adc6ff] animate-pulse"></div>
                            <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-tertiary rounded-full shadow-[0_0_20px_#ffb786] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_#d0bcff] animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                    </div>
                    
                    {/* Side Stats Widget */}
                    <div className="col-span-1 lg:col-span-4 flex flex-col gap-lg">
                        <div className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-lg flex-1">
                            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs">Active Postings</h3>
                            <div className="font-display-lg text-display-lg text-primary mb-sm">14,239</div>
                            <div className="flex items-center text-tertiary gap-xs font-label-md text-label-md">
                                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>trending_up</span>
                                <span>+12.5% this week</span>
                            </div>
                        </div>
                        <div className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-lg flex-1">
                            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-xs">AI Predicted Demand</h3>
                            <div className="font-display-lg text-display-lg text-secondary mb-sm">High</div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm border-t border-white/10 pt-sm">Based on trending keywords in Rust and AI engineering.</p>
                        </div>
                    </div>
                    
                    {/* Bar Chart Widget */}
                    <div className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg col-span-1 lg:col-span-7 p-lg h-[400px] flex flex-col">
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Median Salary by Tech Specialty</h3>
                        <div className="flex-1 flex flex-col justify-around">
                            <div className="flex flex-col gap-xs">
                                <div className="flex justify-between items-center font-label-md text-on-surface-variant">
                                    <span>AI/ML</span>
                                    <span className="text-primary font-bold">$185k</span>
                                </div>
                                <div className="h-2 w-full bg-surface-container-highest/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: '95%' }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-xs">
                                <div className="flex justify-between items-center font-label-md text-on-surface-variant">
                                    <span>DevOps</span>
                                    <span className="text-primary font-bold">$165k</span>
                                </div>
                                <div className="h-2 w-full bg-surface-container-highest/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-xs">
                                <div className="flex justify-between items-center font-label-md text-on-surface-variant">
                                    <span>Backend</span>
                                    <span className="text-primary font-bold">$160k</span>
                                </div>
                                <div className="h-2 w-full bg-surface-container-highest/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: '82%' }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-xs">
                                <div className="flex justify-between items-center font-label-md text-on-surface-variant">
                                    <span>Mobile</span>
                                    <span className="text-primary font-bold">$150k</span>
                                </div>
                                <div className="h-2 w-full bg-surface-container-highest/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: '77%' }}></div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-xs">
                                <div className="flex justify-between items-center font-label-md text-on-surface-variant">
                                    <span>Frontend</span>
                                    <span className="text-primary font-bold">$145k</span>
                                </div>
                                <div className="h-2 w-full bg-surface-container-highest/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-secondary to-primary rounded-full" style={{ width: '74%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Top Hiring Companies Widget */}
                    <div className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg col-span-1 p-lg h-[400px] flex flex-col lg:col-span-5">
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Top Hiring Companies</h3>
                        <div className="flex-1 flex flex-col gap-md overflow-y-auto">
                            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-variant/30 transition-colors">
                                <span className="font-label-md text-on-surface">Google</span>
                                <span className="font-code-sm px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">124 jobs</span>
                            </div>
                            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-variant/30 transition-colors">
                                <span className="font-label-md text-on-surface">Amazon</span>
                                <span className="font-code-sm px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">98 jobs</span>
                            </div>
                            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-variant/30 transition-colors">
                                <span className="font-label-md text-on-surface">Microsoft</span>
                                <span className="font-code-sm px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">82 jobs</span>
                            </div>
                            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-variant/30 transition-colors">
                                <span className="font-label-md text-on-surface">Meta</span>
                                <span className="font-code-sm px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">65 jobs</span>
                            </div>
                            <div className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-variant/30 transition-colors">
                                <span className="font-label-md text-on-surface">Apple</span>
                                <span className="font-code-sm px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">54 jobs</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* WordCloud Widget (Donut Chart actually) */}
                    <div className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg col-span-1 p-lg h-[400px] flex flex-col lg:col-span-12">
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Remote vs On-site Distribution</h3>
                        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-lg">
                            {/* Donut Chart SVG */}
                            <div className="relative w-48 h-48">
                                <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="15.915" fill="transparent" className="stroke-outline" strokeWidth="4" strokeDasharray="25 75" strokeDashoffset="0"></circle>
                                    <circle cx="18" cy="18" r="15.915" fill="transparent" className="stroke-secondary" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-25"></circle>
                                    <circle cx="18" cy="18" r="15.915" fill="transparent" className="stroke-primary" strokeWidth="4" strokeDasharray="45 55" strokeDashoffset="-55"></circle>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-headline-md font-bold text-on-surface">100%</span>
                                    <span className="text-label-md text-on-surface-variant">Total</span>
                                </div>
                            </div>
                            {/* Vertical Legend */}
                            <div className="flex flex-col gap-md">
                                <div className="flex items-center gap-sm">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-on-surface">Remote</span>
                                        <span className="font-code-sm text-primary">45%</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-sm">
                                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-on-surface">Hybrid</span>
                                        <span className="font-code-sm text-secondary">30%</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-sm">
                                    <div className="w-3 h-3 rounded-full bg-outline"></div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-on-surface">On-site</span>
                                        <span className="font-code-sm text-outline">25%</span>
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
