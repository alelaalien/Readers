<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class MainController extends Controller
{
    public function index() 
    {   
        // $poems = app(PoemController::class)->
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'), 
        ]);
    }
}
