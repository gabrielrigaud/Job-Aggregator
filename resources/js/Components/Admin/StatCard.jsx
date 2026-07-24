import React from 'react';

export default function StatCard({ title, value, icon, variant = 'primary', badge }) {
    const variants = {
        primary: {
            container: 'bg-primary-container/20',
            text: 'text-primary',
            bar: 'bg-primary',
            hover: 'hover:border-primary hover:shadow-md hover:shadow-primary/20 hover:ring-1 hover:ring-primary',
            statClass: 'stat-card'
        },
        secondary: {
            container: 'bg-secondary-container/20',
            text: 'text-secondary',
            bar: 'bg-secondary',
            hover: '',
            statClass: 'stat-card stat-card-secondary'
        },
        tertiary: {
            container: 'bg-tertiary-container/20',
            text: 'text-tertiary',
            bar: 'bg-tertiary',
            hover: '',
            statClass: 'stat-card stat-card-tertiary'
        },
        error: {
            container: 'bg-error-container/20',
            text: 'text-error',
            bar: 'bg-error',
            hover: '',
            statClass: 'stat-card stat-card-error'
        }
    };

    const styles = variants[variant] || variants.primary;

    return (
        <div className={`${styles.statClass} flex flex-col rounded-xl border border-outline-variant bg-surface p-5 shadow-sm hover:-translate-y-1 transition-all duration-300 ${styles.hover}`}>
            <div className="mb-4 flex items-center justify-between">
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${styles.container}`}>
                    <span className={`material-symbols-outlined text-[18px] ${styles.text}`}>{icon}</span>
                </div>
                {badge && (
                    <div>{badge}</div>
                )}
            </div>
            <span className="text-xs font-semibold text-on-surface-variant">{title}</span>
            <span className="text-3xl font-bold text-on-surface">{value}</span>
            <div className={`mt-3 h-1 w-12 rounded-full ${styles.bar}`}></div>
        </div>
    );
}
