export default function ()
{
	const days = Array.from(document.querySelectorAll(".day"));
	for (let day of days)
	{
		day.addEventListener('click', handleDayClick);
	}

	let prev_day;

	function handleDayClick(e)
	{
		if (!prev_day)
			prev_day = this;
		prev_day.style.border = null;
		prev_day.style.boxShadow = null;
		prev_day = this;

		handleButtonClick.cell = this;
		this.style.border = "3px solid cornflowerblue";
		this.style.boxShadow = "0px 0px 4px 3px rgba(100, 149, 247 , 1)";

		menu.style.display = "block";
		const cell_x = this.getBoundingClientRect().x;
		const cell_y = this.getBoundingClientRect().y;
		const cell_width = this.getBoundingClientRect().width;
		const menu_height = menu.getBoundingClientRect().height;
		const menu_width = menu.getBoundingClientRect().width;
		const window_width = window.innerWidth;

		const menu_x = cell_x - menu_width/2 + cell_width/2;
		const menu_y = cell_y - menu_height - 10;


		if (menu_x + menu_width > window_width)
		{
			menu.style.left = window_width - menu_width - 30 + "px";
		}
		else if (menu_x < 0)
		{
			menu.style.left = 15+"px";
		}
		else
		{
			menu.style.left = menu_x+"px";
		}
		menu.style.top = menu_y+"px";
	}

	function handleResponse()
	{
		const response_code = JSON.parse(this.responseText)[0];
		menu.style.display = "none";
		handleResponse.cell.style.border = null;
		handleResponse.cell.style.boxShadow = null;

		const type = handleResponse.button.getAttribute('data-relation');
		if (response_code == true)
		{
			if (type == "offday")
			{
		 		handleResponse.cell.classList.add('offday');
			}
			else if (type == "halfday")
			{
		 		handleResponse.cell.classList.add('halfday');
			}
			else
			{
				handleResponse.cell.classList.remove('halfday');
				handleResponse.cell.classList.remove('offday');
			}
			handleResponse.cell.textContent = handleResponse.payload;
		}



	}

	const buttons = document.querySelectorAll('#selector-2 div');
	buttons.forEach( button => {
		button.addEventListener('click', handleButtonClick)
	});

	function handleButtonClick()
	{
		if (this.getAttribute('data-relation') == "close")
		{
			menu.style.display = "none";
			handleButtonClick.cell.style.border = null;
			handleButtonClick.cell.style.boxShadow = null;
			return;
		}

		let payload;
		if (this.getAttribute('data-relation') == "customday")
		{
			payload = prompt("Custom status:").replace(/\s/g,'').slice(0, 3);

			if (payload === null || payload === "")
			{
				return
			}
		}
		else
		{
			payload = this.textContent.replace(/\s/g,'').slice(0, 3);
		}

		const ajax = new XMLHttpRequest();
		ajax.onload = handleResponse;
		handleResponse.cell = handleButtonClick.cell;
		handleResponse.button = this;
		handleResponse.payload = payload;

		const regex = new RegExp('[\\d]+', 'gi' );
		const match = handleButtonClick.cell.id.match(regex);
		const user_id = match[0];
		const day_id = match[1];

		ajax.open('POST', '/api/months', true);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send(`user_id=${user_id}&day_id=${day_id}&relation_type=${this.getAttribute('data-relation')}&payload=${payload}`);
	}

	const menu = document.querySelector('#selector-2');



}