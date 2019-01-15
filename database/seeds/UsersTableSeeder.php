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

/*
 * Debug used for successful error tracing after seed files were opened in shitty microsoft notepad
 */
//$file = __DIR__ . "\\UsersSeederData.txt";
//$fin = fopen($file, 'r');
//$data = fread($fin, sizeof($fin)+10000);
//fclose($fin);
//var_dump(($data));
//var_dump(gettype($data));
//var_dump(gettype(json_decode($data)));
