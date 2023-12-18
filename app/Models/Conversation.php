<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Conversation extends Model
{
    use HasFactory;
    protected $table = 'conversations';
    protected $primaryKey = 'id';
    protected $guarded = [];
    public $timestamps = false;   

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->setCreatedAt($model->freshTimestamp());
        });
    }

    public function user() :BelongsTo
    {

        $userId = Auth::id();  

        return $this->belongsTo(User::class, $userId === 'user1_id' ? 'user1_id' : 'user2_id');
    }

    public function messages() :HasMany 
    {  
        return $this->hasMany(Message::class, 'conversation_id');
    }
 
}
