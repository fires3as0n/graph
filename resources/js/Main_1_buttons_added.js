export default function ()
{
	const days = Array.from(document.querySelectorAll(".day"));
	for (let day of days)
	{
		day.addEventListener('click', handleDayClick);
	}

	function handleDayClick(e)
	{
		handleResponse.event = this;

		const ajax = new XMLHttpRequest();
		ajax.onload = handleResponse;

		const regex = new RegExp('[\\d]+', 'gi' );
		const match = this.id.match(regex);
		const user_id = match[0];
		const day_id = match[1];

		ajax.open('POST', '/api/months', true);
		ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajax.send(`user_id=${user_id}&day_id=${day_id}`);
	}

	function handleResponse()
	{
		console.log(this.responseText);
		if (this.responseText == "added")
			handleResponse.event.style.backgroundColor = "grey";
		else if (this.responseText == "deleted")
			handleResponse.event.removeAttribute('style');
		else if (this.responseText == "failed")
			alert("failed");
	}

	const buttons = document.querySelectorAll('#selector-2 div');
	buttons.forEach( button => {
		button.addEventListener('click', handleButtonClick)
	});

	function handleButtonClick() {
		console.log(this.getAttribute('data-relation'));
	}



}