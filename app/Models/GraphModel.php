<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PDO;

class GraphModel extends Model
{
	
	public static function pdoGetAllUsers()
	{
		$db = app('PDO');
		$query = "SELECT id, name, short_name, has_image FROM users WHERE id > 1";
		$statement = $db->prepare($query);
		$statement->execute();
		$data = $statement->fetchAll();
		return $data;
	}
	
	public static function pdoGetMonth($year, $month)
	{
		$db = app('PDO');
		$query = "SELECT * FROM days WHERE month_number = :number AND year = :year";
		$statement = $db->prepare($query);
		$statement->bindValue('number', $month);
		$statement->bindValue('year', $year);
		$statement->execute();
		$data = $statement->fetchAll(); //dd($data);
		return $data;
	}
	
	public static function pdoGetAllRelations()
	{
		$db = app('PDO');
		$query = "SELECT * FROM user_day";
		$statement = $db->prepare($query);
		$statement->execute();
		$data = $statement->fetchAll();
		return $data;
	}
	
	public static function  pdoAddRelation($user_id, $day_id, $relation_type, $payload)
	{
		$db = app('PDO');
		$query = "INSERT INTO user_day (user_id, day_id, relation_type, relation_text)
			VALUES (:user_id, :day_id, :relation_type, :payload)";
		$statement = $db->prepare($query);
		$statement->bindValue('user_id', $user_id, PDO::PARAM_INT);
		$statement->bindValue('day_id', $day_id, PDO::PARAM_INT);
		$statement->bindValue('relation_type', $relation_type);
		$statement->bindValue('payload', $payload);
		
		$result = $statement->execute();
		return [$result, $statement->errorInfo()[2]];
	}
	
	public static function pdoCheckIfRelated($user_id, $day_id)
	{
		$db = app('PDO');
		$query = "SELECT * FROM user_day
			WHERE user_id = :user_id AND day_id = :day_id";
		$statement = $db->prepare($query);
		$statement->bindValue('user_id', $user_id);
		$statement->bindValue('day_id', $day_id);
		$statement->execute();
		return !empty($statement->fetchAll());
	}
	
	public static function pdoDeleteRelation($user_id, $day_id)
	{
		$db = app('PDO');
		$query = "DELETE FROM user_day
			WHERE user_id = :user_id AND day_id = :day_id";
		$statement = $db->prepare($query);
		$statement->bindValue('user_id', $user_id);
		$statement->bindValue('day_id', $day_id);
		$result = $statement->execute();
		return [$result, $statement->errorInfo()[2]];
	}
}
