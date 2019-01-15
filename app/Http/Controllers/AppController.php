<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GraphModel;
use Illuminate\Support\Facades\Redirect;

class AppController extends Controller
{
	public function index()
	{
		$curr_month_number = (int)date('m');
		return redirect("/months/$curr_month_number");
	}
	
	private function generateFirstColumn()
	{
		$users = GraphModel::pdoGetAllUsers();
		$arr[0][0] = ["name" => "", "id" => "NULL"];
		$arr[1][0] = ["name" => "", "id" => "NULL"];
		for ($i = 2, $j = 0; $j < sizeof($users); $i++, $j++)
		{
			$arr[$i][0] = $users[$j];
		}
		return $arr;
	}
	
	private function generateOtherColumns(&$data, $days)
	{
		for ($i=0; $i<sizeof($data); $i++)
		{
			for ($j=0; $j<sizeof($days); $j++)
			{
				$data[$i][$j+1] = $days[$j];
			}
		}
	}
	
	public function show($cur_month_number)
	{
		$month = GraphModel::pdoGetMonth($cur_month_number);
		$users = GraphModel::pdoGetAllUsers();
		$relations = GraphModel::pdoGetAllRelations(); //dd($relations);
		
		/* Populating numbers of days */
		$days = [];
		$empty_day = [
				"id" => "",
        "day_in_month_number" => "",
        "day_in_week_number" => "",
        "day_name" => "",
        "month_number" => "",
        "month_name" => "",
        "year" => "",
		];
		
		/* Handle days taken from previous month */
		
		/* day of the week for 1st day of month*/
		$take_from_previous = $month[0]["day_in_week_number"] - 1;

		if ($take_from_previous > 0)
		{
			/* if first month of year, fill blank spaces instead of days
			 (as multi-year graphic is beyond current implementation
			*/
			if ($cur_month_number == 1)
			{
				for($i=0; $i<$take_from_previous; $i++)
				{
					array_push($days, $empty_day);
				}
			}
			else
			{
				$previous_month = GraphModel::pdoGetMonth($cur_month_number - 1);
				
				/* slice from the end of array */
				$taken = array_slice($previous_month, -$take_from_previous);
				foreach ($taken as $day)
				{
					array_push($days, $day);
				}
			}
		}
		
		/* End Handle days taken from previous month */
		
		/* Handle days of current month */
		
		foreach ($month as $day)
		{
			array_push($days, $day);
		}
		
		/* End Handle days of current month */
		
		/* Handle days taken from next month */
		
		/* total amount of days shown by app at one single moment
			 consists of number of tables(6) * number of days in week (7)
		*/
		$take_from_next = 42 - sizeof($days);
		
		if ($take_from_next > 0)
		{
			/* if last month of year, fill blank spaces instead of days
			 (as multi-year graphic is beyond current implementation
			*/
			if ($cur_month_number == 12)
			{
				for($i=0; $i<$take_from_next; $i++)
				{
					array_push($days, $empty_day);
				}
			}
			else
			{
				$next_month = GraphModel::pdoGetMonth($cur_month_number + 1);
				
				/* slice from the start of array  by amount of days */
				$taken = array_slice($next_month, 0, $take_from_next);
				foreach ($taken as $day)
				{
					array_push($days, $day);
				}
			}
		}
	
		/* End handle days taken from next month */
		
		/* group data into six 7-days packs (for each table) */
		$data = [];
		for ($i=0, $j=0; $i<6; $i++, $j+=7)
		{
			$data[$i] = $this->generateFirstColumn();
			$this->generateOtherColumns( $data[$i], array_slice($days, $j, 7) );
		}
		
		$related = [];
		$related_data = [];
		foreach ($relations as $relation)
		{
			$sign = $relation["user_id"] . "-" . $relation["day_id"];
			$related[$relation["id"]] = $sign;
			$related_data[$relation["id"]] = [ "type" => $relation["relation_type"], "text" => $relation["relation_text"] ];
		}
		
		return view('month', compact('data', 'users', 'related', 'related_data'));
	}
	
	public function generate()
	{
		return view('generate');
	}
	
	public function generateSubmitted(Request $request)
	{
		$data = $request->input("data");
		$file = base_path() . "/database/seeds/DaysSeederData.txt";
		$fout = fopen($file, 'w');
		fwrite($fout, $data);
		fclose($fout);
		return view('generate');
	}
	
	/*
	====== API controllers ======
	*/
	
	public function dayClicked(Request $request)
	{

		//return var_dump($request->all());
		$user_id = $request->all()['user_id'];
		$day_id = $request->all()['day_id'];
		$relation_type=$request->all()['relation_type'];
		$payload = $request->all()['payload'];
		$related = GraphModel::pdoCheckIfRelated($user_id, $day_id);

		if ($relation_type == "workday")
		{
			$response = GraphModel::pdoDeleteRelation($user_id, $day_id);
		}
		else
		{
			GraphModel::pdoDeleteRelation($user_id, $day_id);
			$payload = preg_replace('/\s+/', '', $payload);
			$payload = mb_substr($payload, 0, 3);
			$response = GraphModel::pdoAddRelation($user_id, $day_id, $relation_type, $payload);
		}
		
		/* Debug output that counts the number of times this method was called*/
		
		/*$file = base_path() . "\\debug.txt";
		$fin = fopen($file, 'r');
		$data = fread($fin, sizeof($fin)+10000);
		fclose($fin);
		
		$data = (int)$data;
		$data+=1;

		$fout = fopen($file, 'w');
		fwrite($fout, $data);
		fclose($fout);*/
		
		return json_encode($response);
	}
	




}
