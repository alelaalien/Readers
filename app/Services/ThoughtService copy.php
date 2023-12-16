<?php
 
namespace App\Services;

use App\Models\Thought;

class ThoughtService {

    public function getThoughtByUser($id) {

         return Thought::where('user_id', $id);
    }
 
}
