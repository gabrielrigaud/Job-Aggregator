<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/jobs', [\App\Http\Controllers\JobApiController::class, 'store'])->middleware('auth:sanctum');