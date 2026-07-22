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
    /**
     * Normalise une offre issue du scraper Indeed.
     */

    public function normalizeIndeed(array $rawJob): array
    {
        $location = $rawJob['location'] ?? 'Non spécifié';
        $description = $rawJob['description'] ?? '';
        $contract = $rawJob['contract'] ?? 'Non spécifié';
        $salaryRaw = $rawJob['salary'] ?? null;

        // Détection intelligente du télétravail
        $isRemote = false;
        $remoteKeywords = ['télétravail', 'teletravail', 'hybride', 'remote', 'domicile'];
        $textToSearch = strtolower($location . ' ' . $description);
        foreach ($remoteKeywords as $kw) {
            if (str_contains($textToSearch, $kw)) {
                $isRemote = true;
                break;
            }
        }
        
        // Extraction du contrat depuis la description si non spécifié
        if ($contract === 'Non spécifié') {
            $contractKeywords = ['CDI', 'CDD', 'Stage', 'Alternance', 'Freelance', 'Indépendant'];
            foreach ($contractKeywords as $kw) {
                if (stripos($description, $kw) !== false) {
                    $contract = $kw;
                    break;
                }
            }
        }

        // Parsing du salaire
        $salaryMin = null;
        $salaryMax = null;
        $salaryPeriod = 'yearly';

        if (!$salaryRaw && preg_match('/(?:Rémunération|Salaire)\s*[:]?\s*(.*é)/iu', $description, $matches)) {
             $salaryRaw = $matches[1];
        }

        if ($salaryRaw) {
            if (stripos($salaryRaw, 'mois') !== false) {
                $salaryPeriod = 'monthly';
            } elseif (stripos($salaryRaw, 'heure') !== false) {
                $salaryPeriod = 'hourly';
            }

            // Gérer les espaces insécables (\u{202F} ou \u{A0})
            $cleanSalary = preg_replace('/[^\d,.]/', '', str_replace([' ', 'k', 'K', 'é', "\u{202F}", "\u{A0}"], ['', '000', '000', '', '', ''], $salaryRaw));
            
            // Chercher des nombres (ex: 48000)
            if (preg_match_all('/(\d{2,3}(?:\s?\d{3})?|\d{2}\s?[kK])/', $salaryRaw, $matches)) {
                $numbers = [];
                foreach ($matches[1] as $match) {
                    $num = (float) str_replace([' ', 'k', 'K', "\u{202F}", "\u{A0}"], ['', '000', '000', '', ''], $match);
                    if ($num > 10) $numbers[] = $num;
                }
                
                if (count($numbers) == 1) {
                    $salaryMin = $numbers[0];
                    $salaryMax = $numbers[0];
                } elseif (count($numbers) >= 2) {
                    $salaryMin = min($numbers[0], $numbers[1]);
                    $salaryMax = max($numbers[0], $numbers[1]);
                }
            }
        }

        return [
            'source_external_id' => null,
            'title' => $rawJob['title'] ?? 'Titre inconnu',
            'description' => empty($description) ? 'Aucune description' : $description,
            'company_name' => $rawJob['company'] ?? 'Non spécifié',
            'company_website' => null,
            'company_logo' => null,
            'location' => $location,
            'country' => 'France',
            'is_remote' => $isRemote,
            'contract_type' => $contract,
            'date_of_publi' => now(),
            'date_of_collect' => now(),
            'salary_min' => $salaryMin,
            'salary_max' => $salaryMax,
            'salary_currency' => 'EUR',
            'salary_period' => $salaryPeriod,
        ];
    }
}
