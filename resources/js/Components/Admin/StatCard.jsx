import React from 'react';
import {
    AlertCircle,
    Banknote,
    Briefcase,
    CheckCircle2,
    Clock,
    Shield,
    Users,
    Zap,
} from 'lucide-react';

const ICON_MAP = {
    group: Users,
    work: Briefcase,
    shield_person: Shield,
    verified_user: Shield,
    error_outline: AlertCircle,
    bolt: Zap,
    hourglass_empty: Clock,
    schedule: Clock,
    check_circle: CheckCircle2,
    payments: Banknote,
};

export default function StatCard({ title, value, icon }) {
    const IconComponent = ICON_MAP[icon] || Briefcase;

    return (
        <div className="glass-panel rounded-xl p-4 shadow-2xs flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">
                    {title}
                </span>
                <IconComponent className="h-4 w-4 text-on-surface-variant shrink-0" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <span className="text-2xl font-bold text-on-surface tracking-tight">
                {value}
            </span>
        </div>
    );
}
