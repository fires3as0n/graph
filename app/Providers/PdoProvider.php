<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use PDO;

class PdoProvider extends ServiceProvider
{
	/**
	 * Bootstrap services.
	 *
	 * @return void
	 */
	public function boot()
	{
			//
	}
	
	/**
	 * Register services.
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->singleton(PDO::class, function() {
			$dsn = sprintf("%s:host=%s;port=%s;charset=utf8;dbname=%s",
				config('database.default'),
				config('database.connections.mysql.host'),
				config('database.connections.mysql.port'),
				config('database.connections.mysql.database')
			);

			$db = new PDO(
				$dsn,
				config('database.connections.mysql.username'),
				config('database.connections.mysql.password')
			);
			
			$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
			
			return $db;
		});
	}
}
