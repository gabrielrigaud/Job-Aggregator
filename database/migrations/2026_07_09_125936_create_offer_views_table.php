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
        Schema::create('offer_views', function (Blueprint $table) {
    $table->id();
    $table->foreignId('job_offer_id')->constrained('job_offers')->onDelete('cascade');
    $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Utilise la table users par défaut de Laravel
    $table->timestamp('viewed_at')->useCurrent();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('offer_views');
    }
};
