<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Source;
use App\Services\JobNormalizer;
use App\Services\JobIngestor;

class FetchWeLoveDevsJobs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jobs:fetch-welovedevs {--pages=1 : Nombre de pages à récupérer}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Récupère les offres d\'emploi depuis l\'API WeLoveDevs et les normalise';

    /**
     * Execute the console command.
     */
    public function handle(JobNormalizer $normalizer, JobIngestor $ingestor)
    {
        $apiKey = env('WELOVEDEVS_API_KEY');

        if (!$apiKey) {
            $this->error('La clé API WeLoveDevs est manquante dans le fichier .env (WELOVEDEVS_API_KEY).');
            return Command::FAILURE;
        }

        // Récupérer ou créer la source
        $source = Source::firstOrCreate(
            ['name' => 'WeLoveDevs'],
            ['url' => 'https://welovedevs.com', 'type' => 'API']
        );

        $pagesToFetch = (int) $this->option('pages');
        $size = 10;
        $insertedCount = 0;
        $duplicatesCount = 0;

        for ($page = 0; $page < $pagesToFetch; $page++) {
            $this->info("Récupération de la page {$page} (limite : 1 req/sec)...");

            $response = Http::withoutVerifying()->withHeaders([
                'X-API-Key' => $apiKey,
            ])->get("https://epi-api.welovedevs.com/v1", [
                'page' => $page,
                'size' => $size,
            ]);

            if ($response->status() === 429) {
                $this->error("Rate limit atteint (429). Arrêt de la collecte.");
                break;
            }

            if (!$response->successful()) {
                $this->error("Erreur de l'API (Status: {$response->status()})");
                break;
            }

            $data = $response->json();

            if (!isset($data['values']) || empty($data['values'])) {
                $this->info("Aucune offre trouvée sur la page {$page}. Fin.");
                break;
            }

            foreach ($data['values'] as $rawJob) {
                // 1. Normaliser
                $normalizedJob = $normalizer->normalizeWeLoveDevs($rawJob);

                // 2. Ingérer (Dédoublonner & Stocker)
                $isInserted = $ingestor->ingest($normalizedJob, $source);

                if ($isInserted) {
                    $insertedCount++;
                } else {
                    $duplicatesCount++;
                }
            }

            // Respecter la limite de 1 requête par seconde
            if ($page < $pagesToFetch - 1) {
                sleep(1);
            }
        }

        $this->info("Collecte WeLoveDevs terminée !");
        $this->info("- {$insertedCount} nouvelles offres insérées.");
        $this->info("- {$duplicatesCount} doublons ignorés.");

        return Command::SUCCESS;
    }
}
