import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-md relative overflow-hidden font-body-md">
            <Head title="JobMind - Register" />

            {/* Background Glow */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full mix-blend-screen filter blur-[120px] opacity-70"></div>
                <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-secondary/15 rounded-full mix-blend-screen filter blur-[100px] opacity-60"></div>
            </div>

            <main className="w-full max-w-md z-10">
                {/* Brand Header */}
                <div className="text-center mb-xl">
                    <Link href="/">
                        <h1 className="font-display text-headline-md md:text-display text-primary mb-sm tracking-tight font-bold">JobMind</h1>
                    </Link>
                    <p className="font-body-md text-body-md text-on-surface-variant">Create your developer account.</p>
                </div>

                {/* Glassmorphic Card */}
                <div className="bg-surface-container/40 backdrop-blur-xl border border-outline-variant rounded-xl p-lg md:p-margin shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                    {/* Segmented Control Tabs */}
                    <div className="flex bg-surface-container-highest/60 p-xs rounded-lg mb-xl border border-outline-variant">
                        <Link 
                            href={route('login')}
                            className="flex-1 py-sm text-center rounded-md text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors"
                        >
                            Log In
                        </Link>
                        <Link 
                            href={route('register')}
                            className="flex-1 py-sm text-center rounded-md bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={submit} className="flex flex-col gap-md">
                        {/* Name Input */}
                        <div className="flex flex-col gap-xs">
                            <label className="font-label-md text-on-surface-variant text-xs" htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                className="bg-surface-container-highest/30 border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all text-sm"
                                placeholder="Alex Chen"
                                required
                            />
                            {errors.name && (
                                <p className="font-body-sm text-xs text-error mt-xs">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col gap-xs">
                            <label className="font-label-md text-on-surface-variant text-xs" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) => setData('email', e.target.value)}
                                className="bg-surface-container-highest/30 border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all text-sm"
                                placeholder="name@company.com"
                                required
                            />
                            {errors.email && (
                                <p className="font-body-sm text-xs text-error mt-xs">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col gap-xs">
                            <label className="font-label-md text-on-surface-variant text-xs" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) => setData('password', e.target.value)}
                                className="bg-surface-container-highest/30 border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all text-sm"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && (
                                <p className="font-body-sm text-xs text-error mt-xs">{errors.password}</p>
                            )}
                        </div>

                        {/* Password Confirmation Input */}
                        <div className="flex flex-col gap-xs">
                            <label className="font-label-md text-on-surface-variant text-xs" htmlFor="password_confirmation">Confirm Password</label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="bg-surface-container-highest/30 border border-outline-variant text-on-surface rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full transition-all text-sm"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password_confirmation && (
                                <p className="font-body-sm text-xs text-error mt-xs">{errors.password_confirmation}</p>
                            )}
                        </div>

                        {/* Primary Action Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-3 px-lg bg-primary text-on-primary rounded-lg font-label-md text-label-md mt-md flex justify-center items-center gap-xs hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(70,72,212,0.4)] disabled:opacity-50"
                        >
                            {processing ? 'Creating account...' : 'Sign Up'}
                            <span className="material-symbols-outlined text-[18px]">person_add</span>
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-md my-sm opacity-60">
                            <div className="h-px bg-outline-variant flex-1"></div>
                            <span className="font-label-md text-on-surface-variant uppercase text-xs">Or</span>
                            <div className="h-px bg-outline-variant flex-1"></div>
                        </div>

                        {/* Secondary SSO Button */}
                        <button
                            type="button"
                            className="w-full py-3 px-lg rounded-lg border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex justify-center items-center gap-sm"
                        >
                            <span className="material-symbols-outlined text-[20px]">code</span>
                            Continue with GitHub
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
