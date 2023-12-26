<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model; 
use Illuminate\Database\Eloquent\Relations\BelongsTo; 
 

class Message extends Model
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
        return $this->belongsTo(User::class, 'user_id');
    }
    public function conversation() :BelongsTo
    {
        return $this->belongsTo(Conversation::class, 'conversation_id');
    }
 
 
}
