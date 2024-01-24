<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{ 
    public function up(): void
    {
        Schema::create('thought_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('thought_id');
            $table->unsignedBigInteger('tag_id');
            $table->foreign('thought_id')->references('id')->on('thoughts')->onDelete('cascade'); 
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade');
            
        });
    }
 
    public function down(): void
    {
        Schema::dropIfExists('thought_tags');
    }
};
