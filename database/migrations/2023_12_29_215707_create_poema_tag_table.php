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
        Schema::create('poema_tag', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('poem_id');
            $table->unsignedBigInteger('tag_id');
            $table->foreign('poem_id')->references('id')->on('poems')->onDelete('cascade'); 
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('poema_tag');
    }
};
