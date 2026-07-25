import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Saved() {
    const [activeTab, setActiveTab] = useState('favorites');

    return (
        <MainLayout>
            <Head title="JobMind - Saved Jobs" />
            
            <div className="flex-1 px-6 lg:px-8 pt-20 pb-16 max-w-[1440px] mx-auto w-full relative z-10">
                {/* Welcome Section */}
                <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-on-surface mb-1">Saved Opportunities</h1>
                        <p className="text-sm text-on-surface-variant">Review and manage your favorite jobs and application history.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-on-surface text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>download</span>
                            Export Resume
                        </button>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex border-b border-white/10 mb-6 gap-6">
                    <button 
                        className={`pb-2 text-sm font-medium flex items-center gap-1.5 ${activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant border-b-2 border-transparent hover:text-primary'}`}
                        onClick={() => setActiveTab('favorites')}
                    >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeTab === 'favorites' ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                        Favorites
                    </button>
                    <button 
                        className={`pb-2 text-sm font-medium flex items-center gap-1.5 ${activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant border-b-2 border-transparent hover:text-primary'}`}
                        onClick={() => setActiveTab('history')}
                    >
                        <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeTab === 'history' ? "'FILL' 1" : "'FILL' 0" }}>history</span>
                        History
                    </button>
                </div>

                {/* Favorites Content (Grid) */}
                {activeTab === 'favorites' && (
                    <section className="block">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                            {/* Job Card 1 */}
                            <article className="glass-panel rounded-xl p-lg flex flex-col gap-md group hover:bg-white/5 transition-colors relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-xs bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-on-surface hover:text-primary"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>open_in_new</span></button>
                                </div>
                                <div className="flex items-start gap-md">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 0" }}>code</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm text-on-surface mb-xs">Senior Frontend Engineer</h3>
                                        <p className="font-code-sm text-code-sm text-on-surface-variant">Stripe • Remote</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-xs mt-auto">
                                    <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-primary">React</span>
                                    <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-primary">TypeScript</span>
                                    <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-on-surface-variant">$160k - $210k</span>
                                </div>
                            </article>
                            
                            {/* Job Card 2 */}
                            <article className="glass-panel rounded-xl p-lg flex flex-col gap-md group hover:bg-white/5 transition-colors relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-xs bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-on-surface hover:text-primary"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>open_in_new</span></button>
                                </div>
                                <div className="flex items-start gap-md">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 0" }}>database</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm text-on-surface mb-xs">Backend Developer (Go)</h3>
                                        <p className="font-code-sm text-code-sm text-on-surface-variant">Vercel • San Francisco, CA</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-xs mt-auto">
                                    <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-primary">Go</span>
                                    <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-primary">Kubernetes</span>
                                    <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-on-surface-variant">$150k - $190k</span>
                                </div>
                            </article>

                            {/* Job Card 3 */}
                            <article className="glass-panel rounded-xl p-lg flex flex-col gap-md group hover:bg-white/5 transition-colors relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-xs bg-white/10 backdrop-blur-md border border-white/10 rounded-md text-on-surface hover:text-primary"><span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>open_in_new</span></button>
                                </div>
                                <div className="flex items-start gap-md">
                                    <div className="w-12 h-12 rounded-lg bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/10">
                                        <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 0" }}>architecture</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm text-on-surface mb-xs">Staff Software Engineer</h3>
                                        <p className="font-code-sm text-code-sm text-on-surface-variant">Netflix • Remote</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-xs mt-auto">
                                    <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-primary">Java</span>
                                    <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-primary">Microservices</span>
                                    <span className="px-xs py-xs rounded bg-white/5 backdrop-blur-sm border border-white/10 font-code-sm text-code-sm text-on-surface-variant">$200k - $280k</span>
                                </div>
                            </article>
                        </div>
                    </section>
                )}

                {/* History Content (Table) */}
                {activeTab === 'history' && (
                    <section className="block">
                        <div className="glass-panel rounded-xl overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 bg-white/5">
                                        <th className="p-md font-medium text-sm text-on-surface-variant font-medium">Job Title</th>
                                        <th className="p-md font-medium text-sm text-on-surface-variant font-medium">Company</th>
                                        <th className="p-md font-medium text-sm text-on-surface-variant font-medium">Viewed Date</th>
                                        <th className="p-md font-medium text-sm text-on-surface-variant font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="font-body-sm text-body-sm text-on-surface">
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-md font-medium text-primary">Full Stack Engineer</td>
                                        <td className="p-md">Supabase</td>
                                        <td className="p-md text-on-surface-variant font-code-sm">Oct 24, 2023</td>
                                        <td className="p-md">
                                            <span className="px-xs py-[2px] rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-primary font-code-sm text-[11px] uppercase tracking-wider">Applied</span>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="p-md font-medium text-primary">Frontend Developer</td>
                                        <td className="p-md">Linear</td>
                                        <td className="p-md text-on-surface-variant font-code-sm">Oct 22, 2023</td>
                                        <td className="p-md">
                                            <span className="px-xs py-[2px] rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-on-surface-variant font-code-sm text-[11px] uppercase tracking-wider">Viewed</span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-white/5 transition-colors">
                                        <td className="p-md font-medium text-primary">Platform Engineer</td>
                                        <td className="p-md">Cloudflare</td>
                                        <td className="p-md text-on-surface-variant font-code-sm">Oct 20, 2023</td>
                                        <td className="p-md">
                                            <span className="px-xs py-[2px] rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-on-surface-variant font-code-sm text-[11px] uppercase tracking-wider">Viewed</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </div>
        </MainLayout>
    );
}
