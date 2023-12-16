<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookController;
use App\Http\Controllers\PoemController; 
use App\Http\Controllers\RouteController;
use App\Http\Controllers\ThoughtController;
use App\Http\Controllers\UserController;  
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

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
});

 
 
Route::get('/', [RouteController::class, 'index']);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/', [RouteController::class, 'index']);
});
 
Route::get("/explore-book/{id}", [BookController::class, 'show'])->name('explore-book');
Route::get("/view-all", [BookController::class, 'viewAll'])->name('view-all');
Route::get('/view-all-related/{g}', [BookController::class, 'viewAllRelated'])->where('g', '.*')->name('view-all-related');
Route::get("/user-profile/{id}", [UserController::class, 'show'])->name('user-profile');
Route::get("/profiles/{id}", [ProfileController::class, 'showProfile'])->name('profiles');
Route::get("/poems/{id}", [PoemController::class, 'showPoems'])->name('poems');
Route::get("/ecos", [ThoughtController::class, 'showEco'])->name('ecos');
Route::get('/new/', [RouteController::class, 'create']);

 
require __DIR__.'/auth.php';