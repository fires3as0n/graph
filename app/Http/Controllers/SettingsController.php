<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SettingsController extends Controller
{
	public function changePassword(Request $request)
	{
		$user = Auth::user();
		//dd($user->password);
		
		$validator = Validator::make(
			$request->all(),
			[
				'new-pass' => 'same:new-pass-again|required',
				'new-pass-again' => 'required',
				
			],
			[
				'new-pass.same' => 'Подтверждение пароля не совпадает, попробуйте еще раз',
				'new-pass.required' => 'Вы не ввели новый пароль',
				'new-pass-again.required' => 'Вы не ввели подтверждение нового пароля'
			]);
		
		//dd($validator);
		
		$validator->after(function ($validator)
		{
			if ( !Hash::check($validator->getData()['old-pass'], Auth::user()->password) )
			{
				$validator->errors()->add('current_password', 'Вы ввели');
			}
    });
    
    if ($validator->fails())
    {
    	//dd($validator);
    	return redirect()->back()->withErrors($validator->errors());
    	
  	}
   
		//dd($validator->errors());
	}
	
	public function changeEmail(Request $request)
	{
	
	}
}
