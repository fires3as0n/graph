<?php

use Illuminate\Database\Seeder;

class DaysTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$path = base_path() . "\\database\\seeds\\DaysSeederData.txt";
		$file = File::get($path);
		$data = json_decode($file, true);
		DB::table('days')->insert($data);
	}
}
