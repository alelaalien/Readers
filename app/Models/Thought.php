<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Thought extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function thoughtTags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'thought_tags', 'thought_id', 'tag_id');
    }

    public function tags():HasManyThrough
    {
        return $this->hasManyThrough(Tag::class, ThoughtTag::class, 'thought_id', 'id', 'id', 'tag_id');
    }
 

    public static function rules(): array
    {
        return [ 
            'content' => 'required|min:200', 
            'title' => 'required|min:2'
        ];
    }

    public function user():BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function comments():MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
