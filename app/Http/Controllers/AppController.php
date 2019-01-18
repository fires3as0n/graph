<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GraphModel;
use Illuminate\Support\Facades\Redirect;

class AppController extends Controller
{
	private $empty_day = [
			"id" => "",
			"day_in_month_number" => "",
			"day_in_week_number" => "",
			"day_name" => "",
			"month_number" => "",
			"month_name" => "",
			"year" => "",
			"type" => "empty" //taken current
		];

	/* Helpers */
	private function createAndGenerateFirstColumn()
	{
		$users = GraphModel::pdoGetAllUsers();
		$cells = [];
		$empty_cell = ["data" => "", "class" => ""];
		$cells[0][0] = $empty_cell;
		$cells[1][0] = $empty_cell;
		for ($i = 2, $j = 0; $j < sizeof($users); $i++, $j++)
		{
			/* user_id is used to check relation of day to user, it is not used in view */
			$cells[$i][0]["user_id"] = $users[$j]["id"];
			$cells[$i][0]["class"] = "u" . $users[$j]["id"] . " user";
			$cells[$i][0]["data"] = $users[$j]["name"];
		}
		return $cells;
	}
	
	private function generateOtherColumns(&$table, $days, $relations)
	{
		/* iterating through rows */
		for ($row=0; $row<sizeof($table); $row++)
		{
			/* iterating through days. each day is duplicated for each row
				$table[$row][0] is user, $table[$row][$column + 1] are days
			*/
			for ($column=0; $column<sizeof($days); $column++)
			{
				/* first row (day numbers) */
				if ($row == 0)
				{
					$table[$row][$column+1]["data"] = $days[$column]["day_in_month_number"];
					$table[$row][$column+1]["class"] = $this->generateClassname($days[$column], "date");
				}
				
				/* second row (day names) */
				if ($row == 1)
				{
					$table[$row][$column+1]["data"] = $days[$column]["day_name"];
					$table[$row][$column+1]["class"] = $this->generateClassname($days[$column], "weekday");
				}
				
				/* other rows (days) */
				if ($row > 1)
				{
					$table[$row][$column+1]["data"] = "";
					$table[$row][$column+1]["class"] = $this->generateClassname($days[$column], "day");
					$table[$row][$column+1]["id"] =
						"d" . $table[$row][0]["user_id"] . "-" . $days[$column]["id"];
					
					/* check if user and day have relations */
					foreach ($relations as $relation)
					{
						if (
							$table[$row][0]["user_id"] == $relation["user_id"] &&
							$days[$column]["id"] == $relation["day_id"]
						)
						{
							$table[$row][$column+1]["data"] = $relation["relation_text"];
							$table[$row][$column+1]["class"] .= " " . $relation["relation_type"];
						}
					}
				}
			}
		}
	}
	
	private function generateClassname($day, $base_class)
	{
		if ($day["type"] == "taken")
		{
			$class = $base_class . " " . "not-current";
		}
		else if($day["type"] == "empty")
		{
			$class = "empty not-current";
		}
		else
		{
			$class = $base_class . " " . "current";
		}
		return $class;
	}
	
	private function takeFromPrevious(&$days, $take_from_previous, $cur_month_number)
	{
		/* if first month of year, fill blank spaces instead of days
		 (as multi-year graphic is beyond current implementation
		*/
		if ($cur_month_number == 1)
		{
			for($i=0; $i<$take_from_previous; $i++)
			{
				array_push($days, $this->empty_day);
			}
		}
		else
		{
			$previous_month = GraphModel::pdoGetMonth($cur_month_number - 1);
			
			/* slice from the end of array */
			$taken = array_slice($previous_month, -$take_from_previous);
			foreach ($taken as $day)
			{
				$day["type"] = "taken";
				array_push($days, $day);
			}
		}
	}
	
	private function takeFromNext(&$days, $take_from_next, $cur_month_number)
	{
		/*
		 * If last month of year, fill blank spaces instead of days
		 * (as multi-year graphic is beyond current implementation
		*/
		if ($cur_month_number == 12)
		{
			for($i=0; $i<$take_from_next; $i++)
			{
				array_push($days, $this->empty_day);
			}
		}
		else
		{
			$next_month = GraphModel::pdoGetMonth($cur_month_number + 1);
			
			/* slice from the start of array  by amount of days */
			$taken = array_slice($next_month, 0, $take_from_next);
			foreach ($taken as $day)
			{
				$day["type"] = "taken";
				array_push($days, $day);
			}
		}
	}
	
	/* Controllers */
	public function index()
	{
		$curr_month_number = (int)date('m');
		return redirect("/months/$curr_month_number");
	}
	
	public function show($cur_month_number)
	{
		$month = GraphModel::pdoGetMonth($cur_month_number); //dd($month);
		$users = GraphModel::pdoGetAllUsers(); //dd($users);
		$relations = GraphModel::pdoGetAllRelations(); //dd($relations);
		
		$month_name = $month[0]["month_name"];
		$year = $month[0]["year"];
		
		/* Populating days */
		$days = [];
		
		/*
		 * Handle days taken from previous month
		 * take weekday number of first day of month and check if there are weekdays
		 * before it (if wednesday(3) then 2 days are to be taken (monday and tuesday))
		*/
		$take_from_previous = $month[0]["day_in_week_number"] - 1;
		if ($take_from_previous > 0)
		{
			$this->takeFromPrevious($days, $take_from_previous, $cur_month_number);
		}

		/* Handle days of current month */
		foreach ($month as $day)
		{
			$day["type"] = "current";
			array_push($days, $day);
		}
		
		/*
		 * Handle days taken from next month
		 * total amount of days shown by app at one single moment
		 * consists of number of tables(6) * number of days in week (7) = 42
		*/
		$take_from_next = 42 - sizeof($days);
		if ($take_from_next > 0)
		{
			$this->takeFromNext($days, $take_from_next, $cur_month_number);
		}
	
		/*
		 * Populating cells for view.
		 * Group data into six 7-days packs (for each table)
		*/
		$cells = [];
		for ($table=0, $day_index=0; $table<6; $table++, $day_index+=7)
		{
			$cells[$table] = $this->createAndGenerateFirstColumn();
			$this->generateOtherColumns( $cells[$table], array_slice($days, $day_index, 7), $relations );
		}
		
		// dd($cells);
		
		return view('month', compact('cells', 'users', 'month_name', 'year'));
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
