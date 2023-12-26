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
        // Schema::create('messages', function (Blueprint $table) {
        //     $table->id();
        //     $table->unsignedBigInteger('user_id');
        //     $table->unsignedBigInteger('conversation_id');
        //     $table->longText('content');
        //     $table->string('attachment_path');
        //     $table->softDeletes();
        //     $table->timestamp('created_at')->nullable();
        //     $table->foreign('user_id')->references('id')->on('users')->index();
        //     $table->foreign('conversation_id')->references('id')->on('conversations')->index();
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
