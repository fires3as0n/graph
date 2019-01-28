export default function ()
{
	"use strict";
	const users = window.users;
	//console.log(users);

	let ids = [];
	for (let user of users)
	{
		ids.push("u" + user["id"]);
	}

	let fields = [];
	for (let id of ids)
	{
		fields.push(Array.from(document.querySelectorAll('td.' + id)));
	}

	/* Handle CSS that adds :hover to shortened names */

	var flyout_toggled = false;
	var flyout_css = ".user:hover {outline:2px solid cornflowerblue;}";
	var flyout_style_index;

	function namesHover()
	{
		if (!flyout_toggled)
		{
			flyout_style_index = document.styleSheets[3].insertRule(flyout_css, document.styleSheets[3].cssRules.length);
		}
		else
		{
			document.styleSheets[3].deleteRule(flyout_style_index)
		}
		flyout_toggled = !flyout_toggled;
	}

	let shortened = false;
	if (window.innerWidth < 880)
		transformNames("short_name");

	function transformNames(name_type)
	{
		namesHover();

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



	let prev_flyout;
	function flyOut()
	{
		const user_class = this.classList[0];
		const long_name = document.querySelector(`div.${user_class}`);

		if (prev_flyout == long_name)
		{
			prev_flyout = 0;
			long_name.style.width = 0 + "px";
			setTimeout( () => {
				long_name.removeAttribute("style");
			}, 690);
			return
		}
		else if (!prev_flyout)
		{
			prev_flyout = long_name;
		}

		prev_flyout.removeAttribute("style");
		prev_flyout = long_name;

		const this_rect = this.getBoundingClientRect();
		console.log(this_rect);

		long_name.style.display = 'block';
		long_name.style.top = this_rect.top - 2 + "px";
		long_name.style.left = this_rect.left + 35 + "px";
		setTimeout( () => {
			long_name.style.width = "190px";
		},1);


	}
}