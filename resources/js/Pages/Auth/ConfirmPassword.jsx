import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout subtitle="Confirmation de sécurité requise.">
            <Head title="JobMind - Confirmer le mot de passe" />

            <p className="mb-md text-sm text-on-surface-variant leading-relaxed">
                Cette zone est sécurisée. Veuillez confirmer votre mot de passe avant de continuer.
            </p>

            <form onSubmit={submit} className="flex flex-col gap-md">
                <div className="flex flex-col gap-xs">
                    <label htmlFor="password" className="text-xs font-semibold text-on-surface">
                        Mot de passe
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoFocus
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full rounded-lg border border-outline-variant bg-surface px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div className="flex items-center justify-end mt-xs">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-on-primary text-sm font-semibold transition-colors disabled:opacity-50"
                    >
                        {processing ? 'Vérification...' : 'Confirmer'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
