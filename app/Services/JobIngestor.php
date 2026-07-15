<?php

namespace App\Services;

use App\Models\Company;
use App\Models\JobOffer;
use App\Models\Source;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class JobIngestor
{
    /**
     * Ingère une offre normalisée.
     * @return bool True si insérée, False si doublon ou erreur.
     */
    public function ingest(array $normalizedJob, Source $source): bool
    {
        // Générer le content_hash pour la détection de doublon exact
        $contentString = $normalizedJob['title'] . $normalizedJob['description'] . $normalizedJob['company_name'] . $normalizedJob['location'];
        $contentHash = hash('sha256', $contentString);

        // Vérifier si ce hash existe déjà
        if (JobOffer::where('content_hash', $contentHash)->exists()) {
            return false; // Doublon détecté via content_hash
        }

        // Vérifier si la source externe existe déjà (idempotence)
        if ($normalizedJob['source_external_id'] && JobOffer::where('source_internal_id', $source->id)->where('source_external_id', $normalizedJob['source_external_id'])->exists()) {
            return false;
        }

        try {
            DB::transaction(function () use ($normalizedJob, $source, $contentHash) {
                // Créer ou récupérer la Company
                $company = Company::firstOrCreate(
                    ['name' => $normalizedJob['company_name']],
                    [
                        'website_url' => $normalizedJob['company_website'],
                        'logo_url' => $normalizedJob['company_logo']
                    ]
                );

                // Insérer le JobOffer
                JobOffer::create([
                    'company_id' => $company->id,
                    'source_internal_id' => $source->id,
                    'source_external_id' => $normalizedJob['source_external_id'] ?? uniqid('ext_'),
                    'title' => $normalizedJob['title'],
                    'description' => $normalizedJob['description'],
                    'location' => $normalizedJob['location'],
                    'country' => $normalizedJob['country'],
                    'is_remote' => $normalizedJob['is_remote'],
                    'contract_type' => $normalizedJob['contract_type'],
                    'date_of_publi' => $normalizedJob['date_of_publi'],
                    'date_of_collect' => $normalizedJob['date_of_collect'],
                    'salary_min' => $normalizedJob['salary_min'],
                    'salary_max' => $normalizedJob['salary_max'],
                    'salary_currency' => $normalizedJob['salary_currency'],
                    'salary_period' => $normalizedJob['salary_period'],
                    'content_hash' => $contentHash,
                ]);
            });

            return true;

        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'ingestion du job : ' . $e->getMessage());
            return false;
        }
    }
}
