import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout subtitle="Vérification de votre adresse e-mail.">
            <Head title="JobMind - Vérification e-mail" />

            <p className="mb-md text-sm text-on-surface-variant leading-relaxed">
                Merci pour votre inscription ! Avant de commencer, veuillez vérifier votre adresse e-mail en cliquant sur le lien que nous venons de vous envoyer. Si vous n’avez rien reçu, nous pouvons vous en renvoyer un nouveau.
            </p>

            {status === 'verification-link-sent' && (
                <div className="mb-md p-sm bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                    Un nouveau lien de vérification vient d’être envoyé à votre adresse e-mail.
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col sm:flex-row items-center justify-between gap-sm mt-lg">
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary text-sm font-semibold transition-colors disabled:opacity-50"
                >
                    {processing ? 'Envoi...' : 'Renvoyer l’e-mail de vérification'}
                </button>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm text-on-surface-variant hover:text-on-surface underline transition-colors"
                >
                    Se déconnecter
                </Link>
            </form>
        </GuestLayout>
    );
}
