<?php

namespace App\Console\Commands;

use App\Models\Source;
use App\Services\JobAiEnricher;
use App\Services\JobIngestor;
use App\Services\JobNormalizer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchWeLoveDevsJobs extends Command
{
    protected $signature = 'jobs:fetch-welovedevs {--pages=1 : Nombre de pages à récupérer}';

    protected $description = 'Récupère les offres d\'emploi depuis l\'API WeLoveDevs et les normalise';

    public function handle(JobNormalizer $normalizer, JobIngestor $ingestor, JobAiEnricher $aiEnricher)
    {
        $apiKey = config('services.welovedevs.key');
        $apiUrl = config('services.welovedevs.url');

        if (! $apiKey) {
            $this->error('Clé API WeLoveDevs manquante (WELOVEDEVS_API_KEY).');

            return Command::FAILURE;
        }

        $source = Source::firstOrCreate(
            ['name' => 'WeLoveDevs'],
            ['url' => 'https://welovedevs.com', 'type' => 'API']
        );

        $pagesToFetch = (int) $this->option('pages');
        $size = 10;
        $insertedCount = 0;
        $duplicatesCount = 0;

        for ($page = 0; $page < $pagesToFetch; $page++) {
            $this->info("Récupération de la page {$page} (1 req/sec)...");

            $response = Http::withHeaders([
                'X-API-Key' => $apiKey,
            ])->timeout(15)->get($apiUrl, [
                'page' => $page,
                'size' => $size,
            ]);

            if ($response->status() === 429) {
                $this->error('Rate limit atteint (429). Arrêt de la collecte.');
                break;
            }

            if (! $response->successful()) {
                $this->error("Erreur API WeLoveDevs (Status: {$response->status()})");
                break;
            }

            $data = $response->json();
            if (empty($data['values'])) {
                $this->info("Aucune offre sur la page {$page}. Fin.");
                break;
            }

            foreach ($data['values'] as $rawJob) {
                $normalizedJob = $normalizer->normalizeWeLoveDevs($rawJob);
                if ($aiEnricher->needsFrenchTranslation($normalizedJob['description'] ?? '')) {
                    $normalizedJob = $aiEnricher->enrichAndTranslate($normalizedJob);
                }
                if ($ingestor->ingest($normalizedJob, $source)) {
                    $insertedCount++;
                } else {
                    $duplicatesCount++;
                }
            }

            if ($page < $pagesToFetch - 1) {
                sleep(1);
            }
        }

        $this->info("Collecte terminée : {$insertedCount} insérées, {$duplicatesCount} doublons ignorés.");

        return Command::SUCCESS;
    }
}
