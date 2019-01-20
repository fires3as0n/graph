<?php
//
Route::get('/', 'AppController@index');
Route::get('/months/{month}', 'AppController@show')->middleware('auth');
Route::get('/generate', 'AppController@generate');
Route::post('/generate', 'AppController@generateSubmitted');

//Route::get('/months','AppController@dayClickedA');








Auth::routes();
Route::get('/logout', 'Auth\LoginController@logout');

Route::get('/home', 'HomeController@index')->name('home');
