<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PoemController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportableController;
use App\Http\Controllers\UserFollowingController;
use App\Models\Comment;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'), 
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//poems
  Route::resource('poems', PoemController::class)->only('store', 'update', 'destroy', 'create');
 

//comments 
  Route::post('/addComment', [CommentController::class, 'store'])->name('addComment');
  Route::delete('/deleteComment/{id}', [CommentController::class, 'destroy'])->name('deleteComment');
  Route::put('/updateComment/{id}', [CommentController::class, 'update'])->name('updateComment');
//replies
  Route::post('/addReply', [ReplyController::class, 'store'])->name('addReply'); 
  Route::delete('/deleteReply/{id}', [ReplyController::class, 'destroy'])->name('deleteReply');
  Route::put('/updateReply/{id}', [ReplyController::class, 'update'])->name('updateReply');
//reports
Route::post('/addReport', [ReportableController::class, 'store'])->name('addReport');
Route::delete('/cancelReport/{id}', [ReportableController::class, 'destroy'])->name('cancelReport');
Route::get('/itemReport/{item}', [ReportableController::class, 'show'])->name('itemReport');

//reactions
Route::post('/follow', [UserFollowingController::class, 'addFollow'])->name('follow');
});

 
    
Route::get('/poem/{id}',  [PoemController::class, 'poem'] )->name('poem');
Route::get('/poems',  [PoemController::class, 'index'] )->name('showPoems');
Route::post('/poemsScroll',  [PoemController::class, 'scroll'] )->name('poemsScroll');
Route::post('/poemsList',  [PoemController::class, 'poemsByTag'] )->name('poemsList');
 
require __DIR__.'/auth.php';
