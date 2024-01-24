<?php
 
namespace App\Services;

use DB;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UserService {
 

    public function getUserInfo($id) {
        
        try {
            return User::leftJoin('user_details as d', 'd.user_id', '=', 'users.id')
            ->select([
                'users.id',
                'users.name',
                'users.email',
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

    public function updateProfilePic($data)
    {
        try {
            $user = User::find(Auth::id());

            $prevImg = $user->profile_photo_path;

            $user->profile_photo_path = $data;

            $user->save();
            
            return $prevImg;

        } catch (\Throwable $th) {

            throw $th;
        }
    }


 
}
