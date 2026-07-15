<?php

namespace App\Services;

class JobNormalizer
{
    /**
     * Normalise une offre brute de WeLoveDevs vers le modèle pivot.
     */
    public function normalizeWeLoveDevs(array $rawJob): array
    {
        return [
            'source_external_id' => $rawJob['id'] ?? null,
            'title'              => $rawJob['title'] ?? 'Titre inconnu',
            'description'        => $rawJob['descriptionPreview'] ?? ($rawJob['mdDescription'] ?? ''),
            'location'           => isset($rawJob['formattedPlaces']) && count($rawJob['formattedPlaces']) > 0 ? $rawJob['formattedPlaces'][0] : 'Remote',
            'country'            => 'France', // Par défaut pour WeLoveDevs
            'is_remote'          => isset($rawJob['details']['remotePolicy']) && $rawJob['details']['remotePolicy']['frequency'] === 'fullTime',
            'contract_type'      => isset($rawJob['contractTypes']) && count($rawJob['contractTypes']) > 0 ? $rawJob['contractTypes'][0] : 'unknown',
            'date_of_publi'      => isset($rawJob['publishDate']) ? date('Y-m-d H:i:s', $rawJob['publishDate'] / 1000) : now(),
            'date_of_collect'    => now(),
            
            // Salaire
            'salary_min'         => $rawJob['details']['salary']['min'] ?? null,
            'salary_max'         => $rawJob['details']['salary']['max'] ?? null,
            'salary_currency'    => $rawJob['details']['salary']['currency'] ?? null,
            'salary_period'      => $rawJob['details']['salary']['recurrence'] ?? null,
            
            // Entreprise
            'company_name'       => $rawJob['smallCompany']['companyName'] ?? 'Unknown',
            'company_website'    => $rawJob['smallCompany']['url'] ?? null,
            'company_logo'       => $rawJob['smallCompany']['fallbackGalleryUrl'] ?? null,
        ];
    }
}
