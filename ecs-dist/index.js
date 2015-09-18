/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  //createWorldFor: require('./dom/create-world-for'),
	  //runner: require('./dom/runner'),
	  //Assets: require('./assets'),
	  //Components: require('./components'),
	  //Entities: require('./entities'),
	  //Generators: require('./generators'),
	  Math: __webpack_require__(1),
	  //Systems: require('./systems')
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	    twoPI: Math.PI * 2,
	    angleBetween: function(from, to) {
	        var x = from.x - to.x;
	        var y = from.y - to.y;
	        return Math.atan2(y, x);
	    },
	    normalizeRadians: function(value) {
	        var twoPI = this.twoPI;
	        var normalizedRadian = value - Math.floor(value / twoPI) * twoPI;

	        return normalizedRadian;
	    },
	    distanceBetween: function(from, to) {
	        var xSquared = Math.pow(from.x - to.x, 2);
	        var ySquared = Math.pow(from.y - to.y, 2);

	        return Math.sqrt(xSquared + ySquared);
	    }
	};

/***/ }
/******/ ]);