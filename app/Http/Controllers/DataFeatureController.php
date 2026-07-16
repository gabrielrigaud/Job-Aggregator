<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobOffer;
use App\Models\Source;
use Illuminate\Support\Facades\DB;

class DataFeatureController extends Controller
{
    /**
     * Compare plusieurs offres d'emploi (par IDs).
     */
    public function compare(Request $request)
    {
        $offerIds = $request->input('ids', []);

        if (empty($offerIds)) {
            return response()->json(['error' => 'Veuillez fournir un tableau d\'IDs d\'offres.'], 400);
        }

        $offers = JobOffer::with(['company', 'source'])
            ->whereIn('id', $offerIds)
            ->get();

        return response()->json([
            'count' => $offers->count(),
            'offers' => $offers
        ]);
    }

    /**
     * Fournit les statistiques pour le tableau de bord / Data Viz.
     */
    public function stats()
    {
        // 1. Volumétrie par source
        $volumeBySource = DB::table('job_offers')
            ->join('sources', 'job_offers.source_internal_id', '=', 'sources.id')
            ->select('sources.name', DB::raw('count(*) as total'))
            ->groupBy('sources.name')
            ->get();

        // 2. Géo-mapping (count par lieu/pays)
        $locations = JobOffer::select('location', DB::raw('count(*) as total'))
            ->whereNotNull('location')
            ->groupBy('location')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get();

        // 3. Salaire médian (calcul basique SQL sur la moyenne min/max)
        $salaryStats = JobOffer::select(
            DB::raw('AVG(salary_min) as avg_min_salary'),
            DB::raw('AVG(salary_max) as avg_max_salary')
        )->whereNotNull('salary_min')->first();

        return response()->json([
            'volume_by_source' => $volumeBySource,
            'top_locations'    => $locations,
            'salary_stats'     => $salaryStats,
            // Nuage de mots : à générer côté front (via JS) à partir des descriptions de l'API listant les jobs
        ]);
    }
}
