import React from 'react';

export default function PageHeader({ title, description, children }) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <h2 className="text-2xl font-bold text-on-surface">{title}</h2>
                <p className="mt-1 text-sm text-on-surface-variant">{description}</p>
            </div>
            {children && (
                <div className="flex flex-wrap items-center gap-3">
                    {children}
                </div>
            )}
        </div>
    );
}
