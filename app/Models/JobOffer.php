<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobOffer extends Model
{
    public function company() {
        return $this->belongsTo(Company::class);
    }

    public function source() {
        return $this->belongsTo(Source::class, "source_internal_id");
    }

    public function offerViews() {
        return $this->hasMany(OfferView::class);
    }
}
