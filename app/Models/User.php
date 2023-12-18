<?php

namespace App\Models;
 
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
 
    protected $fillable = [
        'name',
        'email',
        'password',
    ];
 
    protected $hidden = [
        'password',
        'remember_token',
    ];
 
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // protected $appends = [
    //     'profile_photo_url',
    // ];

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
    public function location() :BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_id');
    }

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
    public function podcasts():HasMany
    {
        return $this->hasMany(Podcast::class);
    }
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
