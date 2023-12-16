<?php
 
namespace App\Services;

use App\Models\UserDetail;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class UserDetailService {

    public function getDetailByUser($id) {

         return UserDetail::where('user_id', $id)->first();
    }

    public function getFieldByUser($id, $field) 
    {
        return UserDetail::where('user_id', $id)->value($field);
 
    }

    public function getSocialMediasById($id)
    {
        return UserDetail::where('user_id', $id)
                ->select('facebook', 'twitter', 'youtube', 'instagram', 'linkedin' )
                ->first();
    }
 
    public function saveData($data, $field)
    {
        $userId = auth()->user()->id; 

        $userDetail = UserDetail::where('user_id', $userId)->first();

        $validatedData = Validator::make([$field => $data], [

            $field => 'required|string',  

        ])->validate();
        
        try {
              
            if ($userDetail) {
                
                $userDetail->{$field} = $validatedData[$field];

                $userDetail->save();

                return true;
                
            } else {
                
                $userDetail = new UserDetail();

                $userDetail->{$field} = $validatedData[$field];

                $userDetail->user_id = $userId;
        
                $userDetail->save();

                return true;
            }
        } catch (\Throwable $th) {
                
            return false;
        }
    }

    public function updateSocialMedias($newPublics, $values)
    { 
        $userId = auth()->user()->id; 

        $userDetail = UserDetail::where('user_id', $userId)->first();

        foreach ($values as $key => $value) {
            
            $userDetail->{$key} = $value;
        } 
          $userDetail->save();  

        Session::flash('message', 'Success!');
        
        return $newPublics;
    }
 
}
