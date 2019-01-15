/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/DaysJsonGenerator.js":
/*!*******************************************!*\
  !*** ./resources/js/DaysJsonGenerator.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return generateDaysJson; });
function generateDaysJson(year) {
  /*get local date*/
  var now = new Date();
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

  var offset = 0 - now.getTimezoneOffset() / 60;
  /*Get days in February
  * passing month next to desired one and 0 as day, returns
  * the last day of desired month - a neat lifehack
  * */

  var feb = new Date(year, 2, 0, offset).getDate();
  /*seeding data*/

  var total_days = 365;
  var days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (feb === 29) {
    total_days += 1;
    days_in_month[1] += 1;
  }

  var week_day_names = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
  var month_names = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
  var result = Array();

  for (var month = 0, iterator = 0; month < 12; month++) {
    for (var day = 0; day < days_in_month[month]; day++, iterator++) {
      var obj = {};
      var date = new Date(year, month, day + 1, offset);
      obj["id"] = iterator + 1;
      obj["day_in_week_number"] = date.getDay() + 1;
      obj["day_in_month_number"] = day + 1;
      obj["day_name"] = week_day_names[date.getDay()];
      obj["month_number"] = month + 1;
      obj["month_name"] = month_names[month];
      obj["year"] = year;
      result[iterator] = obj; //break;
    } //break;

  }

  return JSON.stringify(result);
}

/***/ }),

/***/ "./resources/js/generate.js":
/*!**********************************!*\
  !*** ./resources/js/generate.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DaysJsonGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DaysJsonGenerator.js */ "./resources/js/DaysJsonGenerator.js");

var form = document.querySelector('#form');
var data_field = document.querySelector('#data-field');
var input = document.querySelector('#year');
var button = document.querySelector('#button');
button.addEventListener('click', submitHandler);

function submitHandler() {
  waitForResult().then(function (result) {
    data_field.value = result;
    form.submit();
  });
}

function waitForResult() {
  return new Promise(function (resolve, reject) {
    resolve(Object(_DaysJsonGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input.value));
  });
} //<editor-fold desc="Promise testing function">
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

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./resources/js/generate.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\Code\Graph\resources\js\generate.js */"./resources/js/generate.js");


/***/ })

/******/ });