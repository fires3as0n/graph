import generateDaysJson from './DaysJsonGenerator.js';

const form = document.querySelector('#form');
const data_field = document.querySelector('#data-field');
const input = document.querySelector('#year');
const button = document.querySelector('#button');

button.addEventListener('click', submitHandler);

function submitHandler()
{
	waitForResult()
		.then( result => {
			console.table(result);
			result = JSON.stringify(result)
			//console.log(result);
			data_field.value = result;
			form.submit();
		})
}


function waitForResult()
{
	return new Promise( (resolve, reject) => {
		let result = Array();
		let id = 0;
		for(let i = 2019; i < 2026; i++)
		{
			let response = generateDaysJson(i, id);
			id += response[1];
			result = result.concat(response[0]);
		}
		resolve(result);
	});
}


//<editor-fold desc="Promise testing function">
//function waitForResult(value)
//{
//	return new Promise( (resolve, reject) => {
//		setTimeout( () => {
//			if (value > 1000)
//				resolve("resolved");
//			else
//				reject("rejected");
//		}, 2000);
//	});
//}
//</editor-fold>