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
        Schema::create('merchants', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->bigInteger("user");
            $table->text("id_docs");
            $table->text("user_photo");
            $table->text("address1");
            $table->text("address2");
            $table->string("city");
            $table->string("state");
            $table->string("country");
            $table->string("ssn");
            $table->boolean("canSale")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchants');
    }
};