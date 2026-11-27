<?php

namespace App\Services;

use App\Models\JobOffer;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class JobQueryService
{
    public function search(array $filters, int $perPage = 30): LengthAwarePaginator
    {
        $query = JobOffer::with(['company:id,name,logo_url,website_url', 'source:id,name,url'])
            ->select(
                'job_offers.id',
                'company_id',
                'source_internal_id',
                'source_external_id',
                'title',
                'description',
                'location',
                'country',
                'is_remote',
                'contract_type',
                'date_of_publi',
                'salary_min',
                'salary_max',
                'salary_currency',
                'salary_period',
                'job_offers.created_at'
            );

        if (! empty($filters['search'])) {
            $term = '%'.$filters['search'].'%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'ilike', $term)
                    ->orWhere('description', 'ilike', $term)
                    ->orWhereHas('company', function ($q2) use ($term) {
                        $q2->where('name', 'ilike', $term);
                    });
            });
        }

        if (! empty($filters['location'])) {
            $query->where('location', 'ilike', '%'.$filters['location'].'%');
        }

        if (! empty($filters['contract_type'])) {
            $ct = $filters['contract_type'];
            $aliases = match ($ct) {
                'CDI' => ['CDI', 'permanent'],
                'Alternance' => ['Alternance', 'apprenticeship'],
                'Freelance' => ['Freelance', 'freelance'],
                'CDD' => ['CDD', 'fixed_term'],
                'Stage' => ['Stage', 'internship'],
                default => [$ct],
            };
            $query->where(function ($q) use ($aliases, $ct) {
                $q->whereIn('contract_type', $aliases);
                if ($ct === 'Alternance') {
                    $q->orWhere('contract_type', 'ilike', 'alternance%');
                }
            });
        }

        if (! empty($filters['remote_only']) && $filters['remote_only'] === 'true') {
            $query->where('is_remote', true);
        }

        if (! empty($filters['salary_min'])) {
            $query->where('salary_min', '>=', (int) $filters['salary_min']);
        }

        if (! empty($filters['sort']) && $filters['sort'] === 'relevance') {
            if (! empty($filters['search'])) {
                $query->orderByRaw('CASE WHEN title ILIKE ? THEN 1 ELSE 2 END', ['%'.$filters['search'].'%'])
                    ->orderByDesc('job_offers.created_at')
                    ->orderByDesc('job_offers.id');
            } else {
                $query->orderByRaw('salary_max DESC NULLS LAST')
                    ->orderByDesc('job_offers.created_at')
                    ->orderByDesc('job_offers.id');
            }
        } else {
            $query->orderByDesc('job_offers.created_at')
                ->orderByDesc('job_offers.id');
        }

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Calcule les indicateurs réels du marché à partir des offres ingérées.
     */
    public function getMarketSummary(): array
    {
        $total = JobOffer::count();
        if ($total === 0) {
            return [
                'totalJobs' => 0,
                'avgSalary' => null,
                'cdiPercent' => 0,
                'remotePercent' => 0,
                'sourcesCount' => 0,
            ];
        }

        $remoteCount = JobOffer::where('is_remote', true)->count();
        $cdiCount = JobOffer::where(function ($q) {
            $q->where('contract_type', 'ilike', '%cdi%')
                ->orWhere('contract_type', 'ilike', 'permanent');
        })->count();

        $annualSalaries = JobOffer::where(function ($q) {
            $q->whereNotNull('salary_min')->orWhereNotNull('salary_max');
        })->get(['salary_min', 'salary_max', 'contract_type', 'salary_period'])->map(function ($job) {
            $min = $job->salary_min ? (float) $job->salary_min : null;
            $max = $job->salary_max ? (float) $job->salary_max : null;
            $val = ($min && $max) ? ($min + $max) / 2 : ($min ?? $max);
            if (! $val || $val <= 0) {
                return null;
            }
            $isFreelance = $job->contract_type && str_contains(mb_strtolower($job->contract_type), 'freelance');
            if ($val < 200) {
                return $val * 1000;
            }
            if ($val >= 10000) {
                return $val;
            }
            if ($isFreelance || $job->salary_period === 'monthly') {
                return null;
            }

            return null;
        })->filter();

        $avgSalary = $annualSalaries->isNotEmpty() ? (int) round($annualSalaries->avg()) : null;

        $sourcesCount = JobOffer::distinct('source_internal_id')->count('source_internal_id');

        return [
            'totalJobs' => $total,
            'avgSalary' => $avgSalary,
            'cdiPercent' => (int) round(($cdiCount / $total) * 100),
            'remotePercent' => (int) round(($remoteCount / $total) * 100),
            'sourcesCount' => $sourcesCount,
        ];
    }

    /**
     * Scoring de pertinence local (TF pondéré sur le profil utilisateur et/ou la recherche).
     */
    public function attachRelevanceScores(Collection $jobs, ?User $user, ?string $searchQuery = null): Collection
    {
        $profileTokens = $this->extractKeywords(
            trim(($user?->job_title ?? '').' '.($user?->bio ?? '').' '.($searchQuery ?? ''))
        );

        // Mots-clés tech par défaut si aucun profil ni recherche n'est renseigné
        if (empty($profileTokens)) {
            $profileTokens = ['developpeur', 'react', 'php', 'laravel', 'python', 'fullstack', 'backend', 'frontend', 'devops'];
        }

        return $jobs->map(function (JobOffer $job) use ($profileTokens) {
            $titleText = mb_strtolower($job->title ?? '');
            $descText = mb_strtolower($job->description ?? '');

            $matched = [];
            $score = 35; // Base pour toute offre active

            foreach ($profileTokens as $token) {
                if (str_contains($titleText, $token)) {
                    $score += 22;
                    $matched[] = $token;
                } elseif (str_contains($descText, $token)) {
                    $score += 10;
                    $matched[] = $token;
                }
            }

            if ($job->salary_min !== null) {
                $score += 8;
            }
            if ($job->is_remote) {
                $score += 5;
            }

            $job->setAttribute('ai_match_score', min(98, $score));
            $job->setAttribute('ai_matched_keywords', array_values(array_slice(array_unique($matched), 0, 3)));

            return $job;
        });
    }

    public function getInsights(): array
    {
        $totalJobs = JobOffer::count();
        $remoteCount = JobOffer::where('is_remote', true)->count();
        $hybridCount = JobOffer::where('is_remote', false)
            ->where(function ($q) {
                $q->where('title', 'ilike', '%hybride%')
                    ->orWhere('description', 'ilike', '%hybride%')
                    ->orWhere('location', 'ilike', '%hybride%');
            })->count();

        $remotePercent = $totalJobs > 0 ? (int) round(($remoteCount / $totalJobs) * 100) : 0;
        $hybridPercent = $totalJobs > 0 ? (int) round(($hybridCount / $totalJobs) * 100) : 0;
        $onSitePercent = $totalJobs > 0 ? max(0, 100 - $remotePercent - $hybridPercent) : 0;

        $topCompanies = JobOffer::selectRaw('company_id, count(*) as count')
            ->whereNotNull('company_id')
            ->groupBy('company_id')
            ->orderByDesc('count')
            ->take(5)
            ->with('company')
            ->get()
            ->map(fn ($item) => [
                'name' => $item->company?->name ?? 'Confidentiel',
                'count' => $item->count,
                'logo_url' => $item->company?->logo_url,
            ]);

        $specialties = [
            [
                'role' => 'IA & Machine Learning',
                'keywords' => ['ia', 'ai', 'machine learning', 'data scientist', 'deep learning'],
                'color' => 'from-primary to-indigo-600',
            ],
            [
                'role' => 'DevOps & Cloud',
                'keywords' => ['devops', 'cloud', 'aws', 'kubernetes', 'k8s', 'sre', 'docker'],
                'color' => 'from-sky-500 to-blue-600',
            ],
            [
                'role' => 'Backend (Java, Go, Laravel, Python)',
                'keywords' => ['backend', 'back-end', 'java', 'python', 'php', 'laravel', 'golang', 'node', 'c#', '.net'],
                'color' => 'from-amber-500 to-orange-500',
            ],
            [
                'role' => 'Mobile (iOS, Android, Flutter)',
                'keywords' => ['mobile', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin'],
                'color' => 'from-rose-500 to-amber-600',
            ],
            [
                'role' => 'Frontend (React, Vue, Next.js)',
                'keywords' => ['frontend', 'front-end', 'react', 'vue', 'angular', 'javascript', 'typescript', 'next'],
                'color' => 'from-sky-600 to-primary',
            ],
        ];

        foreach ($specialties as &$spec) {
            $query = JobOffer::where(function ($q) use ($spec) {
                foreach ($spec['keywords'] as $kw) {
                    $q->orWhere('title', 'ilike', "%{$kw}%");
                }
            });
            $count = (clone $query)->count();
            $salaries = (clone $query)
                ->whereNotNull('salary_min')
                ->where('salary_min', '>', 0)
                ->pluck('salary_min')
                ->map(function ($s) {
                    $val = (float) $s;
                    if ($val < 200) {
                        return $val * 1000;
                    }

                    return ($val >= 15000 && $val <= 180000) ? $val : null;
                })
                ->filter()
                ->sort()
                ->values();

            $salaryK = 0;
            if ($salaries->isNotEmpty()) {
                $mid = (int) floor($salaries->count() / 2);
                $median = $salaries->count() % 2 === 0
                    ? ($salaries[$mid - 1] + $salaries[$mid]) / 2
                    : $salaries[$mid];
                $salaryK = (int) round($median / 1000);
            }

            $spec['salary'] = $salaryK;
            $spec['count'] = $count;
        }

        $locations = JobOffer::selectRaw('location, count(*) as count')
            ->whereNotNull('location')
            ->groupBy('location')
            ->orderByDesc('count')
            ->get();

        $topSkills = $this->extractTopSkills();

        return [
            'totalJobs' => $totalJobs,
            'remotePercent' => $remotePercent,
            'hybridPercent' => $hybridPercent,
            'onSitePercent' => $onSitePercent,
            'topCompanies' => $topCompanies,
            'specialties' => $specialties,
            'locations' => $locations,
            'topSkills' => $topSkills,
        ];
    }

    private function extractTopSkills(): array
    {
        $catalog = [
            'Python' => ['python', 'fastapi', 'django', 'flask'],
            'React' => ['react', 'reactjs', 'next.js', 'nextjs'],
            'PHP / Laravel' => ['php', 'laravel', 'symfony'],
            'JavaScript / TS' => ['javascript', 'typescript', 'node.js', 'nodejs'],
            'Java' => ['java ', 'spring', 'jee'],
            'Docker / K8s' => ['docker', 'kubernetes', 'k8s'],
            'Cloud (AWS / GCP)' => ['aws', 'azure', 'gcp', 'cloud'],
            'SQL / Postgres' => ['sql', 'postgresql', 'postgres', 'mysql'],
            'Vue.js' => ['vue', 'vuejs', 'nuxt'],
            'IA / ML' => ['machine learning', 'deep learning', 'data scientist', 'llm'],
            'DevOps / CI-CD' => ['devops', 'ci/cd', 'terraform', 'ansible'],
            'Go' => ['golang', ' go '],
            'Rust' => ['rust'],
            'Salesforce' => ['salesforce', 'apex'],
        ];

        $offers = JobOffer::get(['title', 'description']);
        $counts = [];

        foreach ($catalog as $label => $needles) {
            $count = 0;
            foreach ($offers as $offer) {
                $text = ' '.mb_strtolower(($offer->title ?? '').' '.($offer->description ?? '')).' ';
                foreach ($needles as $needle) {
                    if (str_contains($text, $needle)) {
                        $count++;
                        break;
                    }
                }
            }
            if ($count > 0) {
                $counts[] = ['name' => $label, 'count' => $count];
            }
        }

        usort($counts, fn ($a, $b) => $b['count'] <=> $a['count']);

        return array_slice($counts, 0, 8);
    }

    private function extractKeywords(string $text): array
    {
        if (empty($text)) {
            return [];
        }

        $stopWords = ['avec', 'pour', 'dans', 'chez', 'une', 'des', 'les', 'sur', 'par', 'qui', 'que', 'est', 'sont', 'stage', 'cdi', 'cdd', 'alternance'];
        $words = preg_split('/[\s,;\/\-|]+/', mb_strtolower($text)) ?: [];

        $tokens = [];
        foreach ($words as $word) {
            $clean = trim($word, " \t\n\r\0\x0B.,!?()[]\"'");
            if (mb_strlen($clean) >= 2 && ! in_array($clean, $stopWords, true)) {
                $tokens[] = $clean;
            }
        }

        return array_values(array_unique($tokens));
    }
}
