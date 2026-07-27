<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\JobOffer;
use App\Models\Company;
use App\Models\OfferView;
use App\Models\Source;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
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

        return Inertia::render('Job/Show', [
            'job' => $job
        ]);

        
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
}
