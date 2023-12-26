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
        Schema::create('trades', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('acceptor_user_id');
            $table->unsignedBigInteger('requester_user_id');
            $table->unsignedBigInteger('acceptors_book_id');
            $table->unsignedBigInteger('requesters_book_id');
            $table->enum('status', ['pending', 'successful', 'canceled'])->default('pending');
            $table->timestamps();

            $table->foreign('acceptor_user_id')->references('id')->on('users');
            $table->foreign('requester_user_id')->references('id')->on('users');
            $table->foreign('acceptors_book_id')->references('id')->on('books');
            $table->foreign('requesters_book_id')->references('id')->on('books');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trades');
    }
};
