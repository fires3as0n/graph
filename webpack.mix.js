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
	 .styles('resources/css/month.css', 'public/css/month.css')
	 .browserSync({
	  	proxy: '127.0.0.1:8001',
	  	open: false
	 });

