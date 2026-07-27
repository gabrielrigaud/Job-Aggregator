<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\JobOffer;
use App\Http\Requests\StoreJobOfferRequest;

class JobApiController extends Controller
{
    public function store(StoreJobOfferRequest $request) {
        $jobOffer = JobOffer::create($request->validated());
        return response()->json($jobOffer, 201);
    }
}
