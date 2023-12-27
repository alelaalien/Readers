<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  
    public function up(): void
    { 
            Schema::create('reportables', function (Blueprint $table) {
                $table->id(); 
                $table->unsignedBigInteger('reported_by');
                $table->unsignedBigInteger('reportable_id');
                $table->string('reportable_type');
                $table->string('reason');
                $table->foreign('reported_by')->references('id')->on('users')->onDelete('cascade');
                $table->timestamps();
            }); 
    }

  
    public function down(): void
    {
        Schema::dropIfExists('reportables');
    }
};
