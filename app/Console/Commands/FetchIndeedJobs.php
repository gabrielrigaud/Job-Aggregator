<?php

namespace App\Console\Commands;

use App\Models\Source;
use App\Services\JobIngestor;
use App\Services\JobNormalizer;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class FetchIndeedJobs extends Command
{
    protected $signature = 'jobs:fetch-indeed {keyword=Développeur} {location=Paris}';

    protected $description = 'Scrape les offres Indeed via le service Python FastAPI et les ingère';

    public function handle(JobNormalizer $normalizer, JobIngestor $ingestor)
    {
        $keyword = $this->argument('keyword');
        $location = $this->argument('location');

        $this->info("Démarrage du scraping Indeed pour '{$keyword}' à '{$location}'...");

        $source = Source::firstOrCreate(
            ['name' => 'Indeed'],
            ['url' => 'https://fr.indeed.com', 'type' => 'Scraping']
        );

        try {
            $scraperUrl = rtrim(config('services.scraper.url'), '/').'/scrape';
            $response = Http::timeout(180)->get($scraperUrl, [
                'keyword' => $keyword,
                'location' => $location,
            ]);

            if ($response->failed()) {
                $this->error('Erreur du service scraper : '.$response->body());

                return Command::FAILURE;
            }

            $jobs = $response->json();
        } catch (\Exception $e) {
            $this->error('Impossible de contacter le scraper : '.$e->getMessage());

            return Command::FAILURE;
        }

        if (! is_array($jobs) || isset($jobs['error'])) {
            $this->error('Réponse invalide du scraper : '.($jobs['error'] ?? 'Format inattendu'));

            return Command::FAILURE;
        }

        if (empty($jobs)) {
            $this->info('Aucune offre trouvée.');

            return Command::SUCCESS;
        }

        $insertedCount = 0;
        $duplicatesCount = 0;

        foreach ($jobs as $rawJob) {
            $normalizedJob = $normalizer->normalizeIndeed($rawJob);
            if ($ingestor->ingest($normalizedJob, $source)) {
                $insertedCount++;
            } else {
                $duplicatesCount++;
            }
        }

        $this->info("Scraping terminé : {$insertedCount} insérées, {$duplicatesCount} doublons ignorés.");

        return Command::SUCCESS;
    }
}
