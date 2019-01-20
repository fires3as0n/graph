export default function ()
{
	const days = document.querySelectorAll(".day.current, .day.not-current");
	days.forEach( day => {
		day.addEventListener('click', handleDayClick);
	});

	let day;
	function handleDayClick(e)
	{

		if (!day)
			day = this;
		if (this.classList.contains('clicked'))
		{
			this.classList.remove('clicked');
			selector.style.display = "none";
			return;
		}

		day.classList.remove('clicked');
		day = this;
		this.classList.add('clicked');
		selector.style.display = "flex";

		const parent_table = this.parentNode.parentNode.getBoundingClientRect();
		const cell_x = this.getBoundingClientRect().x;
		const cell_y = this.getBoundingClientRect().y;
		const cell_width = this.getBoundingClientRect().width;
		const selector_height = selector.getBoundingClientRect().height;
		const selector_width = selector.getBoundingClientRect().width;
		const window_width = window.innerWidth;

		const selector_x = cell_x - selector_width/2 + cell_width/2;
		const selector_y = cell_y - selector_height - 20 + window.scrollY;

		if (selector_x + selector_width > window_width)
		{
			selector.style.left = parent_table.left +
				parent_table.width - selector_width + "px";
		}
		else if (selector_x < 0)
		{
			selector.style.left = parent_table.left + "px";
		}
		else
		{
			selector.style.left = selector_x + "px";
		}
		selector.style.top = selector_y + "px";
	}

	const selector = document.querySelector('#selector');
	const buttons = selector.querySelectorAll('div');
	buttons.forEach( button => {
		button.addEventListener('click', handleButtonClick)
	});

	let button;
	let payload;
	function handleButtonClick()
	{
		button = this;

		if (this.getAttribute('data-relation') === "customday")
		{
			payload = prompt("Custom status:").replace(/\s/g,'').slice(0, 3);

			if (payload === null || payload === "")
			{
				return
			}
		}
		else if (this.getAttribute('data-relation') === "objday")
		{
			payload = "ОБ";
		}
		else if (this.getAttribute('data-relation') === "illday")
		{
			payload = "Б";
		}
		else
		{
			payload = "";
		}

		const ajax = new XMLHttpRequest();
		ajax.onload = handleResponse;

		const regex = new RegExp('[\\d]+', 'gi' );
		const match = day.id.match(regex);
		const user_id = match[0];
		const day_id = match[1];

		ajax.open('POST', '/api/months', true);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send(`user_id=${user_id}&day_id=${day_id}&relation_type=${this.getAttribute('data-relation')}&payload=${payload}`);
	}

	function handleResponse()
	{
		selector.style.display = "none";
		day.classList.remove('clicked');

		/*
		If successfully added/deleted relation, change current day style according
		to format that corresponds to its new relation status.
		If relation was not added - log the database error (looks like should
		be considered unsafe in production though)
		 */
		let response_code;
		try
		{
			response_code = JSON.parse(this.responseText)[0];
		}
		catch(e)
		{
			console.error(e);
			console.error(this.responseText);
			return;
		}
		const relation_type = button.getAttribute('data-relation');
		if (response_code == true)
		{
			/*
			First remove any extra classes that day can have, because when adding
			new relation, the previous one is deleted
			 */
			day.classList.remove('halfday');
			day.classList.remove('offday');

			if (relation_type == "offday")
			{
		 		day.classList.add('offday');
			}
			else if (relation_type == "halfday")
			{
		 		day.classList.add('halfday');
			}

			/*
			Payload is inserted directly from JS, the same one that was sent to the
			server. Server does not respond with the payload it actually added, so
			this can be a little error-prone, but reduces the amount of information
			sent in AJAX API call.
			*/
			day.textContent = payload;
		}

	}
}