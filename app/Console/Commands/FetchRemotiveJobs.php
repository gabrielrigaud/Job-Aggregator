<?php

namespace App\Console\Commands;

use App\Models\Source;
use App\Services\JobAiEnricher;
use App\Services\JobIngestor;
use App\Services\JobNormalizer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchRemotiveJobs extends Command
{
    protected $signature = 'jobs:fetch-remotive {--limit=10 : Nombre max d\'offres à récupérer} {--category=software-dev : Catégorie Remotive}';

    protected $description = 'Collecte et normalise des offres tech remote depuis l\'API publique Remotive';

    public function handle(JobNormalizer $normalizer, JobIngestor $ingestor, JobAiEnricher $aiEnricher): int
    {
        $source = Source::firstOrCreate(
            ['name' => 'Remotive'],
            ['url' => 'https://remotive.com', 'type' => 'API']
        );

        $limit = max(1, (int) $this->option('limit'));
        $category = (string) $this->option('category');

        $this->info("Collecte Remotive (catégorie: {$category}, limite: {$limit})...");

        $response = Http::timeout(15)->get('https://remotive.com/api/remote-jobs', [
            'category' => $category,
            'limit' => $limit,
        ]);

        if (! $response->successful()) {
            $this->error("Erreur API Remotive (HTTP {$response->status()})");

            return Command::FAILURE;
        }

        $items = $response->json('jobs') ?? [];
        $inserted = 0;
        $duplicates = 0;

        foreach ($items as $rawJob) {
            if ($inserted >= $limit) {
                break;
            }

            $loc = strtolower((string) ($rawJob['candidate_required_location'] ?? ''));
            $title = strtolower((string) ($rawJob['title'] ?? ''));

            // Filtrer pour ne garder que les offres accessibles depuis la France / Europe
            $isEuropeOrFrance = str_contains($loc, 'france')
                || str_contains($loc, 'europe')
                || str_contains($loc, 'emea')
                || str_contains($loc, 'worldwide')
                || str_contains($loc, 'anywhere');

            $isOtherLangOnly = str_contains($title, 'german-speaking') || str_contains($title, '(m/w/d)');

            if (! $isEuropeOrFrance || $isOtherLangOnly) {
                continue;
            }

            $normalized = $normalizer->normalizeRemotive($rawJob);
            if ($aiEnricher->needsFrenchTranslation($normalized['description'] ?? '')) {
                $normalized = $aiEnricher->enrichAndTranslate($normalized);
            }
            if ($ingestor->ingest($normalized, $source)) {
                $inserted++;
            } else {
                $duplicates++;
            }
        }

        $this->info("Remotive terminé : {$inserted} nouvelles offres insérées, {$duplicates} doublons ignorés.");

        return Command::SUCCESS;
    }
}
