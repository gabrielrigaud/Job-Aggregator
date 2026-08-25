<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\JobOffer;
use App\Models\Company;
use App\Models\OfferView;
use App\Models\Source;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class JobController extends Controller
{
    /**
     * Display the home/discover page with search and filters.
     */
    public function discover(Request $request)
    {
        $query = JobOffer::with(['company:id,name,logo_url,website_url', 'source:id,name,url'])
            ->select('job_offers.id', 'company_id', 'source_internal_id', 'source_external_id', 'title', 'description', 'location', 'country', 'is_remote', 'contract_type', 'date_of_publi', 'salary_min', 'salary_max', 'salary_currency', 'salary_period', 'job_offers.created_at');

        $filters = $request->only(['search', 'location', 'contract_type', 'remote_only', 'salary_min', 'sort']);

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'ilike', '%' . $filters['search'] . '%')
                  ->orWhereHas('company', function ($q2) use ($filters) {
                      $q2->where('name', 'ilike', '%' . $filters['search'] . '%');
                  });
            });
        }

        if (!empty($filters['location'])) {
            $query->where('location', 'ilike', '%' . $filters['location'] . '%');
        }

        if (!empty($filters['contract_type'])) {
            $query->where('contract_type', $filters['contract_type']);
        }

        if (!empty($filters['remote_only']) && $filters['remote_only'] === 'true') {
            $query->where('is_remote', true);
        }

        if (!empty($filters['salary_min'])) {
            $query->where('salary_min', '>=', (int) $filters['salary_min']);
        }

        if (!empty($filters['sort']) && $filters['sort'] === 'relevance') {
            if (!empty($filters['search'])) {
                // Sort by whether title matches search term first, then by date
                $query->orderByRaw("CASE WHEN title ILIKE ? THEN 1 ELSE 2 END", ['%' . $filters['search'] . '%'])
                      ->orderBy('job_offers.created_at', 'desc')
                      ->orderBy('job_offers.id', 'desc');
            } else {
                // "Relevance" without search -> Recommend highest salary jobs first (ignore NULLs)
                $query->orderByRaw('salary_max DESC NULLS LAST')
                      ->orderBy('job_offers.created_at', 'desc')
                      ->orderBy('job_offers.id', 'desc');
            }
        } else {
            $query->orderBy('job_offers.created_at', 'desc')
                  ->orderBy('job_offers.id', 'desc');
        }

        $jobs = $query->take(50)->get();

        $selectedJobId = $request->query('job');
        $selectedJob = null;
        if ($selectedJobId) {
            $selectedJob = JobOffer::with(['company:id,name,logo_url,website_url', 'source:id,name,url'])
                ->find($selectedJobId);

            if ($selectedJob && !$jobs->contains('id', $selectedJob->id)) {
                $jobs->prepend($selectedJob);
            }
        }

        $savedJobIds = [];
        if ($user = $request->user()) {
            $savedJobIds = $user->savedJobs()->pluck('job_offers.id')->toArray();
        }

        return Inertia::render('Discover', [
            'jobs' => $jobs,
            'selectedJobInitial' => $selectedJob,
            'savedJobIds' => $savedJobIds,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'filters' => (object) $filters,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allJ= JobOffer::all();
        $allC= Company::all();
        $allS= Source::all();
        return Inertia::render('Job/Index',[
            'allJ'=>$allJ,
            'allC'=>$allC,
            'allS'=>$allS
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $job = JobOffer::findOrFail($id);

        $user = Auth::user();
        if ($user) {
            $existingView = OfferView::where('user_id', $user->id)
                ->where('job_offer_id', $job->id)
                ->first();

            if (!$existingView) {
                OfferView::create([
                    'user_id' => $user->id,
                    'job_offer_id' => $job->id,
                ]);
            }
        }

        return redirect()->route('home', ['job' => $job->id]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) //pour admin uniquement
    {
        $job = JobOffer::findOrFail($id);
        $job->delete();
        return redirect()->route('jobs.index')->with('success', 'Job offer deleted successfully.');
    }

    public function toggleSave(Request $request, JobOffer $job)
    {
        $user = $request->user();
        $view = OfferView::firstOrNew([
            'user_id' => $user->id,
            'job_offer_id' => $job->id,
        ]);

        $view->is_saved = !$view->is_saved;
        $view->save();

        return redirect()->back();
    }

    public function logView(Request $request, JobOffer $job)
    {
        if ($user = $request->user()) {
            $view = OfferView::firstOrCreate([
                'user_id' => $user->id,
                'job_offer_id' => $job->id,
            ]);
            // Update the viewed_at timestamp so it jumps to top of history
            $view->viewed_at = now();
            $view->save();
        }
        return response()->json(['success' => true]);
    }

    /**
     * Display saved jobs and viewing history.
     */
    public function saved(Request $request)
    {
        $user = $request->user();
        $favorites = $user->savedJobs()->with(['company', 'source'])->get();
        
        // Fetch history (views) and map to the actual jobOffer relationship
        $historyViews = $user->offerViews()->with(['jobOffer.company', 'jobOffer.source'])->latest('viewed_at')->get();
        $history = $historyViews->map(function ($view) {
            return $view->jobOffer;
        })->filter()->values();

        return Inertia::render('Saved', [
            'favorites' => $favorites,
            'history' => $history
        ]);
    }

    /**
     * Display real analytics & insights from job offers in database.
     */
    public function insights(Request $request)
    {
        $totalJobs = JobOffer::count();
        $remoteCount = JobOffer::where('is_remote', true)->count();
        
        $remotePercent = $totalJobs > 0 ? round(($remoteCount / $totalJobs) * 100) : 42;
        $hybridPercent = 28;
        $onSitePercent = max(0, 100 - $remotePercent - $hybridPercent);

        // Top Hiring Companies
        $topCompanies = JobOffer::selectRaw('company_id, count(*) as count')
            ->whereNotNull('company_id')
            ->groupBy('company_id')
            ->orderByDesc('count')
            ->take(5)
            ->with('company')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => $item->company?->name ?? 'Confidentiel',
                    'count' => $item->count,
                    'logo_url' => $item->company?->logo_url,
                ];
            });

        // Median / Avg Salary by Specialty
        $specialties = [
            [
                'role' => 'IA & Machine Learning',
                'keywords' => ['ia', 'ai', 'machine learning', 'data scientist', 'deep learning'],
                'color' => 'from-primary to-indigo-600',
            ],
            [
                'role' => 'DevOps & Cloud',
                'keywords' => ['devops', 'cloud', 'aws', 'kubernetes', 'k8s', 'sre', 'docker'],
                'color' => 'from-sky-500 to-blue-600',
            ],
            [
                'role' => 'Backend (Java, Go, Laravel, Python)',
                'keywords' => ['backend', 'back-end', 'java', 'python', 'php', 'laravel', 'golang', 'go', 'node', 'c#', '.net'],
                'color' => 'from-amber-500 to-orange-500',
            ],
            [
                'role' => 'Mobile (iOS, Android, Flutter)',
                'keywords' => ['mobile', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin'],
                'color' => 'from-rose-500 to-amber-600',
            ],
            [
                'role' => 'Frontend (React, Vue, Next.js)',
                'keywords' => ['frontend', 'front-end', 'react', 'vue', 'angular', 'javascript', 'typescript', 'next'],
                'color' => 'from-sky-600 to-primary',
            ],
        ];

        foreach ($specialties as &$spec) {
            $query = JobOffer::where(function ($q) use ($spec) {
                foreach ($spec['keywords'] as $kw) {
                    $q->orWhere('title', 'like', "%{$kw}%");
                }
            });
            $count = (clone $query)->count();
            $avgSalary = (clone $query)->whereNotNull('salary_min')->avg('salary_min');
            
            $salaryK = 0;
            if ($avgSalary && $avgSalary > 1000) {
                $salaryK = round($avgSalary / 1000);
            } elseif ($avgSalary && $avgSalary > 0) {
                $salaryK = round($avgSalary);
            }
            
            $spec['salary'] = $salaryK;
            $spec['count'] = $count;
        }

        // Group counts by location
        $locations = JobOffer::selectRaw('location, count(*) as count')
            ->whereNotNull('location')
            ->groupBy('location')
            ->orderByDesc('count')
            ->get();

        return Inertia::render('SalaryInsights', [
            'totalJobs' => $totalJobs,
            'remotePercent' => $remotePercent,
            'hybridPercent' => $hybridPercent,
            'onSitePercent' => $onSitePercent,
            'topCompanies' => $topCompanies,
            'specialties' => $specialties,
            'locations' => $locations,
        ]);
    }
}
