export function formatContractType(contractType) {
    if (!contractType) return 'Non spécifié';
    const normalized = String(contractType).trim().toLowerCase();

    if (normalized === 'permanent' || normalized === 'cdi' || normalized === 'full_time' || normalized === 'fulltime') {
        return 'CDI';
    }
    if (normalized === 'apprenticeship' || normalized === 'alternance' || normalized.startsWith('alternance')) {
        return 'Alternance';
    }
    if (normalized === 'freelance' || normalized === 'contractor' || normalized.includes('freelance') || normalized.includes('indépendant')) {
        return 'Freelance';
    }
    if (normalized === 'fixed_term' || normalized === 'cdd') {
        return 'CDD';
    }
    if (normalized === 'internship' || normalized === 'stage') {
        return 'Stage';
    }
    if (normalized === 'unknown' || normalized === 'non spécifié') {
        return 'Non spécifié';
    }

    return String(contractType).trim();
}

export function formatSalary(job) {
    if (!job || (!job.salary_min && !job.salary_max)) {
        return { text: 'Salaire non communiqué', isDisclosed: false };
    }

    const contract = formatContractType(job.contract_type).toLowerCase();
    const isFreelance = contract === 'freelance';
    const isHourlyPeriod = job.salary_period === 'hourly';
    const isDailyPeriod = job.salary_period === 'daily';
    const isMonthlyPeriod = job.salary_period === 'monthly';
    const currencySymbol = job.salary_currency === 'USD' ? '$' : '€';

    const rawMin = job.salary_min ? Number(job.salary_min) : null;
    const rawMax = job.salary_max ? Number(job.salary_max) : null;
    const sample = rawMin || rawMax;

    let suffix = ' / an';
    if (isHourlyPeriod) {
        suffix = ' / h';
    } else if (isDailyPeriod || (isFreelance && sample >= 100 && sample < 2000)) {
        suffix = ' / j';
    } else if (isMonthlyPeriod || ((contract === 'alternance' || contract === 'stage') && sample >= 200 && sample < 3000)) {
        suffix = ' / mois';
    }

    const formatNum = (num) => {
        if (!num) return null;
        const n = Number(num);
        if (isHourlyPeriod || isDailyPeriod || isMonthlyPeriod) return `${n}`;
        if (n < 200) return `${n}k`;
        if (n >= 2000) return `${Math.round(n / 1000)}k`;
        return `${n}`;
    };

    const min = formatNum(rawMin);
    const max = formatNum(rawMax);

    if (min && max) {
        if (min === max) {
            return { text: `${min} ${currencySymbol}${suffix}`, isDisclosed: true };
        }
        return { text: `${min} - ${max} ${currencySymbol}${suffix}`, isDisclosed: true };
    }
    if (min) {
        return { text: `Dès ${min} ${currencySymbol}${suffix}`, isDisclosed: true };
    }
    if (max) {
        return { text: `Jusqu'à ${max} ${currencySymbol}${suffix}`, isDisclosed: true };
    }

    return { text: 'Salaire non communiqué', isDisclosed: false };
}

function parseValidDate(dateString, fallbackDateString = null) {
    const candidates = [dateString, fallbackDateString].filter(Boolean);
    for (const candidate of candidates) {
        const parsed = new Date(candidate);
        const year = parsed.getFullYear();
        if (!Number.isNaN(parsed.getTime()) && year >= 2000 && year <= 2035) {
            return parsed;
        }
    }
    return null;
}

export function formatDate(dateString, fallbackDateString = null) {
    const date = parseValidDate(dateString, fallbackDateString);
    if (!date) return 'Récemment';
    return date.toLocaleDateString('fr-FR');
}

export function formatRelativeDate(dateString, fallbackDateString = null) {
    const date = parseValidDate(dateString, fallbackDateString);
    if (!date) return 'Récent';

    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) return "Aujourd'hui";
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} sem.`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function cleanDescription(raw) {
    if (!raw) return '';
    return raw
        .replace(/^[ \t]{2,}/gm, '')
        .replace(/^[ \t]*[•·▪⁃►]\s*/gm, '- ')
        .replace(/^#([a-zA-Z0-9_\u00C0-\u017F]+)/gm, '**#$1**')
        .replace(/^[ \t]*([A-ZÀ-Ÿ].*;\s*)$/gm, '- $1')
        .replace(/^(?!#+)\s*([A-ZÀ-Ÿ0-9][^:\n]{1,60})\s*:\s*$/gm, '\n\n### $1\n')
        .replace(/^(?!#+)\s*(Description (?:de l['’]entreprise|du poste|de l['’]offre)|(?:Vos|Votre|Nos|Notre)?\s*(?:Missions?|Rôle|Profil(?: recherché)?|Compétences(?: requises)?|Prérequis|Stack technique|Technologies|Environnement(?: technique)?|Avantages|À propos|A propos|Ce que nous offrons)|Qui (?:êtes|etes)-vous(?:\s*\?)?|Pourquoi nous rejoindre(?:\s*\?)?)\s*$/gmi, '\n\n### $1\n');
}
