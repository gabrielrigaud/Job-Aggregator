import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-md relative overflow-hidden font-body-md">
            <Head title="JobMind - Connexion" />

            {/* Background Glow */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full mix-blend-screen filter blur-[120px] opacity-70"></div>
                <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-secondary/15 rounded-full mix-blend-screen filter blur-[100px] opacity-60"></div>
            </div>

            <main className="w-full max-w-lg z-10">
                {/* Brand Header */}
                <div className="text-center mb-xl">
                    <Link href="/">
                        <h1 className="font-display text-headline-md md:text-display text-primary mb-sm tracking-tight font-bold">JobMind</h1>
                    </Link>
                    <p className="font-body-md text-body-md text-on-surface-variant">Bon retour parmi nous.</p>
                </div>

                {/* Glassmorphic Card */}
                <div className="bg-surface-container/40 backdrop-blur-xl border border-outline-variant rounded-xl p-lg md:p-margin shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                    {/* Segmented Control Tabs */}
                    <nav aria-label="Navigation authentification" className="flex bg-surface-container-highest/60 p-xs rounded-lg mb-xl border border-outline-variant">
                        <Link 
                            href={route('login')}
                            aria-current="page"
                            className="flex-1 py-sm text-center rounded-md bg-primary text-on-primary font-medium text-sm font-bold shadow-sm transition-colors"
                        >
                            Connexion
                        </Link>
                        <Link 
                            href={route('register')}
                            className="flex-1 py-sm text-center rounded-md text-on-surface-variant hover:text-on-surface font-medium text-sm transition-colors"
                        >
                            Inscription
                        </Link>
                    </nav>

                    {status && (
                        <div className="mb-md p-sm bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-medium">
                            {status}
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={submit} className="flex flex-col gap-md">
                        {/* Email Input */}
                        <div className="flex flex-col gap-xs">
                            <label className="font-medium text-on-surface-variant text-xs" htmlFor="email">Adresse e-mail</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                className="bg-surface-container-highest/30 border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all text-sm"
                                placeholder="nom@entreprise.fr"
                                required
                            />
                            {errors.email && (
                                <p className="font-body-sm text-xs text-error mt-xs">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-xs">
                            <label className="font-medium text-on-surface-variant text-xs" htmlFor="password">Mot de passe</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                                className="bg-surface-container-highest/30 border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all text-sm"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && (
                                <p className="font-body-sm text-xs text-error mt-xs">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex justify-between items-center mt-xs">
                            <label className="flex items-center gap-xs cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="rounded border-outline-variant bg-surface-container-lowest text-primary focus:ring-primary"
                                />
                                <span className="font-body-sm text-xs text-on-surface-variant">Se souvenir de moi</span>
                            </label>
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="font-medium text-xs text-primary hover:underline transition-colors"
                                >
                                    Mot de passe oublié ?
                                </Link>
                            )}
                        </div>

                        {/* Primary Action Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-lg bg-primary text-on-primary rounded-lg font-medium text-sm mt-md flex justify-center items-center gap-xs hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(70,72,212,0.4)] disabled:opacity-50"
                        >
                            {processing ? 'Connexion...' : 'Se connecter'}
                            <span aria-hidden="true" className="material-symbols-outlined text-[18px]">login</span>
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
