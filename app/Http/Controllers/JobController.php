<?php

namespace App\Http\Controllers;

use App\Models\JobOffer;
use App\Models\OfferView;
use App\Services\JobQueryService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class JobController extends Controller
{
    public function __construct(private JobQueryService $jobQuery) {}

    public function discover(Request $request)
    {
        $filters = $request->only(['search', 'location', 'contract_type', 'remote_only', 'salary_min', 'sort']);

        $jobs = $this->jobQuery->search($filters, 30);
        $scoredCollection = $this->jobQuery->attachRelevanceScores($jobs->getCollection(), $request->user(), $filters['search'] ?? null);

        $selectedJobId = $request->query('job');
        $selectedJob = null;
        if ($selectedJobId) {
            $selectedJob = JobOffer::with(['company:id,name,logo_url,website_url', 'source:id,name,url'])
                ->find($selectedJobId);

            if ($selectedJob) {
                $selectedJob = $this->jobQuery
                    ->attachRelevanceScores(collect([$selectedJob]), $request->user(), $filters['search'] ?? null)
                    ->first();

                if (! $scoredCollection->contains('id', $selectedJob->id)) {
                    $scoredCollection->prepend($selectedJob);
                }
            }
        }

        $jobs->setCollection($scoredCollection);

        $savedJobIds = [];
        if ($user = $request->user()) {
            $savedJobIds = $user->savedJobs()->pluck('job_offers.id')->toArray();
        }

        return Inertia::render('Discover', [
            'jobs' => $jobs,
            'selectedJobInitial' => $selectedJob,
            'savedJobIds' => $savedJobIds,
            'marketSummary' => $this->jobQuery->getMarketSummary(),
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'filters' => (object) $filters,
        ]);
    }

    public function show(string $id)
    {
        $job = JobOffer::findOrFail($id);

        if ($user = Auth::user()) {
            OfferView::firstOrCreate([
                'user_id' => $user->id,
                'job_offer_id' => $job->id,
            ]);
        }

        return redirect()->route('home', ['job' => $job->id]);
    }

    public function toggleSave(Request $request, JobOffer $job)
    {
        $user = $request->user();

        $view = OfferView::firstOrNew([
            'user_id' => $user->id,
            'job_offer_id' => $job->id,
        ]);

        $view->is_saved = ! $view->is_saved;
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
            $view->viewed_at = now();
            $view->save();
        }

        return response()->json(['success' => true]);
    }

    public function saved(Request $request)
    {
        $user = $request->user();
        $favorites = $user->savedJobs()->with(['company', 'source'])->get();

        $history = $user->offerViews()
            ->with(['jobOffer.company', 'jobOffer.source'])
            ->latest('viewed_at')
            ->get()
            ->map(fn ($view) => $view->jobOffer)
            ->filter()
            ->values();

        return Inertia::render('Saved', [
            'favorites' => $favorites,
            'history' => $history,
        ]);
    }

    public function insights()
    {
        return Inertia::render('SalaryInsights', $this->jobQuery->getInsights());
    }
}
