<?php

namespace App\Http\Controllers;

use App\Models\UserFollowing;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserFollowingController extends Controller
{
    
    public function addFollow(Request $request){
        return Inertia::render('Poems/poems');
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
