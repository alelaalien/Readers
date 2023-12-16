<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Http\Requests\CreateOrUpdateBookRequest;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
      
    public function show(string $id)
    {
            $book = Book::with(['user', 'reviews', 'user.location.city.state.country'])
            ->where('id', $id)
            ->where('status', 'active')
            ->first();

            $bookGenres = Book::find($id)->genres()->select('id', 'genre')->get();



        if ($book) {
             
            return view('pages.explore-book', ['book' => $book, 'bookGenre' => $bookGenres]);
        } else {
           
            return view('pages.explore-book', ['error' => "Book not found"]);
        }

        // $book->user_since = $book->user->created_at->format('d-m-Y');
/* $book->user_name = $book->user->name;
$book->postal_code = $book->user->location->postal_code;
$book->city = $book->user->location->city->city;
$book->country = $book->user->location->city->state->country->country;

$book->count_books = $book->user->books()->count(); */
    }
 
    public function edit(string $id)
    {
        //
    }

 
    public function destroy(string $id)
    {
   
    }

    public static function showLimit($limit)
    {

        return  Book::select(
            'books.title',
            'books.author',
            'books.id',
            'books.gallery',
            'users.name',
            'books.cover',
            DB::raw('CASE WHEN users.email_verified_at IS NOT NULL THEN TRUE ELSE FALSE END AS verificated')
        )
            ->leftJoin('users', 'books.user_id', '=', 'users.id')
            ->take($limit)
            ->get();

    }
        public function viewAll():View
    {
        $books = Book::paginate(10);

        return view('pages.view-all', compact('books'));
    }
    public function viewAllRelated(Request $request, $g)
    {
        $genreIds = explode('/', $g);
 
        $books = Book::leftJoin('book_genre', 'books.id', '=', 'book_genre.book_id')
            ->whereIn('book_genre.genre_id', $genreIds)
            ->select('books.*', 'users.name', 'users.id as user_id')
            ->join('users', 'books.user_id', '=', 'users.id')
            ->paginate(12);  

            // dd($books);
    
        return view('pages.view-all-related', compact('books'));
    }
    

}
