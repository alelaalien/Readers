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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('editorial')->nullable();
            $table->string('author');
            // $table->unsignedBigInteger('genre_id'); eliminado
            $table->integer('pages')->nullable();
            $table->string('ISBN')->nullable()->unique();
            $table->text('synopsis')->nullable(); 
            $table->unsignedBigInteger('user_id');
            $table->date("publication_date")->nullable();
            $table->double("rate");
            $table->text('gallery')->nullable();  
            $table->enum('status', ['active', 'hidden'])->default('active');  
            $table->double('width')->nullable();
            $table->double('height')->nullable();
            $table->timestamps();
            
            $table->foreign('genre_id')->references('id')->on('genres');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
