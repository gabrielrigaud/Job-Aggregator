import React, { useState, useRef } from 'react';
import { Head, usePage, useForm } from '@inertiajs/react';
import { Lock, User } from 'lucide-react';
import MainLayout from '../Layouts/MainLayout';
import Modal from '../Components/Modal';
import DangerButton from '../Components/DangerButton';
import SecondaryButton from '../Components/SecondaryButton';
import TextInput from '../Components/TextInput';
import InputError from '../Components/InputError';
import InputLabel from '../Components/InputLabel';

export default function Settings() {
    const { auth } = usePage().props;
    const user = auth?.user || { name: '', email: '' };

    const [activeSection, setActiveSection] = useState('profile');
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data: profileData,
        setData: setProfileData,
        patch: patchProfile,
        errors: profileErrors,
        processing: profileProcessing,
        recentlySuccessful: profileSuccessful,
    } = useForm({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || '',
        job_title: user.job_title || '',
        linkedin_url: user.linkedin_url || '',
    });

    const submitProfile = (e) => {
        e.preventDefault();
        patchProfile(route('profile.update'), { preserveScroll: true });
    };

    const {
        data: passwordData,
        setData: setPasswordData,
        put: updatePassword,
        errors: passwordErrors,
        processing: passwordProcessing,
        recentlySuccessful: passwordSuccessful,
        reset: resetPasswordForm,
    } = useForm({
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
                if (errors.password) resetPasswordForm('password', 'password_confirmation');
                if (errors.current_password) resetPasswordForm('current_password');
            },
        });
    };

    const {
        data: deleteData,
        setData: setDeleteData,
        delete: destroyUser,
        processing: deleteProcessing,
        reset: resetDeleteForm,
        errors: deleteErrors,
        clearErrors: clearDeleteErrors,
    } = useForm({ password: '' });

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

    const inputClass =
        'w-full rounded-lg border border-outline-variant/60 bg-surface-container-low/80 px-3 py-2 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-colors';

    return (
        <MainLayout>
            <Head title="JobMind - Paramètres du compte" />

            <div className="pt-20 pb-12 px-4 md:px-8 max-w-[1560px] mx-auto w-full flex flex-col gap-6">
                {/* Onglets */}
                <header className="border-b border-outline-variant/60">
                    <nav aria-label="Navigation paramètres" className="flex items-center gap-6">
                        <button
                            type="button"
                            onClick={() => setActiveSection('profile')}
                            className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                                activeSection === 'profile'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            <User className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                            <span>Informations du profil</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveSection('account')}
                            className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                                activeSection === 'account'
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-on-surface-variant hover:text-on-surface'
                            }`}
                        >
                            <Lock className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                            <span>Sécurité du compte</span>
                        </button>
                    </nav>
                </header>

                {/* Contenu */}
                <div className="w-full">
                    {activeSection === 'profile' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            <form onSubmit={submitProfile} className="glass-panel rounded-xl p-5 md:p-6 shadow-2xs space-y-4 lg:col-span-8">
                            <div>
                                <h2 className="text-base font-bold text-on-surface">Informations du profil</h2>
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                    Renseignez votre poste et votre bio pour affiner le score de pertinence des offres.
                                </p>
                            </div>

                            {profileSuccessful && (
                                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                                    Profil mis à jour avec succès.
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="settings-name" className="text-xs font-medium text-on-surface-variant">
                                        Nom complet
                                    </label>
                                    <input
                                        id="settings-name"
                                        type="text"
                                        value={profileData.name}
                                        onChange={(e) => setProfileData('name', e.target.value)}
                                        className={inputClass}
                                    />
                                    {profileErrors.name && <span className="text-error text-xs">{profileErrors.name}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="settings-email" className="text-xs font-medium text-on-surface-variant">
                                        Adresse e-mail
                                    </label>
                                    <input
                                        id="settings-email"
                                        type="email"
                                        value={profileData.email}
                                        onChange={(e) => setProfileData('email', e.target.value)}
                                        className={inputClass}
                                    />
                                    {profileErrors.email && <span className="text-error text-xs">{profileErrors.email}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="settings-job-title" className="text-xs font-medium text-on-surface-variant">
                                        Poste recherché
                                    </label>
                                    <input
                                        id="settings-job-title"
                                        type="text"
                                        placeholder="Ex : Développeur Fullstack React / Laravel"
                                        value={profileData.job_title}
                                        onChange={(e) => setProfileData('job_title', e.target.value)}
                                        className={inputClass}
                                    />
                                    {profileErrors.job_title && <span className="text-error text-xs">{profileErrors.job_title}</span>}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="settings-linkedin" className="text-xs font-medium text-on-surface-variant">
                                        Profil LinkedIn
                                    </label>
                                    <input
                                        id="settings-linkedin"
                                        type="url"
                                        placeholder="https://linkedin.com/in/..."
                                        value={profileData.linkedin_url}
                                        onChange={(e) => setProfileData('linkedin_url', e.target.value)}
                                        className={inputClass}
                                    />
                                    {profileErrors.linkedin_url && <span className="text-error text-xs">{profileErrors.linkedin_url}</span>}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="settings-bio" className="text-xs font-medium text-on-surface-variant">
                                    Compétences & présentation
                                </label>
                                <textarea
                                    id="settings-bio"
                                    placeholder="Décrivez vos technologies principales (PHP, Python, Docker, React...)"
                                    value={profileData.bio}
                                    onChange={(e) => setProfileData('bio', e.target.value)}
                                    className={`${inputClass} min-h-[90px] resize-y`}
                                />
                                {profileErrors.bio && <span className="text-error text-xs">{profileErrors.bio}</span>}
                            </div>

                            <div className="pt-3 border-t border-outline-variant/50 flex justify-end">
                                <button
                                    disabled={profileProcessing}
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    {profileProcessing ? 'Enregistrement...' : 'Enregistrer le profil'}
                                </button>
                            </div>
                        </form>

                        <aside className="glass-panel rounded-xl p-5 shadow-2xs lg:col-span-4 space-y-4">
                            <div>
                                <h3 className="text-sm font-bold text-on-surface">Complétion du profil</h3>
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                    Un profil complet améliore le calcul de pertinence sur les offres.
                                </p>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs mb-1.5">
                                    <span className="text-on-surface-variant font-medium">Progression</span>
                                    <span className="text-primary font-bold">{user.profile_completion ?? 40}%</span>
                                </div>
                                <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                                    <div
                                        className="bg-primary h-full rounded-full transition-all duration-300"
                                        style={{ width: `${user.profile_completion ?? 40}%` }}
                                    ></div>
                                </div>
                            </div>
                            <ul className="space-y-1.5 text-xs text-on-surface-variant pt-2 border-t border-outline-variant/40">
                                <li className="flex items-center justify-between">
                                    <span>Poste recherché</span>
                                    <span className={profileData.job_title ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-outline'}>
                                        {profileData.job_title ? 'Renseigné' : 'À compléter'}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Profil LinkedIn</span>
                                    <span className={profileData.linkedin_url ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-outline'}>
                                        {profileData.linkedin_url ? 'Renseigné' : 'À compléter'}
                                    </span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span>Compétences & bio</span>
                                    <span className={profileData.bio ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-outline'}>
                                        {profileData.bio ? 'Renseigné' : 'À compléter'}
                                    </span>
                                </li>
                            </ul>
                        </aside>
                    </div>
                    )}

                    {activeSection === 'account' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            <form onSubmit={submitPassword} className="glass-panel rounded-xl p-5 md:p-6 shadow-2xs space-y-4 lg:col-span-7">
                                <div>
                                    <h2 className="text-base font-bold text-on-surface">Modifier le mot de passe</h2>
                                    <p className="text-xs text-on-surface-variant mt-0.5">
                                        Utilisez un mot de passe long et unique pour sécuriser votre compte.
                                    </p>
                                </div>

                                {passwordSuccessful && (
                                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                                        Mot de passe mis à jour.
                                    </div>
                                )}

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="current-password" className="text-xs font-medium text-on-surface-variant">
                                            Mot de passe actuel
                                        </label>
                                        <input
                                            id="current-password"
                                            type="password"
                                            value={passwordData.current_password}
                                            onChange={(e) => setPasswordData('current_password', e.target.value)}
                                            placeholder="••••••••"
                                            className={inputClass}
                                        />
                                        {passwordErrors.current_password && <span className="text-error text-xs">{passwordErrors.current_password}</span>}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="new-password" className="text-xs font-medium text-on-surface-variant">
                                            Nouveau mot de passe
                                        </label>
                                        <input
                                            id="new-password"
                                            type="password"
                                            value={passwordData.password}
                                            onChange={(e) => setPasswordData('password', e.target.value)}
                                            placeholder="••••••••"
                                            className={inputClass}
                                        />
                                        {passwordErrors.password && <span className="text-error text-xs">{passwordErrors.password}</span>}
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="confirm-password" className="text-xs font-medium text-on-surface-variant">
                                            Confirmer le mot de passe
                                        </label>
                                        <input
                                            id="confirm-password"
                                            type="password"
                                            value={passwordData.password_confirmation}
                                            onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                            placeholder="••••••••"
                                            className={inputClass}
                                        />
                                        {passwordErrors.password_confirmation && <span className="text-error text-xs">{passwordErrors.password_confirmation}</span>}
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-outline-variant/50 flex justify-end">
                                    <button
                                        disabled={passwordProcessing}
                                        type="submit"
                                        className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                                    >
                                        {passwordProcessing ? 'Enregistrement...' : 'Mettre à jour'}
                                    </button>
                                </div>
                            </form>

                            <section className="glass-panel rounded-xl p-5 md:p-6 shadow-2xs lg:col-span-5">
                                <h3 className="text-sm font-bold text-error mb-1">Zone de danger</h3>
                                <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
                                    La suppression de votre compte est définitive et efface toutes vos offres sauvegardées et votre historique.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => setConfirmingUserDeletion(true)}
                                    className="px-4 py-2 bg-error/10 border border-error/30 text-error text-xs rounded-lg font-semibold hover:bg-error/20 transition-colors"
                                >
                                    Supprimer mon compte
                                </button>
                            </section>

                            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                                <form onSubmit={deleteUser} className="p-6 bg-surface">
                                    <h2 className="text-base font-bold text-on-surface">
                                        Confirmer la suppression du compte
                                    </h2>
                                    <p className="mt-1 text-xs text-on-surface-variant">
                                        Saisissez votre mot de passe pour confirmer la suppression définitive de votre compte.
                                    </p>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="delete-password" value="Mot de passe" className="sr-only" />
                                        <TextInput
                                            id="delete-password"
                                            type="password"
                                            name="password"
                                            ref={passwordInput}
                                            value={deleteData.password}
                                            onChange={(e) => setDeleteData('password', e.target.value)}
                                            className="mt-1 block w-full"
                                            isFocused
                                            placeholder="Mot de passe"
                                        />
                                        <InputError message={deleteErrors.password} className="mt-2 text-error" />
                                    </div>

                                    <div className="mt-6 flex justify-end gap-2">
                                        <SecondaryButton onClick={closeModal}>Annuler</SecondaryButton>
                                        <DangerButton disabled={deleteProcessing}>Supprimer</DangerButton>
                                    </div>
                                </form>
                            </Modal>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
