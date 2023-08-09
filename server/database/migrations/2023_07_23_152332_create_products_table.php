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
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->bigInteger("vendor");
            $table->bigInteger("subcategory");
            $table->integer("price");
            $table->string("name");
            $table->bigInteger("quantity");
            $table->text("description");
            $table->bigInteger("specs");
            $table->text("pictures");
            $table->string("buy_from")->nullable();
            $table->string("buy_price")->nullable();
            $table->boolean("visible")->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};