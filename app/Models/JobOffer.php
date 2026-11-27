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

    protected $appends = ['apply_url'];

    public function getApplyUrlAttribute(): string
    {
        if ($this->source_external_id && filter_var($this->source_external_id, FILTER_VALIDATE_URL)) {
            return $this->source_external_id;
        }

        if ($this->source_external_id && str_contains($this->source_external_id, 'jk=')) {
            return 'https://fr.indeed.com/viewjob?'.$this->source_external_id;
        }

        // Fallback: Recherche directe sur Indeed pour ce poste et entreprise
        $query = urlencode($this->title.' '.($this->company?->name ?? ''));
        $loc = urlencode($this->location ?? '');

        return "https://fr.indeed.com/jobs?q={$query}&l={$loc}";
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function source()
    {
        return $this->belongsTo(Source::class, 'source_internal_id');
    }

    public function offerViews()
    {
        return $this->hasMany(OfferView::class);
    }

    public function savedByUsers()
    {
        return $this->belongsToMany(User::class, 'offer_views')
            ->wherePivot('is_saved', true)
            ->withPivot('viewed_at', 'is_saved');
    }
}
