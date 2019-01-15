<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		$path = base_path() . "/database/seeds/UsersSeederData.txt";
		$file = File::get($path);
		$data = json_decode($file, true);
		DB::table('users')->insert($data);
	}
}
