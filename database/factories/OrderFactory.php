<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $usersId = User::pluck('id');
        return [

            'commenter_id' => fake()->randomElement($usersId),
            'book_name' => fake()->words(3, true) ,
            'comment' => fake()-> words(random_int(3, 15), true)
        ];
    }
}
