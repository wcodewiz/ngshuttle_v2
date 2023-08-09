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
        Schema::create('user_applications', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->bigInteger("user");
            $table->boolean("isMerchantApplied")->default(false);
            $table->boolean("isAvertiserApplied")->default(false);
            $table->boolean("isPublisherApplied")->default(false);
            $table->boolean("isMerchantApproved")->default(false);
            $table->boolean("isAdvertiserApproved")->default(false);
            $table->boolean("isPublisherApproved")->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_applications');
    }
};