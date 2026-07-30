<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password', 'bio', 'job_title', 'linkedin_url'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $appends = ['profile_completion'];

    public function getProfileCompletionAttribute(): int
    {
        $fields = ['name', 'email', 'bio', 'job_title', 'linkedin_url'];
        $filled = 0;
        foreach ($fields as $field) {
            if (!empty($this->{$field})) {
                $filled++;
            }
        }
        return (int) round(($filled / count($fields)) * 100);
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function offerViews()
    {
        return $this->hasMany(OfferView::class);
    }

    public function savedJobs()
    {
        return $this->belongsToMany(JobOffer::class, 'offer_views')
                    ->wherePivot('is_saved', true)
                    ->withPivot('viewed_at', 'is_saved');
    }
}
