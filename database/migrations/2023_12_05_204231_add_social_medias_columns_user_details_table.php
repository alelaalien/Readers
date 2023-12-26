<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{ 
    public function up(): void
    {
        Schema::table('user_details', function(Blueprint $table){
        
            $table->string('social_medias')->nullable();
        });
    }

    
    public function down(): void
    { 
    }
};
