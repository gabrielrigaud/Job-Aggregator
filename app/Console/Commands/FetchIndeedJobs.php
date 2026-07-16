<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use App\Models\Source;
use App\Services\JobNormalizer;
use App\Services\JobIngestor;

class FetchIndeedJobs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'jobs:fetch-indeed {keyword=Développeur} {location=Paris}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scrape Indeed jobs using Playwright and ingest them';

    /**
     * Execute the console command.
     */
    public function handle(JobNormalizer $normalizer, JobIngestor $ingestor)
    {
        $keyword = $this->argument('keyword');
        $location = $this->argument('location');

        $this->info("Démarrage du scraping Indeed pour '{$keyword}' à '{$location}'...");

        // Obtenir ou créer la source
        $source = Source::firstOrCreate(
            ['name' => 'Indeed'],
            ['url' => 'https://fr.indeed.com', 'type' => 'Scraping']
        );

        $scriptPath = base_path('scripts/indeed-scraper.js');

        // Exécuter le script Node.js via Process
        $process = new Process(['node', $scriptPath, $keyword, $location]);
        $process->setTimeout(60); // Le scraping peut être long

        try {
            $process->mustRun();
        } catch (ProcessFailedException $exception) {
            $this->error("Erreur lors de l'exécution du script Playwright:");
            $this->error($exception->getMessage());
            return Command::FAILURE;
        }

        $output = $process->getOutput();
        
        $jobs = json_decode($output, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->error("Erreur de décodage JSON de la sortie de Playwright: " . json_last_error_msg());
            $this->line("Sortie brute: " . $output);
            return Command::FAILURE;
        }

        if (isset($jobs['error'])) {
            $this->error("Erreur renvoyée par le script Node: " . $jobs['error']);
            return Command::FAILURE;
        }

        if (empty($jobs)) {
            $this->info("Aucune offre trouvée ou page bloquée par un Captcha.");
            return Command::SUCCESS;
        }

        $insertedCount = 0;
        $duplicatesCount = 0;

        foreach ($jobs as $rawJob) {
            $normalizedJob = $normalizer->normalizeIndeed($rawJob);
            $isInserted = $ingestor->ingest($normalizedJob, $source);

            if ($isInserted) {
                $insertedCount++;
            } else {
                $duplicatesCount++;
            }
        }

        $this->info("Scraping Indeed terminé !");
        $this->info("- {$insertedCount} nouvelles offres insérées.");
        $this->info("- {$duplicatesCount} doublons ignorés.");

        return Command::SUCCESS;
    }
}
