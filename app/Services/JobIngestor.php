<?php

namespace App\Services;

use App\Models\Company;
use App\Models\JobOffer;
use App\Models\Source;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class JobIngestor
{
    public function __construct(private ?CompanyLogoResolver $logoResolver = null)
    {
        $this->logoResolver ??= new CompanyLogoResolver;
    }

    /**
     * Ingère une offre normalisée.
     *
     * @return bool True si insérée, False si doublon ou erreur.
     */
    public function ingest(array $normalizedJob, Source $source): bool
    {
        // Générer le content_hash pour la détection de doublon exact
        $contentString = $normalizedJob['title'].$normalizedJob['description'].$normalizedJob['company_name'].$normalizedJob['location'];
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
                // Créer ou récupérer la Company et résoudre son logo si absent
                $companyName = $this->sanitizeUtf8($normalizedJob['company_name']);
                $company = Company::firstOrCreate(
                    ['name' => $companyName],
                    [
                        'website_url' => $this->sanitizeUtf8($normalizedJob['company_website'] ?? null),
                        'logo_url' => $this->sanitizeUtf8($normalizedJob['company_logo'] ?? null),
                    ]
                );

                if (! $company->logo_url) {
                    $resolved = $this->logoResolver->resolve($companyName, $company->website_url);
                    if ($resolved['logo_url']) {
                        $company->update([
                            'website_url' => $company->website_url ?: $resolved['website_url'],
                            'logo_url' => $resolved['logo_url'],
                        ]);
                    }
                }

                // Insérer le JobOffer
                JobOffer::create([
                    'company_id' => $company->id,
                    'source_internal_id' => $source->id,
                    'source_external_id' => $this->sanitizeUtf8($normalizedJob['source_external_id'] ?? uniqid('ext_')),
                    'title' => $this->sanitizeUtf8($normalizedJob['title']),
                    'description' => $this->sanitizeUtf8($normalizedJob['description']),
                    'location' => $this->sanitizeUtf8($normalizedJob['location']),
                    'country' => $this->sanitizeUtf8($normalizedJob['country']),
                    'is_remote' => $normalizedJob['is_remote'],
                    'contract_type' => $this->sanitizeUtf8($normalizedJob['contract_type']),
                    'date_of_publi' => $normalizedJob['date_of_publi'],
                    'date_of_collect' => $normalizedJob['date_of_collect'],
                    'salary_min' => $normalizedJob['salary_min'],
                    'salary_max' => $normalizedJob['salary_max'],
                    'salary_currency' => $this->sanitizeUtf8($normalizedJob['salary_currency']),
                    'salary_period' => $this->sanitizeUtf8($normalizedJob['salary_period']),
                    'content_hash' => $contentHash,
                ]);
            });

            return true;

        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'ingestion du job : '.$e->getMessage());

            return false;
        }
    }

    private function sanitizeUtf8(mixed $value): mixed
    {
        if (is_string($value) && ! mb_check_encoding($value, 'UTF-8')) {
            return mb_convert_encoding($value, 'UTF-8', 'ISO-8859-1');
        }

        return $value;
    }
}
