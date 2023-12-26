<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $gallery = [];

        for ($i = 0; $i < 5; $i++) { 

            $gallery[] = \Faker\Factory::create()->word() . ".jpg";
        }
        $userIds = User::pluck('id')->toArray();

        return [
            
            'title'  => fake()-> words(3, true) , 
            'editorial'         => fake()-> words(2, true),
            'author'            => fake()-> name(),
            'pages'             => fake()-> numberBetween(200, 2000),
            'ISBN'              => fake()-> isbn10(),
            'synopsis'          => fake()-> paragraph(),
            'user_id'           => fake()->randomElement($userIds),
            "publication_date"  => fake()-> date(),
            "rate"              => fake()-> numberBetween(0, 5),
            'gallery'           => json_encode($gallery), 
            'cover'             => fake()-> word() . ".jpg",
            'width'             => fake()-> randomFloat(2),
            'height'            => fake()-> randomFloat(2)  

        ];
    }
}
 