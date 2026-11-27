<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJobOfferRequest;
use App\Models\JobOffer;

class JobApiController extends Controller
{
    public function store(StoreJobOfferRequest $request)
    {
        $jobOffer = JobOffer::create($request->validated());

        return response()->json($jobOffer, 201);
    }
}
