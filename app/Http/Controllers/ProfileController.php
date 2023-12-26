<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\View\View;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\PoemService;
use App\Services\ReviewService;
use App\Services\ThoughtService;
use App\Services\UserDetailService;
use App\Services\UserService; 

class ProfileController extends Controller
{
    
 
    private $userService, $detailService, $thinking, $reviewService, $podcastService, $poemService;
 
    public function __construct(UserService $userService,
                                UserDetailService $detailService,
                                PoemService $poemService,
                                ThoughtService $thinking,
                                ReviewService $reviewService,
                                // PodcastService $podcastService
                                )
    {
        $this->userService = $userService;
        $this->detailService = $detailService;
        $this->poemService = $poemService;
        $this->thinking = $thinking;
        $this->reviewService = $reviewService;
        // $this->podcastService = $podcastService;
        
    }
     

    public function showProfile(string $id):View
    {
        $user = $this->userService->getUserById($id);

        if(!$user){
            return view('error.user_not_found');
        }

        $detail = $this->detailService->getDetailByUser($id); 
        $poem = $this->poemService->getPoemByUser($id);
        $review = $this->reviewService->getReviewByUser($id);
        $thinking = $this->thinking->getThoughtByUser($id);
        // $podcast = $this->podcastService->getPodcastByUser($id);
        $isProfileOwner = $this->checkProfileOwner($id);
        $socialMediaPaint = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'web'];

        return view('pages.profiles', compact(
            'user',
            'detail',
            'poem',
            'review',
            'thinking',
            'isProfileOwner',
            'socialMediaPaint'
            // 'podcast' 
        ));
   
        
    }

    private function checkProfileOwner($id):bool
    {
        if(auth()->check()){
    
            return auth()->user()->id == $id;   
        }
        
        return false;
    }

    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
