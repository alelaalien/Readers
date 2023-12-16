<?php
 
namespace App\Services;

use App\Models\Review;

class ReviewService {

    public function getReviewByUser($id) {

         return Review::where('user_id', $id);
    }
 
}
