<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class PoemTag extends Model
{
    use HasFactory;

    protected $fillable = ['poem_id', 'tag_id'];

    public $timestamps = false;
    
    public function poems(): BelongsToMany
    {
        return $this->belongsToMany(Poem::class, 'poem_tags', 'poem_id', 'tag_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'poem_tags', 'tag_id', 'poem_id');
    }
}
