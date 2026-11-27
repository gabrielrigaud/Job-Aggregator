<?php

use App\Models\JobOffer;
use App\Models\Source;
use App\Services\JobIngestor;

test('JobIngestor inserts a normalized offer and deduplicates by content_hash and source_external_id', function () {
    $source = Source::create([
        'name' => 'Indeed',
        'url' => 'https://fr.indeed.com',
        'type' => 'Scraping',
    ]);

    $ingestor = new JobIngestor;

    $payload = [
        'source_external_id' => 'https://fr.indeed.com/viewjob?jk=test999',
        'title' => 'Développeur Laravel',
        'description' => 'Conception API REST et PostgreSQL.',
        'location' => 'Paris',
        'country' => 'France',
        'is_remote' => true,
        'contract_type' => 'CDI',
        'date_of_publi' => now(),
        'date_of_collect' => now(),
        'salary_min' => 45000,
        'salary_max' => 52000,
        'salary_currency' => 'EUR',
        'salary_period' => 'yearly',
        'company_name' => 'Acme Tech',
        'company_website' => null,
        'company_logo' => null,
    ];

    // Première insertion -> true
    expect($ingestor->ingest($payload, $source))->toBeTrue()
        ->and(JobOffer::count())->toBe(1);

    // Doublon exact (même content_hash) -> false
    expect($ingestor->ingest($payload, $source))->toBeFalse()
        ->and(JobOffer::count())->toBe(1);

    // Même source_external_id avec description modifiée -> false (idempotence)
    $modifiedPayload = array_merge($payload, ['description' => 'Nouvelle description.']);
    expect($ingestor->ingest($modifiedPayload, $source))->toBeFalse()
        ->and(JobOffer::count())->toBe(1);
});
