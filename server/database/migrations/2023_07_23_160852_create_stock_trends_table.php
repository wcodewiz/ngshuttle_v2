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
        Schema::create('stock_trends', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->bigInteger("product");
            $table->bigInteger("views");
            $table->bigInteger("order_len");
            $table->bigInteger("order_category");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_trends');
    }
};