<?php
//
Route::get('/', 'AppController@index');
Route::get('/months/{month}', 'AppController@show');
Route::get('/generate', 'AppController@generate');
Route::post('/generate', 'AppController@generateSubmitted');

//Route::get('/months','AppController@dayClickedA');







