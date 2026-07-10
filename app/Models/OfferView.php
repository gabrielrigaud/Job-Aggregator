<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfferView extends Model
{
    public function jobOffer() {
        return $this->belongsTo(JobOffer::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
