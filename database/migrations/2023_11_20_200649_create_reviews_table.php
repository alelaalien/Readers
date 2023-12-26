<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reviewer_id');  
            $table->unsignedBigInteger('book_reviewed_id');  
            $table->text('review');
            $table->boolean('is_public')->default(true);
            $table->string('title_review', 100);  
            $table->timestamps();
            
           
            $table->foreign('reviewer_id')->references('id')->on('users');
            $table->foreign('book_reviewed_id')->references('id')->on('books');
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
