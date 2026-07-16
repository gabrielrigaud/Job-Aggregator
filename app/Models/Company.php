<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = [
        'name',
        'website_url',
        'logo_url',
    ];

    public function jobOffers()
    {
        return $this->hasMany(JobOffer::class);
    }
}
