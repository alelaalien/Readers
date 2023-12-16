<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void{

        Schema::create('locations', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('city_id'); 
                $table->string('postal_code');
                $table->timestamps();
            
                $table->foreign('city_id')->references('id')->on('cities'); 
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('locations');
    }
};
