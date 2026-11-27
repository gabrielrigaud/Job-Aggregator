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
        Schema::create('job_offers', function (Blueprint $table) {
            $table->id();

            // Clés étrangères liées aux tables précédentes
            $table->foreignId('company_id')->constrained('companies')->onDelete('cascade');
            $table->foreignId('source_internal_id')->constrained('sources')->onDelete('cascade');

            // Tes colonnes
            $table->string('source_external_id');
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->string('country');
            $table->boolean('is_remote')->default(false);
            $table->string('contract_type');
            $table->timestamp('date_of_publi');
            $table->timestamp('date_of_collect');

            // Salaire éclaté
            $table->integer('salary_min')->nullable();
            $table->integer('salary_max')->nullable();
            $table->string('salary_currency')->nullable();
            $table->string('salary_period')->nullable();

            // Hash du contenu pour la détection exacte de doublons
            $table->string('content_hash')->unique();

            $table->timestamps();

            // Contrainte d'unicité (Idempotence brique Cyber/Data)
            $table->unique(['source_internal_id', 'source_external_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_offers');
    }
};
