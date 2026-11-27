import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout subtitle="Choisissez un nouveau mot de passe.">
            <Head title="JobMind - Nouveau mot de passe" />

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
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="flex flex-col gap-xs">
                    <label htmlFor="password" className="text-xs font-semibold text-on-surface">
                        Nouveau mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex flex-col gap-xs">
                    <label htmlFor="password_confirmation" className="text-xs font-semibold text-on-surface">
                        Confirmer le mot de passe
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                <div className="flex items-center justify-end mt-xs">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Enregistrement...' : 'Réinitialiser le mot de passe'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
