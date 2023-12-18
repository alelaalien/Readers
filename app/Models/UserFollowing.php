<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserFollowing extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function followedUsers(): HasMany
    {
        return $this->hasMany(User::class, 'follower_id');
    }
    
    public function followers(): BelongsTo
    {
        return $this->belongsTo(User::class, 'followed_id');  
    }
    

}
