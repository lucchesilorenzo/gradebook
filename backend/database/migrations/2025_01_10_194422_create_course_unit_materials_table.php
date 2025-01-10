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
        Schema::create('course_unit_materials', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('course_unit_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('description')->nullable();
            $table->enum('type', ['PDF', 'VIDEO', 'LINK']);
            $table->string('file')->nullable();
            $table->string('url')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_unit_materials');
    }
};
