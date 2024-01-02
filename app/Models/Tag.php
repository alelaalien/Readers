<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;
    
    protected $guarded = [];

    public function poems():BelongsToMany
    {
        return $this->belongsToMany(Poem::class, 'poema_tag', 'poem_id', 'tag_id');
    }
}
