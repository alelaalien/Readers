<?php

use Inertia\Inertia;
use App\Models\Reply;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Controllers\PoemController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserFollowingController;
 

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

  Route::resource('poems', PoemController::class)->only('store', 'update', 'destroy');
  Route::post('/addComment', [CommentController::class, 'store'])->name('addComment');
  Route::post('/addReply', [ReplyController::class, 'store'])->name('addReply');
  

});

 
 
   Route::post('/follow', [UserFollowingController::class, 'addFollow'])->name('follow');
    
 

    Route::get('/csrf-token', function() {
        return response()->json(['csrf_token' => csrf_token()]);
    });
    
Route::get('poems/{id}',  [PoemController::class, 'index'] )->name('poems');


require __DIR__.'/auth.php';
