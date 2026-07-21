<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\JobOffer;
use App\Models\Company;
use App\Models\Source;
use Inertia\Inertia;

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
        return redirect()->route('job.index')->with('success', 'Job offer deleted successfully.');
    }
}
