<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Reportable extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = ['reason'];

    public static function rules($id = null)
    {
        return [
            'reason' => 'max:255' 
        ];
    }
    public function user():HasOne
    {
        return $this->hasOne(User::class, 'reported_by');
    }

    public function reportable(): MorphTo
    {
        return $this->morphTo();
    }
}
