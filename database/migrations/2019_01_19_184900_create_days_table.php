<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDaysTable extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
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
	}
	
	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('days');
	}
}
