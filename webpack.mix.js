const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/generate.js', 'public/js')
	 .js('resources/js/month.js', 'public/js')
	 .js('resources/js/app.js', 'public/js')
	 .styles('resources/css/layouts/month.css', 'public/css/layouts/month.css')
	 .styles('resources/css/layouts/auth.css', 'public/css/layouts/auth.css')
	 .styles('resources/css/month.css', 'public/css/month.css')
	 .styles('resources/css/settings.css', 'public/css/settings.css')
	 .browserSync({
	  	proxy: '127.0.0.1:8001',
	  	open: false
	 });

