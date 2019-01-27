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
	if (window.innerWidth < 880)
		transformNames("short_name");

	function transformNames(name_type)
	{
		for (let i = 0; i < users.length; i++)
		{
			for (let j = 0; j < fields[i].length; j++)
			{
				if (!shortened)
				{
					/* Make styling */
					fields[i][j].style.width = "35px";
					fields[i][j].style.height = "35px";
					fields[i][j].style.textAlign = "center";
					fields[i][j].style.cursor = "pointer";
					const hover = ".user:hover {outline}"

					/* Apply short name / icon */
					if ( Number(users[i]["has_image"]) )
					{
						fields[i][j].innerHTML =
							`<img src="/img/${users[i]['id']}.jpg" alt="${users[i][name_type]}"/>`;
					}
					else
					{
						fields[i][j].innerHTML = users[i][name_type];
					}

					/* Add fly-out listener */
					fields[i][j].addEventListener('click', flyOut)
				}
				else
				{
					fields[i][j].removeAttribute("style");
					fields[i][j].innerHTML = users[i][name_type];
					fields[i][j].removeEventListener('click', flyOut);
				}
			}
		}
		shortened = !shortened;
	}

	window.addEventListener('resize', handleNames);

	function handleNames()
	{
		//console.log(window.innerWidth);
		if (window.innerWidth < 880 && !shortened)
			transformNames("short_name");
		else if (window.innerWidth >= 880 && shortened)
			transformNames("name");
	}

	function flyOut()
	{

	}
}