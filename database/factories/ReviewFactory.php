<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    
    public function definition(): array
    { 
        $userIds = User::pluck('id')->toArray();
        $bookIds = Book::pluck('id')->toArray();
        return [
            'reviewer_id' => fake()->randomElement($userIds),
                'book_reviewed_id' => fake()->randomElement($bookIds),
                'review' => fake()->paragraph(),
                'is_public' => fake()->boolean(),
                'title_review' => fake()->sentence(6),
        ];
    }
}
