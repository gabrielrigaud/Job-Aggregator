<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JobOffer;

class JobApiController extends Controller
{
    public function store(Request $request) {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'source_external_id' => 'required|url|max:255',
            'source_internal_id' => 'required|string|max:255',
            'company_id' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'salary_min' => 'nullable|numeric',
            'salary_max' => 'nullable|numeric',
            'contract_type' => 'nullable|string|max:255',
            'is_remote' => 'nullable|boolean',
        ]);

        $jobOffer = JobOffer::create($request->all());
        return response()->json($jobOffer, 201);
    }
}
