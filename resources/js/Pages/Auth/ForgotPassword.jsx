import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout subtitle="Réinitialisez votre mot de passe.">
            <Head title="JobMind - Mot de passe oublié" />

            <p className="mb-md text-sm text-on-surface-variant leading-relaxed">
                Mot de passe oublié ? Indiquez votre adresse e-mail et nous vous enverrons un lien pour en choisir un nouveau.
            </p>

            {status && (
                <div className="mb-md p-sm bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-md">
                <div className="flex flex-col gap-xs">
                    <label htmlFor="email" className="text-xs font-semibold text-on-surface">
                        Adresse e-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="email"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="vous@exemple.com"
                        required
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="flex items-center justify-between gap-sm mt-xs">
                    <Link
                        href={route('login')}
                        className="text-sm text-on-surface-variant hover:text-on-surface underline transition-colors"
                    >
                        Retour à la connexion
                    </Link>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Envoi...' : 'Envoyer le lien'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
