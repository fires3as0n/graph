<?php
//
Route::get('/', 'AppController@index');
Route::get('/{year}/{month}', 'AppController@show')->middleware('auth');
Route::get('/generate', 'AppController@generate');
Route::post('/generate', 'AppController@generateSubmitted');


Route::get('/logout', 'Auth\LoginController@logout');
Route::post('/months', 'AppController@dayClicked')->middleware('auth');

/* Manual Authorisation Routes */

// Authentication Routes...
Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout')->name('logout');
// Registration Routes...
// Password Reset Routes...
Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');
// Email Verification Routes...

/* End Manual Authorisation Routes */
