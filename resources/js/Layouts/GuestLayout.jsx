import { Link } from '@inertiajs/react';

export default function GuestLayout({ subtitle = 'Votre agrégateur d’offres tech.', children }) {
    return (
        <div className="bg-background text-on-surface min-h-screen flex items-center justify-center p-md relative overflow-hidden font-body-md">
            {/* Background Glow */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 rounded-full mix-blend-screen filter blur-[120px] opacity-70" />
                <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-secondary/15 rounded-full mix-blend-screen filter blur-[100px] opacity-60" />
            </div>

            <main className="w-full max-w-lg z-10">
                <div className="text-center mb-xl">
                    <Link href="/">
                        <h1 className="font-display text-headline-md md:text-display text-primary mb-sm tracking-tight font-bold">
                            JobMind
                        </h1>
                    </Link>
                    <p className="font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
                </div>

                <div className="bg-surface-container/40 backdrop-blur-xl border border-outline-variant rounded-xl p-lg md:p-margin shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                    {children}
                </div>
            </main>
        </div>
    );
}
