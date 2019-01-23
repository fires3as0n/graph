export default function generateDaysJson(year, id)
{
	/*get local date*/
	const now = new Date();

	/*Use offset to create a number used for making	real time
	This helps to overcome bug in JS Date object

	In oder to get real time, always pass offset
	instead of hours and then add the desired time

	offset variable represents 0:00 time for current time zone

	-Usage
	To get: 1970.01.01-04:00
	Pass: Date(1970, 0, 1, offset + 4)
	-Yes, in this shit language months counts from 0
	 but days from 1
	-If you pass only 4, you will get not the desired time but
	 the time that UTC had at that moment
	*/
	const offset = 0 - now.getTimezoneOffset() / 60;

	/*Get days in February
	* passing month next to desired one and 0 as day, returns
	* the last day of desired month - a neat lifehack
	* */
	const feb = new Date(year, 2, 0, offset).getDate();

	/*seeding data*/
	let total_days = 365;
	let days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if (feb ===29)
	{
		total_days += 1;
		days_in_month[1] += 1;
	}
	const week_day_names = ["", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
	const month_names = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

	let result = Array();

	for (let month=0, iterator=0; month<12; month++)
	{
		for (let day=0; day<days_in_month[month]; day++, iterator++)
		{
			let obj = {};
			let date = new Date(year, month, day+1, offset);

			obj["id"] = id + iterator + 1;
			obj["day_in_week_number"] = date.getDay() == 0 ? 7 : date.getDay();
			obj["day_in_month_number"] = day+1;
			obj["day_name"] = week_day_names[obj["day_in_week_number"]];
			obj["month_number"] = month + 1;
			obj["month_name"] = month_names[month];
			obj["year"] = year;

			result[iterator] = obj;
		}
	}
	//console.table(result);
	return [result, result.length];
}