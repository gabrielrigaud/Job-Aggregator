<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Services\CompanyLogoResolver;
use Illuminate\Console\Command;

class EnrichCompanyLogos extends Command
{
    protected $signature = 'companies:enrich-logos';

    protected $description = 'Récupère automatiquement les logos manquants des entreprises';

    public function handle(CompanyLogoResolver $resolver): int
    {
        $companies = Company::whereNull('logo_url')->orWhere('logo_url', '')->get();

        if ($companies->isEmpty()) {
            $this->info('Toutes les entreprises ont déjà un logo.');

            return Command::SUCCESS;
        }

        $updated = 0;

        foreach ($companies as $company) {
            $resolved = $resolver->resolve($company->name, $company->website_url);
            if ($resolved['logo_url']) {
                $company->update([
                    'website_url' => $company->website_url ?: $resolved['website_url'],
                    'logo_url' => $resolved['logo_url'],
                ]);
                $updated++;
            }
        }

        $this->info("{$updated} / {$companies->count()} entreprises enrichies avec un logo.");

        return Command::SUCCESS;
    }
}
