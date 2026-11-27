<?php

use App\Services\JobNormalizer;

test('normalizes WeLoveDevs raw job payload to pivot schema', function () {
    $normalizer = new JobNormalizer;

    $raw = [
        'id' => 'wld-123',
        'title' => 'Développeur Fullstack Laravel / React',
        'descriptionPreview' => 'Mission backend et frontend.',
        'formattedPlaces' => ['Lyon, France'],
        'details' => [
            'remotePolicy' => ['frequency' => 'fullTime'],
            'salary' => [
                'min' => 45000,
                'max' => 55000,
                'currency' => 'EUR',
                'recurrence' => 'yearly',
            ],
        ],
        'contractTypes' => ['CDI'],
        'publishDate' => 1700000000000,
        'smallCompany' => [
            'companyName' => 'TechCorp',
            'url' => 'https://techcorp.example',
        ],
    ];

    $normalized = $normalizer->normalizeWeLoveDevs($raw);

    expect($normalized['source_external_id'])->toBe('wld-123')
        ->and($normalized['title'])->toBe('Développeur Fullstack Laravel / React')
        ->and($normalized['location'])->toBe('Lyon, France')
        ->and($normalized['is_remote'])->toBeTrue()
        ->and($normalized['contract_type'])->toBe('CDI')
        ->and($normalized['salary_min'])->toBe(45000)
        ->and($normalized['salary_max'])->toBe(55000)
        ->and($normalized['company_name'])->toBe('TechCorp');
});

test('normalizes Indeed raw job, cleans remote location and hashes long URLs', function () {
    $normalizer = new JobNormalizer;

    $longUrl = 'https://fr.indeed.com/viewjob?'.str_repeat('a=1&', 80);
    $jkUrl = 'https://fr.indeed.com/rc/clk?jk=abc123def456&'.str_repeat('from=serp&', 40);

    $raw = [
        'url' => $longUrl,
        'title' => 'Ingénieur DevOps CDI',
        'company' => 'CloudSAS',
        'location' => 'Télétravail partiel à Marseille (13)',
        'salary' => '48 000 € - 56 000 € par an',
        'description' => 'Gestion Kubernetes et Docker.',
    ];

    $normalized = $normalizer->normalizeIndeed($raw);
    $normalizedJk = $normalizer->normalizeIndeed(['url' => $jkUrl, 'title' => 'Dev']);

    expect($normalized['location'])->toBe('Marseille (13)')
        ->and($normalized['is_remote'])->toBeTrue()
        ->and($normalized['contract_type'])->toBe('CDI')
        ->and($normalized['salary_min'])->toBe(48000.0)
        ->and($normalized['salary_max'])->toBe(56000.0)
        ->and(strlen($normalized['source_external_id']))->toBe(64)
        ->and($normalizedJk['source_external_id'])->toBe('https://fr.indeed.com/viewjob?jk=abc123def456');
});

test('normalizes Arbeitnow and Remotive raw payloads to pivot schema', function () {
    $normalizer = new JobNormalizer;

    $arbeitnow = $normalizer->normalizeArbeitnow([
        'url' => 'https://www.arbeitnow.com/jobs/demo-1',
        'title' => 'Backend PHP Developer',
        'company_name' => 'EuroTech',
        'description' => '<h3>Missions</h3><p>API Laravel &amp; Postgres</p>',
        'remote' => true,
        'location' => 'Berlin',
        'job_types' => ['Unbefristeter arbeitsvertrag'],
        'created_at' => 1760000000,
    ]);

    expect($arbeitnow['title'])->toBe('Backend PHP Developer')
        ->and($arbeitnow['is_remote'])->toBeTrue()
        ->and($arbeitnow['contract_type'])->toBe('CDI')
        ->and($arbeitnow['location'])->toBe('Berlin')
        ->and($arbeitnow['description'])->toContain('### Missions');

    $remotive = $normalizer->normalizeRemotive([
        'url' => 'https://remotive.com/remote-jobs/software-dev/test-1',
        'title' => 'Senior React Engineer',
        'company_name' => 'RemoteCo',
        'description' => '<p>Build fast UIs</p>',
        'job_type' => 'full_time',
        'publication_date' => '2026-11-25T11:26:35',
        'candidate_required_location' => 'Europe',
        'salary' => '$60k - $80k',
    ]);

    expect($remotive['title'])->toBe('Senior React Engineer')
        ->and($remotive['is_remote'])->toBeTrue()
        ->and($remotive['contract_type'])->toBe('CDI')
        ->and($remotive['salary_min'])->toBe(60000)
        ->and($remotive['salary_max'])->toBe(80000)
        ->and($remotive['salary_currency'])->toBe('USD');
});
