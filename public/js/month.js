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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/Main.js":
/*!******************************!*\
  !*** ./resources/js/Main.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//import axios from 'axios';
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var days = document.querySelectorAll(".day.current, .day.not-current");
  days.forEach(function (day) {
    day.addEventListener('click', handleDayClick);
  });
  var day;

  function handleDayClick(e) {
    if (!day) day = this;

    if (this.classList.contains('clicked')) {
      this.classList.remove('clicked');
      selector.style.display = "none";
      return;
    }

    day.classList.remove('clicked');
    day = this;
    this.classList.add('clicked');
    selector.style.display = "flex";
    var parent_table = this.parentNode.parentNode.getBoundingClientRect();
    var cell_x = this.getBoundingClientRect().x;
    var cell_y = this.getBoundingClientRect().y;
    var cell_width = this.getBoundingClientRect().width;
    var selector_height = selector.getBoundingClientRect().height;
    var selector_width = selector.getBoundingClientRect().width;
    var window_width = window.innerWidth;
    var selector_x = cell_x - selector_width / 2 + cell_width / 2;
    var selector_y = cell_y - selector_height - 20 + window.scrollY;

    if (selector_x + selector_width > window_width) {
      selector.style.left = parent_table.left + parent_table.width - selector_width + "px";
    } else if (selector_x < 0) {
      selector.style.left = parent_table.left + "px";
    } else {
      selector.style.left = selector_x + "px";
    }

    selector.style.top = selector_y + "px";
  }

  var selector = document.querySelector('#selector');
  var buttons = selector.querySelectorAll('div');
  buttons.forEach(function (button) {
    button.addEventListener('click', handleButtonClick);
  });
  var button;
  var payload;

  function handleButtonClick() {
    button = this;

    if (this.getAttribute('data-relation') === "customday") {
      payload = prompt("Custom status:").replace(/\s/g, '').slice(0, 3);

      if (payload === null || payload === "") {
        return;
      }
    } else if (this.getAttribute('data-relation') === "objday") {
      payload = "ОБ";
    } else if (this.getAttribute('data-relation') === "illday") {
      payload = "Б";
    } else {
      payload = "";
    }

    var ajax = new XMLHttpRequest();
    ajax.onload = handleResponse;
    var regex = new RegExp('[\\d]+', 'gi');
    var match = day.id.match(regex);
    var user_id = match[0];
    var day_id = match[1];
    ajax.open('POST', '/months', true); //ajax.setRequestHeader("Accept", "application/json");

    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    ajax.setRequestHeader("X-CSRF-TOKEN", window.csrf_token); //axios.defaults.headers.common = {
    //	'X-Requested-With': 'XMLHttpRequest',
    //	'X-CSRF-TOKEN': window.csrf_token,
    //	'Authorisation': 'BearereyJpdiI6IjhlNXpsWmUrbzFBRzhsYkoxenE1eEE9PSIsInZhbHVlIjoiQmxmS0RxUXg5UituZ0FtektxR0pEMGRINll5Tk5rVnVUNzlHeERMREh3QVF3TGgrdGZTMzhkWUpnVzFXd2dmWVVnT3A0MXJJVzZpbExPdDBVZWR2QkE9PSIsIm1hYyI6Ijk0NDMwZjRiMGRhZDExNDdhNjE1MmYwMzBjZGM3ZDgyYmVkNDRlYjc5NWU4Nzg2ZGY4YzFiNzcxNjA4ZGNkZTkifQ%3D%3D'
    //};
    //axios.post(`/api/months?user_id=${user_id}&day_id=${day_id}&relation_type=${this.getAttribute('data-relation')}&payload=${payload}`)
    //.then(response =>
    //{
    //	handleAxiosResponse(response.data);
    //});

    ajax.send("user_id=".concat(user_id, "&day_id=").concat(day_id, "&relation_type=").concat(this.getAttribute('data-relation'), "&payload=").concat(payload));
  }

  function handleAxiosResponse(response) {
    console.log(response);
    selector.style.display = "none";
    day.classList.remove('clicked');
    /*
    If successfully added/deleted relation, change current day style according
    to format that corresponds to its new relation status.
    If relation was not added - log the database error (looks like should
    be considered unsafe in production though)
     */

    var response_code;

    try {
      response_code = response[0];
    } catch (e) {
      console.error(e);
      console.error(response);
      return;
    }

    var relation_type = button.getAttribute('data-relation');

    if (response_code == true) {
      /*
      First remove any extra classes that day can have, because when adding
      new relation, the previous one is deleted
       */
      day.classList.remove('halfday');
      day.classList.remove('offday');

      if (relation_type == "offday") {
        day.classList.add('offday');
      } else if (relation_type == "halfday") {
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

  function handleResponse() {
    //console.log(this.responseText);
    selector.style.display = "none";
    day.classList.remove('clicked');
    /*
    If successfully added/deleted relation, change current day style according
    to format that corresponds to its new relation status.
    If relation was not added - log the database error (looks like should
    be considered unsafe in production though)
     */

    var response_code;

    try {
      response_code = JSON.parse(this.responseText)[0];
    } catch (e) {
      console.error(e);
      console.error(this.responseText);
      return;
    }

    var relation_type = button.getAttribute('data-relation');

    if (response_code == true) {
      /*
      First remove any extra classes that day can have, because when adding
      new relation, the previous one is deleted
       */
      day.classList.remove('halfday');
      day.classList.remove('offday');

      if (relation_type == "offday") {
        day.classList.add('offday');
      } else if (relation_type == "halfday") {
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
});

/***/ }),

/***/ "./resources/js/ShortNames.js":
/*!************************************!*\
  !*** ./resources/js/ShortNames.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var users = window.users; //console.log(users);

  var ids = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = users[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var user = _step.value;
      ids.push("u" + user["id"]);
    } //console.log(ids);

  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var fields = [];

  for (var _i = 0; _i < ids.length; _i++) {
    var id = ids[_i];
    fields.push(Array.from(document.querySelectorAll('.' + id)));
  } //console.log(fields);


  var shortened = false;
  if (window.innerWidth < 880) transformNames("short_name");

  function transformNames(name_type) {
    for (var i = 0; i < users.length; i++) {
      for (var j = 0; j < fields[i].length; j++) {
        if (!shortened) {
          fields[i][j].style.width = "35px";
          fields[i][j].style.height = "35px";
          fields[i][j].style.textAlign = "center"; //console.log(Number(users[i]["has_image"]));

          if (Number(users[i]["has_image"])) {
            fields[i][j].innerHTML = "<img src=\"/img/".concat(users[i]['id'], ".jpg\" alt=\"").concat(users[i][name_type], "\"/>");
          } else {
            fields[i][j].innerHTML = users[i][name_type];
          }
        } else {
          fields[i][j].removeAttribute("style");
          fields[i][j].innerHTML = users[i][name_type];
        }
      }
    }

    shortened = !shortened;
  }

  window.addEventListener('resize', handleNames);

  function handleNames() {
    //console.log(window.innerWidth);
    if (window.innerWidth < 880 && !shortened) transformNames("short_name");else if (window.innerWidth >= 880 && shortened) transformNames("name");
  }
});

/***/ }),

/***/ "./resources/js/month.js":
/*!*******************************!*\
  !*** ./resources/js/month.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ShortNames_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ShortNames.js */ "./resources/js/ShortNames.js");
/* harmony import */ var _Main_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Main.js */ "./resources/js/Main.js");

Object(_ShortNames_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

Object(_Main_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

/***/ }),

/***/ 1:
/*!*************************************!*\
  !*** multi ./resources/js/month.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/argos/Code/graph/resources/js/month.js */"./resources/js/month.js");


/***/ })

/******/ });