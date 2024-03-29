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
			$table->string('email')->unique();
			$table->string('password', 255);
			$table->rememberToken();
			$table->timestamps();
			$table->boolean('has_image')->default(false);
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
	}
}
