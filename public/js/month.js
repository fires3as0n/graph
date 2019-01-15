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
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var days = Array.from(document.querySelectorAll(".day"));

  for (var _i = 0; _i < days.length; _i++) {
    var day = days[_i];
    day.addEventListener('click', handleDayClick);
  }

  var prev_day;

  function handleDayClick(e) {
    if (!prev_day) prev_day = this;
    prev_day.style.border = null;
    prev_day.style.boxShadow = null;
    prev_day = this;
    handleButtonClick.cell = this;
    this.style.border = "3px solid cornflowerblue";
    this.style.boxShadow = "0px 0px 4px 3px rgba(100, 149, 247 , 1)";
    menu.style.display = "block";
    var cell_x = this.getBoundingClientRect().x;
    var cell_y = this.getBoundingClientRect().y;
    var cell_width = this.getBoundingClientRect().width;
    var menu_height = menu.getBoundingClientRect().height;
    var menu_width = menu.getBoundingClientRect().width;
    var window_width = window.innerWidth;
    var menu_x = cell_x - menu_width / 2 + cell_width / 2;
    var menu_y = cell_y - menu_height - 10;

    if (menu_x + menu_width > window_width) {
      menu.style.left = window_width - menu_width - 30 + "px";
    } else if (menu_x < 0) {
      menu.style.left = 15 + "px";
    } else {
      menu.style.left = menu_x + "px";
    }

    menu.style.top = menu_y + "px";
  }

  function handleResponse() {
    var response_code = JSON.parse(this.responseText)[0];
    menu.style.display = "none";
    handleResponse.cell.style.border = null;
    handleResponse.cell.style.boxShadow = null;
    var type = handleResponse.button.getAttribute('data-relation');

    if (response_code == true) {
      if (type == "offday") {
        handleResponse.cell.classList.add('offday');
      } else if (type == "halfday") {
        handleResponse.cell.classList.add('halfday');
      } else {
        handleResponse.cell.classList.remove('halfday');
        handleResponse.cell.classList.remove('offday');
      }

      handleResponse.cell.textContent = handleResponse.payload;
    }
  }

  var buttons = document.querySelectorAll('#selector-2 div');
  buttons.forEach(function (button) {
    button.addEventListener('click', handleButtonClick);
  });

  function handleButtonClick() {
    if (this.getAttribute('data-relation') == "close") {
      menu.style.display = "none";
      handleButtonClick.cell.style.border = null;
      handleButtonClick.cell.style.boxShadow = null;
      return;
    }

    var payload;

    if (this.getAttribute('data-relation') == "customday") {
      payload = prompt("Custom status:").replace(/\s/g, '').slice(0, 3);

      if (payload === null || payload === "") {
        return;
      }
    } else {
      payload = this.textContent.replace(/\s/g, '').slice(0, 3);
    }

    var ajax = new XMLHttpRequest();
    ajax.onload = handleResponse;
    handleResponse.cell = handleButtonClick.cell;
    handleResponse.button = this;
    handleResponse.payload = payload;
    var regex = new RegExp('[\\d]+', 'gi');
    var match = handleButtonClick.cell.id.match(regex);
    var user_id = match[0];
    var day_id = match[1];
    ajax.open('POST', '/api/months', true);
    ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    ajax.send("user_id=".concat(user_id, "&day_id=").concat(day_id, "&relation_type=").concat(this.getAttribute('data-relation'), "&payload=").concat(payload));
  }

  var menu = document.querySelector('#selector-2');
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
  if (window.innerWidth < 810) transformNames("short_name");

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
    if (window.innerWidth < 810 && !shortened) transformNames("short_name");else if (window.innerWidth >= 810 && shortened) transformNames("name");
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

module.exports = __webpack_require__(/*! E:\Code\Graph\resources\js\month.js */"./resources/js/month.js");


/***/ })

/******/ });