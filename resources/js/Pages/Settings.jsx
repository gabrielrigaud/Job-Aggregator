import React, { useState } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';

export default function Settings() {
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Alex Chen', email: 'alex.chen@example.com' };

    const [activeSection, setActiveSection] = useState('profile');

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <MainLayout>
            <Head title="JobMind - Settings" />
            
            <div className="flex-1 px-lg lg:px-xl pt-24 pb-32 max-w-[1440px] mx-auto w-full relative z-10">
                <header className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
                    <div>
                        <h2 className="font-headline-lg-mobile lg:font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface mb-xs">Settings</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Manage your account preferences and profile details.</p>
                    </div>
                    <div className="flex gap-sm">
                        <button 
                            onClick={submitProfile}
                            disabled={processing}
                            className="px-md py-sm bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-colors flex items-center gap-xs shadow-[0_0_15px_rgba(173,198,255,0.3)] disabled:opacity-50"
                        >
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>save</span>
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </header>
                
                {recentlySuccessful && (
                    <div className="mb-lg p-md bg-primary/10 border border-primary/30 rounded-xl text-primary font-label-md">
                        Settings saved successfully!
                    </div>
                )}
                
                <div className="flex flex-col lg:flex-row gap-lg items-start">
                    {/* Settings Navigation Menu (Desktop) */}
                    <aside className="w-full lg:w-64 flex-shrink-0 bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg overflow-hidden">
                        <nav className="flex flex-row lg:flex-col overflow-x-auto">
                            <button 
                                onClick={() => setActiveSection('profile')}
                                className={`flex items-center gap-md px-md py-4 text-left transition-colors whitespace-nowrap ${activeSection === 'profile' ? 'bg-white/5 border-l-2 lg:border-l-4 border-primary text-primary font-medium' : 'text-on-surface-variant border-l-2 lg:border-l-4 border-transparent hover:bg-white/5 hover:text-on-surface'}`}
                            >
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: activeSection === 'profile' ? "'FILL' 1" : "'FILL' 0" }}>person</span>
                                Profile Info
                            </button>
                            <button 
                                onClick={() => setActiveSection('account')}
                                className={`flex items-center gap-md px-md py-4 text-left transition-colors whitespace-nowrap ${activeSection === 'account' ? 'bg-white/5 border-l-2 lg:border-l-4 border-primary text-primary font-medium' : 'text-on-surface-variant border-l-2 lg:border-l-4 border-transparent hover:bg-white/5 hover:text-on-surface'}`}
                            >
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: activeSection === 'account' ? "'FILL' 1" : "'FILL' 0" }}>lock</span>
                                Account Security
                            </button>
                            <button 
                                onClick={() => setActiveSection('notifications')}
                                className={`flex items-center gap-md px-md py-4 text-left transition-colors whitespace-nowrap ${activeSection === 'notifications' ? 'bg-white/5 border-l-2 lg:border-l-4 border-primary text-primary font-medium' : 'text-on-surface-variant border-l-2 lg:border-l-4 border-transparent hover:bg-white/5 hover:text-on-surface'}`}
                            >
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: activeSection === 'notifications' ? "'FILL' 1" : "'FILL' 0" }}>notifications</span>
                                Notifications
                            </button>
                        </nav>
                    </aside>

                    {/* Settings Content Panels */}
                    <div className="flex-1 flex flex-col gap-lg w-full">
                        {/* Profile Section */}
                        {activeSection === 'profile' && (
                            <form onSubmit={submitProfile} className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-lg md:p-xl animate-in fade-in duration-300">
                                <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Profile Information</h3>
                                <p className="font-body-sm text-on-surface-variant mb-lg">Update your account's profile name and email address.</p>
                                
                                <div className="grid grid-cols-1 gap-md">
                                    <div className="flex flex-col gap-xs">
                                        <label className="font-label-md text-on-surface-variant">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={data.name} 
                                            onChange={e => setData('name', e.target.value)} 
                                            className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" 
                                        />
                                        {errors.name && <span className="text-error text-xs font-label-md">{errors.name}</span>}
                                    </div>
                                    <div className="flex flex-col gap-xs">
                                        <label className="font-label-md text-on-surface-variant">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={data.email} 
                                            onChange={e => setData('email', e.target.value)} 
                                            className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" 
                                        />
                                        {errors.email && <span className="text-error text-xs font-label-md">{errors.email}</span>}
                                    </div>
                                </div>
                            </form>
                        )}

                        {/* Account Section */}
                        {activeSection === 'account' && (
                            <section className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-lg md:p-xl animate-in fade-in duration-300">
                                <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Account Security</h3>
                                <p className="font-body-sm text-on-surface-variant mb-lg">Ensure your account is using a long, random password to stay secure.</p>
                                
                                <div className="grid grid-cols-1 gap-md">
                                    <div className="flex flex-col gap-xs">
                                        <label className="font-label-md text-on-surface-variant">Email Address</label>
                                        <input type="email" defaultValue="alex.chen@example.com" className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-xs">
                                        <label className="font-label-md text-on-surface-variant">Current Password</label>
                                        <input type="password" placeholder="••••••••" className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-xs">
                                        <label className="font-label-md text-on-surface-variant">New Password</label>
                                        <input type="password" placeholder="••••••••" className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" />
                                    </div>
                                </div>

                                <div className="mt-xl pt-lg border-t border-white/10">
                                    <h4 className="font-label-md text-error mb-sm">Danger Zone</h4>
                                    <button className="px-md py-sm bg-error/10 border border-error/30 text-error rounded-lg font-label-md hover:bg-error/20 transition-colors">
                                        Delete Account
                                    </button>
                                </div>
                            </section>
                        )}

                        {/* Notifications Section */}
                        {activeSection === 'notifications' && (
                            <section className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-lg md:p-xl animate-in fade-in duration-300">
                                <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Notifications</h3>
                                <p className="font-body-sm text-on-surface-variant mb-lg">Control what emails and alerts you receive.</p>
                                
                                <div className="flex flex-col gap-lg">
                                    <div className="flex items-start justify-between gap-md border-b border-white/5 pb-md">
                                        <div>
                                            <h4 className="font-label-md text-on-surface">Job Alerts</h4>
                                            <p className="font-body-sm text-on-surface-variant">Get notified when new jobs match your skills.</p>
                                        </div>
                                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer border border-white/20 mt-1 flex-shrink-0">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-background rounded-full shadow"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between gap-md border-b border-white/5 pb-md">
                                        <div>
                                            <h4 className="font-label-md text-on-surface">Application Updates</h4>
                                            <p className="font-body-sm text-on-surface-variant">Receive emails about your application statuses.</p>
                                        </div>
                                        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer border border-white/20 mt-1 flex-shrink-0">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-background rounded-full shadow"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between gap-md">
                                        <div>
                                            <h4 className="font-label-md text-on-surface">Marketing & News</h4>
                                            <p className="font-body-sm text-on-surface-variant">Receive product updates and newsletters.</p>
                                        </div>
                                        <div className="w-12 h-6 bg-surface-container-highest rounded-full relative cursor-pointer border border-white/10 mt-1 flex-shrink-0">
                                            <div className="absolute left-1 top-1 w-4 h-4 bg-on-surface-variant rounded-full shadow"></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
