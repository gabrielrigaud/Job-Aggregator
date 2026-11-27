<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class JobAiEnricher
{
    /**
     * Détermine si une description semble majoritairement non francophone.
     */
    public function needsFrenchTranslation(string $text): bool
    {
        $lower = mb_strtolower($text);
        if (mb_strlen(trim($lower)) < 40) {
            return false;
        }

        $frMatches = preg_match_all('/\b(nous|vous|avec|pour|dans|poste|entreprise|missions|profil|compétences|expérience|télétravail|salaire|équipe|recherchons)\b/u', $lower);
        $enMatches = preg_match_all('/\b(the|and|with|you|your|will|our|team|experience|requirements|responsibilities|benefits|apply|we are|looking for|skills)\b/u', $lower);

        return $enMatches > $frMatches && $enMatches >= 3;
    }

    /**
     * Envoie une offre normalisée au microservice IA (/clean) pour la traduire en français,
     * la structurer en Markdown et enrichir les métadonnées manquantes.
     *
     * @param  array<string, mixed>  $normalizedJob
     * @return array<string, mixed>
     */
    public function enrichAndTranslate(array $normalizedJob): array
    {
        $scraperBase = rtrim((string) config('services.scraper.url', 'http://127.0.0.1:8001'), '/');
        if ($scraperBase === '' || str_contains($scraperBase, 'scraper:8000')) {
            $scraperBase = 'http://127.0.0.1:8001';
        }

        $description = (string) ($normalizedJob['description'] ?? '');
        $title = (string) ($normalizedJob['title'] ?? '');
        $company = (string) ($normalizedJob['company_name'] ?? '');
        $location = (string) ($normalizedJob['location'] ?? '');

        try {
            $response = Http::timeout(35)->post($scraperBase.'/clean', [
                'title' => $title,
                'company' => $company,
                'location' => $location,
                'url' => (string) ($normalizedJob['url'] ?? ''),
                'description' => $description,
                'raw_full_text' => "Titre: {$title}\nEntreprise: {$company}\nLocalisation: {$location}\n\n{$description}",
            ]);

            if (! $response->successful()) {
                return $normalizedJob;
            }

            $cleaned = $response->json();
            if (! is_array($cleaned)) {
                return $normalizedJob;
            }

            if (! empty($cleaned['description'])) {
                $normalizedJob['description'] = (string) $cleaned['description'];
            }

            if (! empty($cleaned['title']) && $this->needsFrenchTranslation($title.' '.$description)) {
                $normalizedJob['title'] = (string) $cleaned['title'];
            }

            if (empty($normalizedJob['salary_min']) && ! empty($cleaned['salary_min'])) {
                $normalizedJob['salary_min'] = (int) $cleaned['salary_min'];
                $normalizedJob['salary_max'] = ! empty($cleaned['salary_max'])
                    ? (int) $cleaned['salary_max']
                    : (int) $cleaned['salary_min'];
                $normalizedJob['salary_currency'] = $cleaned['salary_currency'] ?? ($normalizedJob['salary_currency'] ?? 'EUR');
                $normalizedJob['salary_period'] = $cleaned['salary_period'] ?? ($normalizedJob['salary_period'] ?? 'yearly');
            }

            if (($normalizedJob['contract_type'] ?? 'Non spécifié') === 'Non spécifié' && ! empty($cleaned['contract'])) {
                $normalizedJob['contract_type'] = (string) $cleaned['contract'];
            }

            if (empty($normalizedJob['is_remote']) && ! empty($cleaned['is_remote'])) {
                $normalizedJob['is_remote'] = (bool) $cleaned['is_remote'];
            }
        } catch (\Throwable $e) {
            Log::warning('JobAiEnricher failed: '.$e->getMessage());
        }

        return $normalizedJob;
    }
}
