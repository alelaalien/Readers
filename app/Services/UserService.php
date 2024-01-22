<?php
 
namespace App\Services;

use DB;
use App\Models\User;

class UserService {
    public function getUserInfo($id) {
        
        try {
            return User::leftJoin('user_details as d', 'd.user_id', '=', 'users.id')
            ->select([
                'users.id',
                'users.profile_photo_path as pic',
                'users.email_verified_at',
                'd.title',
                'd.description',
                'd.revelations_of_self AS revelations',
                'd.facebook',
                'd.instagram',
                'd.youtube',
                'd.linkedin',
                'd.twitter',
            ])
            ->where('users.id', $id)
            ->get();
        
        } catch (\Throwable $th) {
           
            return false;
        }
    }
 
}
