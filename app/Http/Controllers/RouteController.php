<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class RouteController extends Controller
{
    public function index():View
    {
         $limit =  8;
         $books = BookController::showLimit($limit);
         $orders = OrderController::showLimit($limit);
         $reviews = ReviewController::showLimit($limit);
         $poems = PoemController::showLimit(5);
         return view('pages.home', compact('books', 'orders', 'reviews', 'poems'));
    }
}
