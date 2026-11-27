<?php

namespace App\Services;

use Illuminate\Support\Carbon;

class JobNormalizer
{
    /**
     * Normalise une offre brute de WeLoveDevs vers le modèle pivot.
     */
    public function normalizeWeLoveDevs(array $rawJob): array
    {
        return [
            'source_external_id' => $rawJob['id'] ?? null,
            'title' => $rawJob['title'] ?? 'Titre inconnu',
            'description' => $rawJob['descriptionPreview'] ?? ($rawJob['mdDescription'] ?? ''),
            'location' => isset($rawJob['formattedPlaces']) && count($rawJob['formattedPlaces']) > 0 ? $rawJob['formattedPlaces'][0] : 'Remote',
            'country' => 'France', // Par défaut pour WeLoveDevs
            'is_remote' => isset($rawJob['details']['remotePolicy']) && $rawJob['details']['remotePolicy']['frequency'] === 'fullTime',
            'contract_type' => $this->normalizeContractType($rawJob['contractTypes'][0] ?? null, ($rawJob['title'] ?? '').' '.($rawJob['descriptionPreview'] ?? '')),
            'date_of_publi' => $this->normalizeTimestamp($rawJob['publishDate'] ?? null),
            'date_of_collect' => now(),

            // Salaire
            'salary_min' => $rawJob['details']['salary']['min'] ?? null,
            'salary_max' => $rawJob['details']['salary']['max'] ?? null,
            'salary_currency' => $rawJob['details']['salary']['currency'] ?? null,
            'salary_period' => $rawJob['details']['salary']['recurrence'] ?? null,

            // Entreprise
            'company_name' => $rawJob['smallCompany']['companyName'] ?? 'Unknown',
            'company_website' => $rawJob['smallCompany']['url'] ?? null,
            'company_logo' => $rawJob['smallCompany']['fallbackGalleryUrl'] ?? null,
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

        $isRemote = (bool) ($rawJob['is_remote'] ?? false);

        // Nettoyage de la localisation (suppression des préfixes de télétravail)
        if (preg_match('/(?:télétravail|teletravail|hybride|remote|partiel|rtiel)[^àa]*[àa]\s*(.+)/iu', $location, $m)) {
            $location = trim($m[1]);
            $isRemote = true;
        }
        $location = trim(preg_replace('/^(?:télétravail\s*(?:partiel|total|hybride)?|partiel|rtiel|hybride|remote)\s*(?:à|in)?\s*/iu', '', $location));
        if (empty($location)) {
            $location = 'France';
        }

        if (! $isRemote) {
            $remoteKeywords = ['télétravail', 'teletravail', 'hybride', 'remote', 'domicile'];
            $textToSearch = strtolower($location.' '.($rawJob['title'] ?? '').' '.$description);
            foreach ($remoteKeywords as $kw) {
                if (str_contains($textToSearch, $kw)) {
                    $isRemote = true;
                    break;
                }
            }
        }

        // Extraction du type de contrat
        if ($contract === 'Non spécifié' || empty($contract)) {
            $titleAndDesc = ($rawJob['title'] ?? '').' '.$description;
            $contractMap = [
                'Alternance' => ['alternance', 'apprentissage', 'contrat pro'],
                'Stage' => ['stage', 'stagiaire', 'internship'],
                'Freelance' => ['freelance', 'indépendant', 'independant', 'prestation', 'tjm'],
                'CDI' => ['cdi', 'durée indéterminée', 'duree indeterminee'],
                'CDD' => ['cdd', 'durée déterminée', 'duree determinee'],
            ];
            foreach ($contractMap as $type => $keywords) {
                foreach ($keywords as $kw) {
                    if (stripos($titleAndDesc, $kw) !== false) {
                        $contract = $type;
                        break 2;
                    }
                }
            }
        }

        // Parsing du salaire (priorité à l'IA si déjà structuré)
        $salaryMin = $rawJob['salary_min'] ?? null;
        $salaryMax = $rawJob['salary_max'] ?? null;
        $salaryPeriod = $rawJob['salary_period'] ?? 'yearly';

        if ($salaryMin === null && $salaryMax === null) {
            if (! $salaryRaw && preg_match('/(?:Rémunération|Salaire)\s*[:]?\s*(.*€)/iu', $description, $matches)) {
                $salaryRaw = $matches[1];
            }

            if ($salaryRaw) {
                if (stripos($salaryRaw, 'mois') !== false) {
                    $salaryPeriod = 'monthly';
                } elseif (stripos($salaryRaw, 'heure') !== false) {
                    $salaryPeriod = 'hourly';
                }

                // Chercher des nombres (ex: 48000)
                if (preg_match_all('/(\d{2,3}(?:\s?\d{3})?|\d{2}\s?[kK])/', $salaryRaw, $matches)) {
                    $numbers = [];
                    foreach ($matches[1] as $match) {
                        $num = (float) str_replace([' ', 'k', 'K', "\u{202F}", "\u{A0}"], ['', '000', '000', '', ''], $match);
                        if ($num > 10) {
                            $numbers[] = $num;
                        }
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
        }

        $externalUrl = $rawJob['url'] ?? null;
        $sourceExternalId = null;
        if ($externalUrl) {
            if (preg_match('/[?&]jk=([a-zA-Z0-9_-]+)/', $externalUrl, $jkMatch)) {
                $sourceExternalId = 'https://fr.indeed.com/viewjob?jk='.$jkMatch[1];
            } else {
                $sourceExternalId = strlen($externalUrl) > 255 ? hash('sha256', $externalUrl) : $externalUrl;
            }
        }

        return [
            'source_external_id' => $sourceExternalId,
            'title' => $rawJob['title'] ?? 'Titre inconnu',
            'description' => empty($description) ? 'Aucune description' : $description,
            'company_name' => $rawJob['company'] ?? 'Non spécifié',
            'company_website' => null,
            'company_logo' => null,
            'location' => $location,
            'country' => 'France',
            'is_remote' => $isRemote,
            'contract_type' => $this->normalizeContractType($contract, ($rawJob['title'] ?? '').' '.$description),
            'date_of_publi' => $this->normalizeTimestamp($rawJob['publishDate'] ?? null),
            'date_of_collect' => now(),
            'salary_min' => $salaryMin,
            'salary_max' => $salaryMax,
            'salary_currency' => $rawJob['salary_currency'] ?? 'EUR',
            'salary_period' => $salaryPeriod,
        ];
    }

    private function normalizeTimestamp(mixed $value): string
    {
        if (empty($value)) {
            return now()->format('Y-m-d H:i:s');
        }

        if (is_numeric($value)) {
            $ts = (float) $value;
            while ($ts > 32503680000) {
                $ts /= 1000;
            }
            $intTs = (int) round($ts);
            if ($intTs < 946684800 || $intTs > 2524608000) {
                return now()->format('Y-m-d H:i:s');
            }

            return date('Y-m-d H:i:s', $intTs);
        }

        try {
            $dt = Carbon::parse((string) $value);
            if ($dt->year < 2000 || $dt->year > 2035) {
                return now()->format('Y-m-d H:i:s');
            }

            return $dt->format('Y-m-d H:i:s');
        } catch (\Throwable) {
            return now()->format('Y-m-d H:i:s');
        }
    }

    private function normalizeContractType(?string $raw, string $titleAndDesc = ''): string
    {
        $val = mb_strtolower(trim((string) $raw));

        $directMap = [
            'permanent' => 'CDI',
            'cdi' => 'CDI',
            'full_time' => 'CDI',
            'fulltime' => 'CDI',
            'full time' => 'CDI',
            'unbefristeter arbeitsvertrag' => 'CDI',
            'contract' => 'CDD',
            'part_time' => 'CDD',
            'apprenticeship' => 'Alternance',
            'alternance' => 'Alternance',
            'freelance' => 'Freelance',
            'contractor' => 'Freelance',
            'fixed_term' => 'CDD',
            'cdd' => 'CDD',
            'internship' => 'Stage',
            'stage' => 'Stage',
        ];

        if (isset($directMap[$val])) {
            return $directMap[$val];
        }
        if (str_starts_with($val, 'alternance')) {
            return 'Alternance';
        }
        if ($val !== '' && $val !== 'non spécifié' && $val !== 'unknown') {
            return (string) $raw;
        }

        $haystack = mb_strtolower($titleAndDesc);
        $keywordMap = [
            'Alternance' => ['alternance', 'apprentissage', 'contrat pro'],
            'Stage' => ['stage', 'stagiaire', 'internship'],
            'Freelance' => ['freelance', 'indépendant', 'independant', 'tjm'],
            'CDI' => ['cdi', 'durée indéterminée', 'duree indeterminee'],
            'CDD' => ['cdd', 'durée déterminée', 'duree determinee'],
        ];
        foreach ($keywordMap as $type => $keywords) {
            foreach ($keywords as $kw) {
                if (str_contains($haystack, $kw)) {
                    return $type;
                }
            }
        }

        return 'Non spécifié';
    }

    /**
     * Normalise une offre issue de l'API publique Arbeitnow.
     */
    public function normalizeArbeitnow(array $rawJob): array
    {
        $title = $rawJob['title'] ?? 'Titre inconnu';
        $description = $this->cleanHtmlDescription($rawJob['description'] ?? '');
        $rawContract = $rawJob['job_types'][0] ?? null;
        $externalUrl = $rawJob['url'] ?? ($rawJob['slug'] ?? null);

        $extractedSalary = $this->extractSalaryFromDescription($description);

        return [
            'source_external_id' => $externalUrl && strlen($externalUrl) > 255 ? hash('sha256', $externalUrl) : $externalUrl,
            'title' => $title,
            'description' => $description !== '' ? $description : 'Aucune description',
            'location' => ! empty($rawJob['location']) ? trim($rawJob['location']) : 'Europe',
            'country' => 'Europe',
            'is_remote' => (bool) ($rawJob['remote'] ?? false),
            'contract_type' => $this->normalizeContractType($rawContract, $title.' '.$description),
            'date_of_publi' => $this->normalizeTimestamp($rawJob['created_at'] ?? null),
            'date_of_collect' => now(),
            'salary_min' => $extractedSalary['min'],
            'salary_max' => $extractedSalary['max'],
            'salary_currency' => $extractedSalary['currency'],
            'salary_period' => $extractedSalary['period'],
            'company_name' => trim($rawJob['company_name'] ?? 'Confidentiel'),
            'company_website' => null,
            'company_logo' => null,
        ];
    }

    /**
     * Normalise une offre issue de l'API publique Remotive.
     */
    public function normalizeRemotive(array $rawJob): array
    {
        $title = $rawJob['title'] ?? 'Titre inconnu';
        $description = $this->cleanHtmlDescription($rawJob['description'] ?? '');
        $salaryRaw = trim((string) ($rawJob['salary'] ?? ''));

        $salaryMin = null;
        $salaryMax = null;
        $currency = str_contains($salaryRaw, '$') ? 'USD' : 'EUR';

        if ($salaryRaw !== '' && preg_match_all('/(\d{2,3}\s?[kK]|\d{2,3}(?:[,\s]\d{3})?)/', $salaryRaw, $matches)) {
            $nums = [];
            foreach ($matches[1] as $m) {
                $val = (int) str_replace([',', ' ', 'k', 'K'], ['', '', '000', '000'], $m);
                if ($val >= 1000) {
                    $nums[] = $val;
                }
            }
            if (count($nums) === 1) {
                $salaryMin = $nums[0];
                $salaryMax = $nums[0];
            } elseif (count($nums) >= 2) {
                $salaryMin = min($nums[0], $nums[1]);
                $salaryMax = max($nums[0], $nums[1]);
            }
        }

        $externalUrl = $rawJob['url'] ?? (isset($rawJob['id']) ? (string) $rawJob['id'] : null);

        return [
            'source_external_id' => $externalUrl && strlen($externalUrl) > 255 ? hash('sha256', $externalUrl) : $externalUrl,
            'title' => $title,
            'description' => $description !== '' ? $description : 'Aucune description',
            'location' => ! empty($rawJob['candidate_required_location']) ? mb_substr(trim($rawJob['candidate_required_location']), 0, 250) : 'Remote',
            'country' => 'Remote',
            'is_remote' => true,
            'contract_type' => $this->normalizeContractType($rawJob['job_type'] ?? null, $title.' '.$description),
            'date_of_publi' => $this->normalizeTimestamp($rawJob['publication_date'] ?? null),
            'date_of_collect' => now(),
            'salary_min' => $salaryMin,
            'salary_max' => $salaryMax,
            'salary_currency' => $currency,
            'salary_period' => 'yearly',
            'company_name' => trim($rawJob['company_name'] ?? 'Confidentiel'),
            'company_website' => null,
            'company_logo' => $rawJob['company_logo'] ?? null,
        ];
    }

    public function cleanHtmlDescription(string $html): string
    {
        if ($html === '') {
            return '';
        }

        // Décoder d'abord les entités (&lt;p&gt; -> <p>) avant de traiter/supprimer les balises
        $decoded = html_entity_decode($html, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = preg_replace('/<(h[1-4])[^>]*>(.*?)<\/\1>/is', "\n\n### $2\n", $decoded);
        $text = preg_replace('/<li[^>]*>(.*?)<\/li>/is', "- $1\n", $text);
        $text = preg_replace('/<br\s*\/?>|<\/p>|<\/div>/is', "\n", $text);
        $text = strip_tags($text);
        $text = preg_replace("/\n{3,}/", "\n\n", $text);

        return trim($text);
    }

    /**
     * Extrait une fourchette salariale uniquement depuis les lignes mentionnant explicitement une rémunération.
     *
     * @return array{min: ?int, max: ?int, currency: string, period: string}
     */
    public function extractSalaryFromDescription(string $description): array
    {
        $result = ['min' => null, 'max' => null, 'currency' => 'EUR', 'period' => 'yearly'];
        if ($description === '') {
            return $result;
        }

        foreach (explode("\n", $description) as $line) {
            if (! preg_match('/\b(salaire|rémunération|remuneration|compensation|salary|tjm|gratification|ote)\b/iu', $line)) {
                continue;
            }
            if (preg_match('/\b(million|milliard|levée|budget|raised|arr|revenue)\b/iu', $line)) {
                continue;
            }

            $isHourlyLine = (bool) preg_match('/(?:\/h\b|\b(?:heure|heures|hour|hours|hourly)\b)/iu', $line);
            $minThreshold = $isHourlyLine ? 10 : 150;

            if (preg_match_all('/(?:€|\$|EUR|USD)?\s*(\d{2,3}\s?[kK]|\d{2,3}(?:[\s\x{00A0}\x{202F}.,]\d{3})+|\d{2,4})\s*(?:€|\$|EUR|USD)?/u', $line, $matches)) {
                $nums = [];
                foreach ($matches[1] as $raw) {
                    $clean = str_replace([' ', "\u{00A0}", "\u{202F}", '.', ','], '', $raw);
                    if (preg_match('/^(\d+)[kK]$/', $clean, $km)) {
                        $val = (int) $km[1] * 1000;
                    } else {
                        $val = (int) $clean;
                    }
                    if ($val >= $minThreshold && $val <= 300000) {
                        $nums[] = $val;
                    }
                }

                if (! empty($nums)) {
                    $result['min'] = min($nums);
                    $result['max'] = count($nums) > 1 ? max($nums) : $result['min'];
                    if (str_contains($line, '$') || stripos($line, 'USD') !== false) {
                        $result['currency'] = 'USD';
                    }
                    if ($isHourlyLine) {
                        $result['period'] = 'hourly';
                    } elseif (preg_match('/\b(jour|day|tjm|daily)\b/iu', $line)) {
                        $result['period'] = 'daily';
                    } elseif (preg_match('/\b(mois|month|mensuel)\b/iu', $line)) {
                        $result['period'] = 'monthly';
                    }

                    return $result;
                }
            }
        }

        return $result;
    }
}
