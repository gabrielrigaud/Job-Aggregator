import React from 'react';

export default function PageHeader({ title, description, children }) {
    return (
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-outline-variant/60 pb-3">
            <div>
                <h2 className="text-base md:text-lg font-bold text-on-surface tracking-tight">{title}</h2>
                {description && (
                    <p className="text-xs text-on-surface-variant mt-0.5">{description}</p>
                )}
            </div>
            {children && (
                <div className="flex flex-wrap items-center gap-2">
                    {children}
                </div>
            )}
        </div>
    );
}
