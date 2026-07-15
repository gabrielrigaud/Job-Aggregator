<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferView extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'job_offer_id',
        'user_id',
        'viewed_at',
    ];

    protected $casts = [
        'viewed_at' => 'datetime',
    ];

    public function jobOffer()
    {
        return $this->belongsTo(JobOffer::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
