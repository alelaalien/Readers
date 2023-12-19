<?php

namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use App\Models\UserFollowing;
use App\Services\UserFollowingService; 

class UserFollowingController extends Controller
{
    
    public function addFollow(Request $request){
  
        $follower_id = auth()->user()->id;

        return app(UserFollowingService::class)->isFollowing($request->followed_id, $follower_id);
   
 
    }
    public function show(UserFollowing $userFollowing)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserFollowing $userFollowing)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserFollowing $userFollowing)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserFollowing $userFollowing)
    {
        //
    }
}
