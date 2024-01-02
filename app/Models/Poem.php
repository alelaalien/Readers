<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Poem extends Model
{
    use HasFactory;

    protected $guarded = [];
 

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function comments() :MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
    public function tags():BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'poema_tag', 'tag_id', 'poem_id');
    }
 
    public static $rules = [
        'context' => 'required|min:500', 
        'title' => 'required|min:2'
    ];
}
