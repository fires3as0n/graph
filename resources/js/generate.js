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
			data_field.value = result;
			form.submit();
		})
}

function waitForResult()
{
	return new Promise( (resolve, reject) => {
		resolve(generateDaysJson(input.value));
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