<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserDayTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('user_day', function (Blueprint $table)
		{
			$table->integer('id')->unsigned()->autoIncrement()->nullable($value = false);
			$table->integer('user_id')->unsigned();
			$table->integer('day_id')->unsigned();
			$table->char('relation_type', 45);
			$table->char('relation_text', 45);
			$table->foreign('user_id')->references('id')->on('users');
			$table->foreign('day_id')->references('id')->on('days');
		});
	}
	
	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('user_day');
	}
}
