<?php

namespace App\Console\Commands;

use App\Models\Source;
use App\Services\JobAiEnricher;
use App\Services\JobIngestor;
use App\Services\JobNormalizer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchArbeitnowJobs extends Command
{
    protected $signature = 'jobs:fetch-arbeitnow {--pages=1 : Nombre de pages à récupérer} {--limit=10 : Nombre max d\'offres par page}';

    protected $description = 'Collecte et normalise des offres tech européennes depuis l\'API publique Arbeitnow';

    public function handle(JobNormalizer $normalizer, JobIngestor $ingestor, JobAiEnricher $aiEnricher): int
    {
        $source = Source::firstOrCreate(
            ['name' => 'Arbeitnow'],
            ['url' => 'https://www.arbeitnow.com', 'type' => 'API']
        );

        $pages = max(1, (int) $this->option('pages'));
        $limit = max(1, (int) $this->option('limit'));
        $inserted = 0;
        $duplicates = 0;

        for ($page = 1; $page <= $pages; $page++) {
            $this->info("Collecte Arbeitnow page {$page}...");

            $response = Http::timeout(15)->get('https://www.arbeitnow.com/api/job-board-api', [
                'page' => $page,
            ]);

            if (! $response->successful()) {
                $this->error("Erreur API Arbeitnow (HTTP {$response->status()})");

                return Command::FAILURE;
            }

            $items = $response->json('data') ?? [];
            if (empty($items)) {
                break;
            }

            foreach ($items as $rawJob) {
                if ($inserted >= $limit) {
                    break 2;
                }

                $loc = mb_strtolower((string) ($rawJob['location'] ?? ''));
                $title = mb_strtolower((string) ($rawJob['title'] ?? ''));
                $desc = mb_strtolower((string) ($rawJob['description'] ?? ''));

                $frenchCities = ['france', 'paris', 'lyon', 'marseille', 'bordeaux', 'toulouse', 'nantes', 'lille', 'strasbourg', 'nice', 'rennes', 'montpellier', 'grenoble', 'île-de-france'];
                $isFrance = false;
                foreach ($frenchCities as $city) {
                    if (str_contains($loc, $city)) {
                        $isFrance = true;
                        break;
                    }
                }

                $isGerman = str_contains($title, '(m/w/d)')
                    || str_contains($title, '(w/m/d)')
                    || str_contains($title, 'dach')
                    || str_contains($desc, 'wir sind')
                    || str_contains($desc, 'deutschland')
                    || str_contains($desc, 'gmbh');

                if (! $isFrance || $isGerman) {
                    continue;
                }

                $normalized = $normalizer->normalizeArbeitnow($rawJob);
                if ($aiEnricher->needsFrenchTranslation($normalized['description'] ?? '')) {
                    $normalized = $aiEnricher->enrichAndTranslate($normalized);
                }
                if ($ingestor->ingest($normalized, $source)) {
                    $inserted++;
                } else {
                    $duplicates++;
                }
            }
        }

        $this->info("Arbeitnow terminé : {$inserted} nouvelles offres insérées, {$duplicates} doublons ignorés.");

        return Command::SUCCESS;
    }
}
