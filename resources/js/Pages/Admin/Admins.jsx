import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import PageHeader from '@/Components/Admin/PageHeader';

export default function Admins({ admins = [] }) {
    const { auth, flash } = usePage().props;
    const [email, setEmail] = useState('');
    const [processing, setProcessing] = useState(false);

    const handlePromote = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setProcessing(true);
        router.post(
            route('admin.admins.addExisting'),
            { email },
            {
                preserveScroll: true,
                onSuccess: () => setEmail(''),
                onFinish: () => setProcessing(false),
            }
        );
    };

    const handleRevoke = (id, name) => {
        if (confirm(`Révoquer les droits administrateur de "${name}" ?`)) {
            router.delete(route('admin.admins.revoke', id), { preserveScroll: true });
        }
    };

    return (
        <AdminLayout>
            <Head title="Administration - Administrateurs" />

            <div className="w-full space-y-5">
                <PageHeader
                    title="Gestion des administrateurs"
                    description="Promouvez des comptes existants ou révoquez les droits d'administration."
                />

                {flash?.error && (
                    <div className="rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-xs font-medium text-error">
                        {flash.error}
                    </div>
                )}
                {flash?.success && (
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        {flash.success}
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Formulaire de promotion */}
                    <div className="lg:col-span-4">
                        <section className="glass-panel rounded-xl p-6 shadow-2xs">
                            <h3 className="mb-1 text-base font-bold text-on-surface">Ajouter un administrateur</h3>
                            <p className="mb-4 text-xs text-on-surface-variant">
                                Saisissez l'adresse e-mail d'un utilisateur inscrit pour lui accorder le rôle administrateur.
                            </p>

                            <form onSubmit={handlePromote} className="space-y-4">
                                <div>
                                    <label htmlFor="admin-email" className="mb-1 block text-xs font-medium text-on-surface-variant">
                                        Adresse e-mail
                                    </label>
                                    <input
                                        id="admin-email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="utilisateur@exemple.fr"
                                        className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-sm text-on-surface placeholder:text-outline focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-xs font-semibold text-on-primary hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    <span>{processing ? 'Promotion...' : 'Promouvoir administrateur'}</span>
                                </button>
                            </form>
                        </section>
                    </div>

                    {/* Liste des administrateurs */}
                    <div className="lg:col-span-8">
                        <section className="glass-panel rounded-xl p-6 shadow-2xs">
                            <h3 className="mb-4 text-base font-bold text-on-surface">
                                Administrateurs actifs ({admins.length})
                            </h3>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                {admins.map((admin) => {
                                    const isSelf = auth?.user?.id === admin.id;
                                    return (
                                        <div
                                            key={admin.id}
                                            className="flex items-center justify-between gap-3 rounded-lg border border-outline-variant/50 bg-surface-container-low/50 p-4"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary border border-primary/20">
                                                    {admin.initials || admin.name.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-on-surface">
                                                        {admin.name} {isSelf && <span className="text-xs text-primary">(Vous)</span>}
                                                    </p>
                                                    <p className="truncate text-xs text-on-surface-variant">{admin.email}</p>
                                                    <p className="text-[11px] text-outline mt-0.5">Depuis le {admin.joined}</p>
                                                </div>
                                            </div>

                                            {!isSelf && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRevoke(admin.id, admin.name)}
                                                    className="shrink-0 rounded-lg border border-error/30 px-2.5 py-1 text-xs font-semibold text-error hover:bg-error/10 transition-colors"
                                                >
                                                    Révoquer
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
