<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Services\UserDetailService;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    private $targetDirectory = "public/users/";

    public function show(Request $request)
    {   
       
        $user = app(UserService::class)->getUserInfo($request->id); 

        $url = asset( 'storage/users/'); 
        
        if($user)
        {
            return Inertia::render('Profile/profile', compact('user', 'url'));
        }
        else
        {
            return;
        }         
    }

    public function updateDetails(Request $request)
    { 
        $item = $request->keys(); 
        
        return app(UserDetailService::class)->saveData($request->{$item[0]}, $item[0]); 
    }

    public function updateProfilePhotoPath(Request $request)
    {
        if ($request->hasFile('profile_photo')) {

            $profilePhoto = $request->file('profile_photo'); 

            $newPic = $this->uploadImage($profilePhoto);
             
            $response =  app(UserService::class)->updateProfilePic($newPic);

            if (file_exists($this->targetDirectory.$response)) {

                 unlink($this->targetDirectory.$response);
            } 
            return response()->json($newPic);

        } else {
      
            return response()->json(['error' => 'No image'], 400);
        } 
    }

    public function newMedias(Request $request)
    {   
        
        return app(UserDetailService::class)->newMedias($request);
    }

    private function uploadImage($img)
    {
        $name = $this->randomString();

        $fileName = $name.'.' . $img->getClientOriginalExtension();
 
        $storageUrl = $img->storeAs($this->targetDirectory, $fileName);
 
        Storage::url($storageUrl); 

        return $fileName;
    }

    private function randomString()
    { 
        $rand = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        return substr(str_shuffle($rand), 0, 8); 
    }
}
