<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Genre;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class BookGenreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {   
        $booksId = Book::pluck('id');
        $genresId = Genre::pluck('id');
        return [
             'book_id' => fake()->randomElement($booksId),
             'genre_id' => fake()->randomElement($$genresId)
        ];
    }
}
