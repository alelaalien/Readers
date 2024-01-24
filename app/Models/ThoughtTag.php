<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ThoughtTag extends Model
{
    use HasFactory;

    protected $fillable = ['thought_id', 'tag_id'];

    public $timestamps = false;
    
    public function thoughts(): BelongsToMany
    {
        return $this->belongsToMany(Thought::class, 'thought_tags', 'thought_id', 'tag_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'thought_tags', 'tag_id', 'thought_id');
    }
}
