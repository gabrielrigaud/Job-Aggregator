import React, { useState, useRef } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import MainLayout from '../Layouts/MainLayout';
import Modal from '../Components/Modal';
import DangerButton from '../Components/DangerButton';
import SecondaryButton from '../Components/SecondaryButton';
import TextInput from '../Components/TextInput';
import InputError from '../Components/InputError';
import InputLabel from '../Components/InputLabel';

export default function Settings() {
    const { auth } = usePage().props;
    const user = auth?.user || { name: 'Alex Chen', email: 'alex.chen@example.com' };

    const [activeSection, setActiveSection] = useState('profile');
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    // Profile Form
    const { data: profileData, setData: setProfileData, patch: patchProfile, errors: profileErrors, processing: profileProcessing, recentlySuccessful: profileSuccessful } = useForm({
        name: user.name || '',
        email: user.email || '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        patchProfile(route('profile.update'), {
            preserveScroll: true,
        });
    };

    // Password Form
    const { data: passwordData, setData: setPasswordData, put: updatePassword, errors: passwordErrors, processing: passwordProcessing, recentlySuccessful: passwordSuccessful, reset: resetPasswordForm } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitPassword = (e) => {
        e.preventDefault();
        updatePassword(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => resetPasswordForm(),
            onError: (errors) => {
                if (errors.password) {
                    resetPasswordForm('password', 'password_confirmation');
                }
                if (errors.current_password) {
                    resetPasswordForm('current_password');
                }
            },
        });
    };

    // Delete User Form
    const {
        data: deleteData,
        setData: setDeleteData,
        delete: destroyUser,
        processing: deleteProcessing,
        reset: resetDeleteForm,
        errors: deleteErrors,
        clearErrors: clearDeleteErrors
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroyUser(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => resetDeleteForm(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearDeleteErrors();
        resetDeleteForm();
    };

    return (
        <MainLayout>
            <Head title="JobMind - Settings" />
            
            <div className="flex-1 px-6 lg:px-8 pt-20 pb-16 max-w-[1440px] mx-auto w-full relative z-10">
                <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-on-surface mb-1">Settings</h2>
                        <p className="text-sm text-on-surface-variant">Manage your account preferences and profile details.</p>
                    </div>
                </header>
                
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Settings Navigation Menu (Desktop) */}
                    <aside className="w-full lg:w-56 flex-shrink-0 bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg overflow-hidden">
                        <nav className="flex flex-row lg:flex-col overflow-x-auto p-1.5 gap-1">
                            <button 
                                onClick={() => setActiveSection('profile')}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors whitespace-nowrap ${activeSection === 'profile' ? 'bg-white/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeSection === 'profile' ? "'FILL' 1" : "'FILL' 0" }}>person</span>
                                Profile Info
                            </button>
                            <button 
                                onClick={() => setActiveSection('account')}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors whitespace-nowrap ${activeSection === 'account' ? 'bg-white/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeSection === 'account' ? "'FILL' 1" : "'FILL' 0" }}>lock</span>
                                Account Security
                            </button>
                            <button 
                                onClick={() => setActiveSection('notifications')}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-left transition-colors whitespace-nowrap ${activeSection === 'notifications' ? 'bg-white/10 text-primary font-semibold' : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: activeSection === 'notifications' ? "'FILL' 1" : "'FILL' 0" }}>notifications</span>
                                Notifications
                            </button>
                        </nav>
                    </aside>

                    {/* Settings Content Panels */}
                    <div className="flex-1 flex flex-col gap-6 w-full max-w-2xl">
                        {/* Profile Section */}
                        {activeSection === 'profile' && (
                            <form onSubmit={submitProfile} className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-5 md:p-6 animate-in fade-in duration-300">
                                <h3 className="text-lg font-semibold text-on-surface mb-1">Profile Information</h3>
                                <p className="text-xs text-on-surface-variant mb-4">Update your account's profile name and email address.</p>
                                
                                {profileSuccessful && (
                                    <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-medium">
                                        Profile updated successfully!
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-medium text-on-surface-variant">Full Name</label>
                                        <input 
                                            type="text" 
                                            value={profileData.name} 
                                            onChange={e => setProfileData('name', e.target.value)} 
                                            className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" 
                                        />
                                        {profileErrors.name && <span className="text-error text-xs font-medium">{profileErrors.name}</span>}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-medium text-on-surface-variant">Email Address</label>
                                        <input 
                                            type="email" 
                                            value={profileData.email} 
                                            onChange={e => setProfileData('email', e.target.value)} 
                                            className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" 
                                        />
                                        {profileErrors.email && <span className="text-error text-xs font-medium">{profileErrors.email}</span>}
                                    </div>
                                </div>
                                <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                                    <button 
                                        disabled={profileProcessing}
                                        type="submit"
                                        className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)] disabled:opacity-50"
                                    >
                                        {profileProcessing ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </div>
                            </form>
                        )}

                        {/* Account Section */}
                        {activeSection === 'account' && (
                            <section className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-5 md:p-6 animate-in fade-in duration-300">
                                <form onSubmit={submitPassword}>
                                    <h3 className="text-lg font-semibold text-on-surface mb-1">Update Password</h3>
                                    <p className="text-xs text-on-surface-variant mb-4">Ensure your account is using a long, random password to stay secure.</p>
                                    
                                    {passwordSuccessful && (
                                        <div className="mb-4 p-3 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-medium">
                                            Password updated successfully!
                                        </div>
                                    )}
                                    
                                    <div className="grid grid-cols-1 gap-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-medium text-on-surface-variant">Current Password</label>
                                            <input 
                                                type="password" 
                                                value={passwordData.current_password}
                                                onChange={e => setPasswordData('current_password', e.target.value)}
                                                placeholder="••••••••" 
                                                className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" 
                                            />
                                            {passwordErrors.current_password && <span className="text-error text-xs font-medium">{passwordErrors.current_password}</span>}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-medium text-on-surface-variant">New Password</label>
                                            <input 
                                                type="password" 
                                                value={passwordData.password}
                                                onChange={e => setPasswordData('password', e.target.value)}
                                                placeholder="••••••••" 
                                                className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" 
                                            />
                                            {passwordErrors.password && <span className="text-error text-xs font-medium">{passwordErrors.password}</span>}
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-medium text-on-surface-variant">Confirm Password</label>
                                            <input 
                                                type="password" 
                                                value={passwordData.password_confirmation}
                                                onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                                placeholder="••••••••" 
                                                className="bg-surface-container-highest/30 border border-white/10 text-on-surface rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all" 
                                            />
                                            {passwordErrors.password_confirmation && <span className="text-error text-xs font-medium">{passwordErrors.password_confirmation}</span>}
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                                        <button 
                                            disabled={passwordProcessing}
                                            type="submit"
                                            className="px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(173,198,255,0.3)] disabled:opacity-50"
                                        >
                                            {passwordProcessing ? 'Saving...' : 'Save Password'}
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-8 pt-4 border-t border-white/10">
                                    <h4 className="text-xs font-semibold text-error mb-2">Danger Zone</h4>
                                    <p className="text-xs text-on-surface-variant mb-4">Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.</p>
                                    <button 
                                        onClick={confirmUserDeletion}
                                        className="px-4 py-2 bg-error/10 border border-error/30 text-error text-sm rounded-lg font-medium hover:bg-error/20 transition-colors"
                                    >
                                        Delete Account
                                    </button>
                                </div>

                                <Modal show={confirmingUserDeletion} onClose={closeModal}>
                                    <form onSubmit={deleteUser} className="p-6 bg-surface-container-highest">
                                        <h2 className="text-lg font-medium text-on-surface">
                                            Are you sure you want to delete your account?
                                        </h2>

                                        <p className="mt-1 text-sm text-on-surface-variant">
                                            Once your account is deleted, all of its resources and data will be permanently deleted. Please
                                            enter your password to confirm you would like to permanently delete your account.
                                        </p>

                                        <div className="mt-6">
                                            <InputLabel htmlFor="password" value="Password" className="sr-only" />
                                            <TextInput
                                                id="password"
                                                type="password"
                                                name="password"
                                                ref={passwordInput}
                                                value={deleteData.password}
                                                onChange={(e) => setDeleteData('password', e.target.value)}
                                                className="mt-1 block w-full bg-surface-container/50 text-on-surface border-white/10 focus:border-error focus:ring-error"
                                                isFocused
                                                placeholder="Password"
                                            />
                                            <InputError message={deleteErrors.password} className="mt-2 text-error" />
                                        </div>

                                        <div className="mt-6 flex justify-end">
                                            <SecondaryButton onClick={closeModal} className="bg-surface-variant text-on-surface hover:bg-surface-variant/80 border-none">
                                                Cancel
                                            </SecondaryButton>

                                            <DangerButton className="ms-3 bg-error text-on-error hover:bg-error/90" disabled={deleteProcessing}>
                                                Delete Account
                                            </DangerButton>
                                        </div>
                                    </form>
                                </Modal>
                            </section>
                        )}

                        {/* Notifications Section */}
                        {activeSection === 'notifications' && (
                            <section className="bg-surface-container/40 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg p-5 md:p-6 animate-in fade-in duration-300">
                                <h3 className="text-lg font-semibold text-on-surface mb-1">Notifications</h3>
                                <p className="text-xs text-on-surface-variant mb-4">Control what emails and alerts you receive.</p>
                                
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                                        <div>
                                            <h4 className="text-sm font-medium text-on-surface">Job Alerts</h4>
                                            <p className="text-xs text-on-surface-variant">Get notified when new jobs match your skills.</p>
                                        </div>
                                        <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer border border-white/20 mt-1 flex-shrink-0">
                                            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-background rounded-full shadow"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                                        <div>
                                            <h4 className="text-sm font-medium text-on-surface">Application Updates</h4>
                                            <p className="text-xs text-on-surface-variant">Receive emails about your application statuses.</p>
                                        </div>
                                        <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer border border-white/20 mt-1 flex-shrink-0">
                                            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-background rounded-full shadow"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-on-surface">Marketing & News</h4>
                                            <p className="text-xs text-on-surface-variant">Receive product updates and newsletters.</p>
                                        </div>
                                        <div className="w-10 h-5 bg-surface-container-highest rounded-full relative cursor-pointer border border-white/10 mt-1 flex-shrink-0">
                                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-on-surface-variant rounded-full shadow"></div>
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
