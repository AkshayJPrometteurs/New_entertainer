<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('t_v_shows', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('tv_channel_id')->nullable();
            $table->string('tv_shows_name')->unique()->nullable();
            $table->string('tv_shows_slug')->nullable();
            $table->string('tv_shows_image')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('t_v_shows');
    }
};
