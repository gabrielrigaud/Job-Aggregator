<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    protected $fillable = [
        'name',
        'url',
        'type', // API, RSS, Scraping
    ];

    public function jobOffers()
    {
        return $this->hasMany(JobOffer::class, 'source_internal_id');
    }
}
