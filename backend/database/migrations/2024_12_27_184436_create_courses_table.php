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
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('tutor_id')->constrained()->onDelete('set null');
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->string('course_code')->unique();
            $table->string('description');
            $table->integer('max_students');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('type', ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
