<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Trade extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function acceptorUser()
    {
        return $this->belongsTo(User::class, 'acceptor_user_id');
    }

    public function requesterUser()
    {
        return $this->belongsTo(User::class, 'requester_user_id');
    }

    public function acceptorsBook()
    {
        return $this->belongsTo(Book::class, 'acceptors_book_id');
    }

    public function requestersBook()
    {
        return $this->belongsTo(Book::class, 'requesters_book_id');
    }
    
}
