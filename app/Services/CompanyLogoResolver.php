<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CompanyLogoResolver
{
    /**
     * Tente de résoudre le site web et le logo d'une entreprise à partir de son nom.
     *
     * @return array{website_url: ?string, logo_url: ?string}
     */
    public function resolve(string $companyName, ?string $websiteUrl = null): array
    {
        $cleanName = trim($companyName);
        if ($cleanName === '' || in_array(mb_strtolower($cleanName), ['confidentiel', 'unknown', 'non spécifié'], true)) {
            return ['website_url' => $websiteUrl, 'logo_url' => null];
        }

        $domain = $this->extractDomain($websiteUrl);

        if (! $domain) {
            $domain = $this->findDomainViaClearbit($cleanName);
        }

        if (! $domain) {
            return ['website_url' => $websiteUrl, 'logo_url' => null];
        }

        return [
            'website_url' => $websiteUrl ?: 'https://'.$domain,
            'logo_url' => 'https://www.google.com/s2/favicons?domain='.urlencode($domain).'&sz=128',
        ];
    }

    private function extractDomain(?string $url): ?string
    {
        if (! $url) {
            return null;
        }
        $host = parse_url($url, PHP_URL_HOST);

        return $host ? preg_replace('/^www\./', '', $host) : null;
    }

    private function findDomainViaClearbit(string $companyName): ?string
    {
        try {
            $response = Http::timeout(4)->get('https://autocomplete.clearbit.com/v1/companies/suggest', [
                'query' => $companyName,
            ]);

            if (! $response->successful()) {
                return null;
            }

            $suggestions = $response->json();
            if (! is_array($suggestions) || empty($suggestions)) {
                return null;
            }

            return $suggestions[0]['domain'] ?? null;
        } catch (\Throwable) {
            return null;
        }
    }
}
