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
        // Schema::table('users', function (Blueprint $table) {
             
        //         $table->string('facebook')->nullable();  
        //         $table->string('instagram')->nullable();  
        //         $table->string('twitter')->nullable();  
        //         $table->string('youtube')->nullable();  
        //         $table->string('public_social_medias', 15)->nullable();
                 
           
        // });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            //
        });
    }
};
