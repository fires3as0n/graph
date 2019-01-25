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
		$validator = Validator::make(
			$request->all(),
			[
				'new-pass' => 'same:new-pass-again|required',
				'new-pass-again' => 'required',
			],
			[
				'new-pass.same' => 'Подтверждение пароля не совпадает, попробуйте еще раз',
				'new-pass.required' => 'Вы не ввели новый пароль',
				'new-pass-again.required' => 'Вы не ввели подтверждение нового пароля',
			]);
		
		$validator->after(function ($validator)
		{
			if ( !Hash::check($validator->getData()['old-pass'], Auth::user()->password) )
			{
				$validator->errors()->add('current_password', 'Вы ввели неверный старый пароль');
			}
    });
    
    if ($validator->fails())
    {
    	return redirect()->back()->withErrors($validator->errors())->with('form', "1");
  	}
   	else
		{
			$user = Auth::user();
			$user->password = Hash::make($request->all()['new-pass']);
  		$user->save();
			return redirect()->back()->with(['form' => "1", "success" => "Ваш пароль успешно изменен"]);
		}
	}
	
	public function changeEmail(Request $request)
	{
		$validator = Validator::make(
			$request->all(),
			[
				'new-email' => 'required|unique:users,email|email',
			],
			[
				'new-email.required' => 'Вы не ввели новый E-Mail',
				'new-email.unique' => 'Такой E-Mail уже используется',
				'new-email.email' => 'Вы не ввели некорректный E-Mail',
			]);
		
		$validator->after(function ($validator)
		{
			if ( !Hash::check($validator->getData()['old-pass'], Auth::user()->password) )
			{
				$validator->errors()->add('current_password', 'Вы ввели неверный пароль');
			}
    });
    
    if ($validator->fails())
    {
    	return redirect()->back()->withErrors($validator->errors())->with('form', "2");
  	}
   	else
		{
			$user = Auth::user();
			$user->email = $request->input('new-email');
  		$user->save();
			return redirect()->back()->with(['form' => "2", "success" => "Ваш E-mail успешно изменен"]);
		}
	}
}
