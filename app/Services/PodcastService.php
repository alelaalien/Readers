<?php
 
namespace App\Services;

use App\Models\Podcast;

class PodcastService {

    public function getPodcastByUser($id) {

         return Podcast::where('user_id', $id);
    }
 
}
