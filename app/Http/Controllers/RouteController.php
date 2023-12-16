<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Inertia\Inertia;

class RouteController extends Controller
{
    public function index():View
    {
         $limit =  8;
         $books = BookController::showLimit($limit);
        //  $orders = OrderController::showLimit($limit); 'orders', 'reviews', 
        //  $reviews = ReviewController::showLimit($limit);
         $poems = PoemController::showLimit(5);
        Inertia::render('welcome');
         return view('pages.home', compact('books','poems'));
    }
}
