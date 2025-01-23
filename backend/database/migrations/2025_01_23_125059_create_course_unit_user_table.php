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
        Schema::create('course_unit_user', function (Blueprint $table) {
            $table->foreignUuid('user_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('course_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('course_unit_id')->constrained()->onDelete('cascade');

            $table->primary(['user_id', 'course_id', 'course_unit_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_unit_user');
    }
};
