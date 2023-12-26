<?php

namespace Database\Factories;

 
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str; 

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name,
                'email' => fake()->unique()->safeEmail,
                'email_verified_at' => now(),
                'password' => Hash::make('password'), // Cambiar 'password' por la contraseña que desees para los usuarios falsos
                'remember_token' => Str::random(10),
                'profile_photo_path' => fake()->imageUrl(), // O cualquier método para generar una URL de imagen
                'location_id' => null, 
                'created_at' => now(),
                'updated_at' => now(),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }

 
}
