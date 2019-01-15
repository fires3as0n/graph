function generateDaysJson(year)
{
	//get local date
	const now = new Date();
	//use offset to create a number representing real UTC time instead of offsetted time used by  fuckingJS
	const offset = 0 - now.getTimezoneOffset() / 60;
	/*create date object using
	* provided year, first month, first day, 0:00 time
	* offset is used to compensate shitty JS Date() behaviour
	* */
	const date = new Date(year, 0, 1, offset);

	let result = createArrAndInsertIds(date, offset);
	result = insertDays(date, offset, result);
	//console.log(result);

	return date;
}
console.log(generateDaysJson(2021));

function createArrAndInsertIds(date, offset)
{
	/*Standard JS trick. We take 2nd month (march)
	* and use day=0, hours=0 to get 1st month (february)*/
	date = new Date(date.getFullYear(), 2, 0, offset);

	let max_days;
	if (date.getDate() === 29)
		max_days = 366;
	else
		max_days = 365;

	let result = Array(max_days);

	for (i=1; i < max_days+1; i++ )
		result[i-1] = {"id": i};

	return result;
}

function insertDays(date, offset, result)
{
	let days_per_month = Array(); //stores day per month
	const month_names = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

	/* push days of each month to days_per_month array */
	for (let i=1; i<13; i++)
	{
		/*same trick as before, now we get max days per each month
		* and save it into an array
		* */
		let date_month = new Date(date.getFullYear(), i, 0, offset);
		days_per_month.push(date_month.getDate());
	}
	//console.log("days_per_month: ", days_per_month);

	/* convert days_per_month to array of 365/366 numbers */
	let all_days = Array();
	for (let i in days_per_month)
		for (let j=1; j<days_per_month[i]+1; j++)
			all_days.push(j);
	//console.log("all_days: ", all_days);

	/* push all day_in_year_numbers to result */
	for (let i=0, j=0; i<all_days.length; i++, j++)
	{
		result[i]["day_in_year_number"] = all_days[i];
	}

	/*
	1. Outer loop iterates 12 times
	2. For each month, inner loop iterates for the amount of days
		 in month
	3. Total iterations: months*days=365/366
	4. At the same time iterate through the result
		 - Result iterator index is declared in outer loop
		 	 to prevent its nullification
		 - Result iterator is updated in inner loop,
		 	 as it should be updated for any new day
	 */
	for (let i=0, k=0; i<12; i++)
	{
		for (let j=0; j<days_per_month[i]; j++, k++)
		{
			result[k]["month_number"] = i+1;
			result[k]["month_name"] = month_names[i];
		}
	}

	console.log("result: ", result);

	return result;
}