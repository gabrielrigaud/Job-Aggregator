<?php

namespace App\Console\Commands;

use App\Models\JobOffer;
use App\Services\JobAiEnricher;
use Illuminate\Console\Command;

class TranslateEnrichJobs extends Command
{
    protected $signature = 'jobs:translate-enrich {--id= : ID spécifique d\'une offre à traiter}';

    protected $description = 'Traduit en français et reformate via l\'IA les offres non francophones existantes';

    public function handle(JobAiEnricher $aiEnricher): int
    {
        $specificId = $this->option('id');

        $query = JobOffer::with('company');
        if ($specificId) {
            $query->where('id', (int) $specificId);
        }

        $jobs = $query->orderBy('id')->get();
        $updated = 0;

        foreach ($jobs as $job) {
            $description = (string) ($job->description ?? '');
            if (! $specificId && ! $aiEnricher->needsFrenchTranslation($description)) {
                continue;
            }

            $this->info("Traitement IA de l'offre #{$job->id} ({$job->title})...");

            $enriched = $aiEnricher->enrichAndTranslate([
                'title' => $job->title,
                'company_name' => $job->company?->name ?? '',
                'location' => $job->location ?? '',
                'url' => $job->url ?? '',
                'description' => $description,
                'salary_min' => $job->salary_min,
                'salary_max' => $job->salary_max,
                'salary_currency' => $job->salary_currency,
                'salary_period' => $job->salary_period,
                'contract_type' => $job->contract_type,
                'is_remote' => $job->is_remote,
            ]);

            $newDescription = (string) ($enriched['description'] ?? $description);
            if ($newDescription === $description) {
                $this->warn("  -> Aucune modification retournée pour #{$job->id}");

                continue;
            }

            $job->description = $newDescription;

            if (! empty($enriched['title'])) {
                $job->title = $enriched['title'];
            }

            if (empty($job->salary_min) && ! empty($enriched['salary_min'])) {
                $job->salary_min = $enriched['salary_min'];
                $job->salary_max = $enriched['salary_max'] ?? $enriched['salary_min'];
                $job->salary_currency = $enriched['salary_currency'] ?? $job->salary_currency;
                $job->salary_period = $enriched['salary_period'] ?? $job->salary_period;
            }

            if ($job->contract_type === 'Non spécifié' && ! empty($enriched['contract_type'])) {
                $job->contract_type = $enriched['contract_type'];
            }

            if (! $job->is_remote && ! empty($enriched['is_remote'])) {
                $job->is_remote = true;
            }

            $job->save();
            $updated++;
        }

        $this->info("Terminé : {$updated} offres traduites et mises en forme.");

        return Command::SUCCESS;
    }
}
