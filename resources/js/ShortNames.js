export default function ()
{
	const users = window.users;
	//console.log(users);

	let ids = [];
	for (let user of users)
	{
		ids.push("u" + user["id"]);
	}
	//console.log(ids);

	let fields = [];
	for (let id of ids)
	{
		fields.push(Array.from(document.querySelectorAll('.' + id)));
	}
	//console.log(fields);

	let shortened = false;
	if (window.innerWidth < 810)
		transformNames("short_name");

	function transformNames(name_type)
	{
		for (let i = 0; i < users.length; i++)
		{
			for (let j = 0; j < fields[i].length; j++)
			{
				if (!shortened)
				{
					fields[i][j].style.width = "35px";
					fields[i][j].style.height = "35px";
					fields[i][j].style.textAlign = "center";
					//console.log(Number(users[i]["has_image"]));
					if ( Number(users[i]["has_image"]) )
					{
						fields[i][j].innerHTML =
							`<img src="/img/${users[i]['id']}.jpg" alt="${users[i][name_type]}"/>`;
					}
					else
					{
						fields[i][j].innerHTML = users[i][name_type];
					}
				}
				else
				{
					fields[i][j].removeAttribute("style");
					fields[i][j].innerHTML = users[i][name_type];
				}
			}
		}
		shortened = !shortened;
	}

	window.addEventListener('resize', handleNames);

	function handleNames()
	{
		//console.log(window.innerWidth);
		if (window.innerWidth < 810 && !shortened)
			transformNames("short_name");
		else if (window.innerWidth >= 810 && shortened)
			transformNames("name");
	}
}