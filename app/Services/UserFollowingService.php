<?php
 
namespace App\Services;

use App\Models\UserFollowing;
 

class UserFollowingService {

    public function isFollowing($followed_id, $follower_id) {
         
        $isFollowing = UserFollowing::where('follower_id', $follower_id)
        ->where('followed_id', $followed_id)
        ->first();
    
        if ($isFollowing) {
            
            $isFollowing->delete(); 
            return 0;

        } else {

            $data = new UserFollowing();
            $data->followed_id = $followed_id;
            $data->follower_id = $follower_id;
            $data->save();
            return 1;
        } 
       
    }
}