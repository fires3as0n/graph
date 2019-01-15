<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users', function (Blueprint $table)
		{
			$table->integer('id')->unsigned()->autoIncrement()->nullable($value = false);
			$table->string('name');
			$table->string('short_name');
			$table->string('email');
			$table->string('password');
			$table->boolean('has_image')->default(false);
		});
		
		Schema::create('days', function (Blueprint $table)
		{
			$table->integer('id')->unsigned()->autoIncrement()->nullable($value = false);
			$table->integer('day_in_month_number');
			$table->integer('day_in_week_number');
			$table->char('day_name', 45);
			$table->integer('month_number');
			$table->char('month_name', 45);
			$table->char('year', 45);
		});
		
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
		Schema::dropIfExists('users');
		Schema::dropIfExists('days');
		Schema::dropIfExists('user_day');
	}
}
