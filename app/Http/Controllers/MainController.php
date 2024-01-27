<?php

namespace App\Http\Controllers;

use App\Services\MainService;
use Exception;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

class MainController extends Controller
{
    public function index() 
    {    
        $result = app(MainService::class)->loadIndex();
 
        return Inertia::render('Welcome', [
            'data' => $result->original,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'), 
        ]);
    }
}

