<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOffer extends Model
{
    protected $fillable = [
        'company_id',
        'source_internal_id',
        'source_external_id',
        'title',
        'description',
        'location',
        'country',
        'is_remote',
        'contract_type',
        'date_of_publi',
        'date_of_collect',
        'salary_min',
        'salary_max',
        'salary_currency',
        'salary_period',
        'content_hash',
    ];

    

    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function source() {
        return $this->belongsTo(Source::class, "source_internal_id");
    }

    public function offerViews() {
        return $this->hasMany(OfferView::class);
    }

    public function savedByUsers() {
        return $this->belongsToMany(User::class, 'offer_views')
                    ->wherePivot('is_saved', true)
                    ->withPivot('viewed_at', 'is_saved');
    }
}
