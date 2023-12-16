<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
 
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne; 
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto; 

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
    
    public function trades() :HasMany
    {
        return $this->hasMany(Trade::class);
    }
    // public function location() :BelongsTo
    // {
    //     return $this->belongsTo(Location::class, 'location_id');
    // }

    public function messages() :HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function user_details():HasOne
    {
        return $this->hasOne(UserDetail::class);
    }

    public function poems():HasMany
    {
        return $this->hasMany(Poem::class);
    }
    // public function podcasts():HasMany
    // {
    //     return $this->hasMany(Podcast::class);
    // }
    public function thoughts():HasMany
    {
        return $this->hasMany(Thought::class);
    }
    public function comments():HasMany
    {
        return $this->hasMany(Comment::class);
    }
    public function replies():HasMany
    {
        return $this->hasMany(Reply::class);
    }
}
