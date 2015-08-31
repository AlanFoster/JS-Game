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

	var _ = __webpack_require__(1);

	var getWorldSizeFor = function(target) {
	  return {
	    width: window.innerWidth - 30,
	    height: window.innerHeight - 30
	  };
	};

	var createWorldFor = function(target) {
	    var entityManager = __webpack_require__(2).create();
	    var systemManager = __webpack_require__(6).create(entityManager);
	    var assetManager = __webpack_require__(28);
	    var runner = __webpack_require__(30);

	    systemManager.register(new RandomEntityCreatorSystem(entityManager));

	    var world = {
	        entityManager: entityManager,
	        assetManager: assetManager,

	        size: getWorldSizeFor(target)
	    };

	    world.renderer = new Renderer(target).setUp(world);

	    assetManager.load([
	        { src: 'images/player.gif', name: 'player' },
	        { src: 'images/enemy.gif', name: 'enemy' },
	        { src: 'images/bullet.png', name: 'bullet' }
	    ], function () {
	        runner.queue(function () {
	            systemManager.update(world);
	        })
	    })
	};

	window.onload = function () {
	    createWorldFor(document.getElementById('game'));
	};

	var Renderer = (function () {
	    var Renderer = function (target) {
	        this.target = target;

	        this.context = undefined;
	    };

	    Renderer.noop = {
	      clear: function() { },
	      batch: function(drawingFunction) { }
	    };

	    Renderer.prototype = {
	        setUp: function (world) {
	            if (!this.target) return Renderer.noop;

	            this.size = world.size;

	            var canvas = document.createElement('canvas');
	            canvas.width = this.size.width;
	            canvas.height = this.size.height;

	            this.context = canvas.getContext('2d');

	            this.target.appendChild(canvas);

	            return this;
	        },
	        clear: function () {
	            var context = this.context;

	            context.clearRect(0, 0, this.size.width, this.size.height);
	            context.moveTo(0, 0);
	        },
	        batch: function(drawingFunction) {
	            var context = this.context;

	            context.save();
	            drawingFunction(context);
	            context.restore();
	        }
	    };

	    return Renderer;
	})();


	var Components = __webpack_require__(15);
	var RandomEntityCreatorSystem = (function() {
	  var System = function(entityManager) {
	    this.entityManager = entityManager;

	    this.callCount = 0;
	  };

	  var random = function(min, max) {
	    return ~~(min + (Math.random() * (max - min)));
	  };

	  System.prototype = {
	    update: function(entities, world) {
	      this.callCount++;
	      if(this.callCount != 1) return;

	      var colors = [
	        'red', 'white', 'blue'
	      ];

	      var assetManager = world.assetManager;

	      var createTank = function(graphic) {
	        var entity = this.entityManager
	          .createEntity()
	          .addComponent(new Components.Rendered({
	            width: 66,
	            height: 66,
	            graphic: assetManager.assets[graphic]
	          }))
	          .addComponent(new Components.Velocity({
	            x: 0,
	            y: 0
	          }))
	          .addComponent(new Components.Spatial({
	            x: random(150, 300),
	            y: random(150, 300),
	            width: 66,
	            height: 66
	          }))
	          .addComponent(new Components.Acceleration({ power: 0.3, maxSpeed: 5 }))
	          .addComponent(new Components.Friction({}))
	          .addComponent(new Components.Health({ current: random(0, 20), maximum: 20 }))
	          .addComponent(new Components.Shootable({}))

	        return entity;
	      }.bind(this);

	      var player = createTank('player').addComponent(new Components.Keyboard({}))
	        .addComponent(new Components.Camera({}))

	      for(var i = 0; i < 3; i++ ) {
	        createTank('enemy').addComponent(new Components.Bot())
	      }
	    }
	  };

	  return System;
	})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function() {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var
	    push             = ArrayProto.push,
	    slice            = ArrayProto.slice,
	    toString         = ObjProto.toString,
	    hasOwnProperty   = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var
	    nativeIsArray      = Array.isArray,
	    nativeKeys         = Object.keys,
	    nativeBind         = FuncProto.bind,
	    nativeCreate       = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function(){};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1: return function(value) {
	        return func.call(context, value);
	      };
	      case 2: return function(value, other) {
	        return func.call(context, value, other);
	      };
	      case 3: return function(value, index, collection) {
	        return func.call(context, value, index, collection);
	      };
	      case 4: return function(accumulator, value, index, collection) {
	        return func.call(context, accumulator, value, index, collection);
	      };
	    }
	    return function() {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function(value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function(keysFunc, undefinedOnly) {
	    return function(obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor;
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function(key) {
	    return function(obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function(obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function(obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function(obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function(obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function(value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function(obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function(obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function(value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function(obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function(obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function(obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function(obj, iteratee, context) {
	    var result = -Infinity, lastComputed = -Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function(obj, iteratee, context) {
	    var result = Infinity, lastComputed = Infinity,
	        value, computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function(obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function(obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function(value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function(left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function(behavior) {
	    return function(obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function(value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key].push(value); else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function(result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function(result, value, key) {
	    if (_.has(result, key)) result[key]++; else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function(obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function(obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [], fail = [];
	    _.each(obj, function(value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function(array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function(array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function(array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function(array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function(input, shallow, strict, startIndex) {
	    var output = [], idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0, len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function(array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function(array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function(array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function() {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function(array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function(array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function(value){
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function() {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function(array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function(list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function(array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function(array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0, high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1; else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function(array, item, idx) {
	      var i = 0, length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	            i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function(start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function(func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function(func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function() {
	      var position = 0, length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) args.push(arguments[position++]);
	      return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function(obj) {
	    var i, length = arguments.length, key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function(func, hasher) {
	    var memoize = function(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function(func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function(){
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function(func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function() {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function(func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function() {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function(func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function(predicate) {
	    return function() {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function() {
	    var args = arguments;
	    var start = args.length - 1;
	    return function() {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) result = args[i].call(this, result);
	      return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function(times, func) {
	    return function() {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function(times, func) {
	    var memo;
	    return function() {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
	                      'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) if (_.has(obj, key)) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function(obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) keys.push(key);
	    // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function(obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys =  _.keys(obj),
	          length = keys.length,
	          results = {},
	          currentKey;
	      for (var index = 0; index < length; index++) {
	        currentKey = keys[index];
	        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	      }
	      return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function(obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function(obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function(obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function(obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj), key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function(object, oiteratee, context) {
	    var result = {}, obj = object, iteratee, keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function(value, key, obj) { return key in obj; };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	   // Return a copy of the object without the blacklisted properties.
	  _.omit = function(obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function(prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function(obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function(obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function(object, attrs) {
	    var keys = _.keys(attrs), length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };


	  // Internal recursive comparison function for `isEqual`.
	  var eq = function(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if (typeof a != 'object' || typeof b != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor, bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor &&
	                               _.isFunction(bCtor) && bCtor instanceof bCtor)
	                          && ('constructor' in a && 'constructor' in b)) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a), key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function(a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function(obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function(obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function(obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
	    _['is' + name] = function(obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function(obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    _.isFunction = function(obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function(obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function(obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function(obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function(obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function(obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function(obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function() {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function(value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function(value) {
	    return function() {
	      return value;
	    };
	  };

	  _.noop = function(){};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function(obj) {
	    return obj == null ? function(){} : function(key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function(attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function(obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function(n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) accum[i] = iteratee(i);
	    return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function(min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function() {
	    return new Date().getTime();
	  };

	   // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function(map) {
	    var escaper = function(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function(string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function(object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function(prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate    : /<%([\s\S]+?)%>/g,
	    interpolate : /<%=([\s\S]+?)%>/g,
	    escape      : /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function(text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([
	      (settings.escape || noMatch).source,
	      (settings.interpolate || noMatch).source,
	      (settings.evaluate || noMatch).source
	    ].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," +
	      "print=function(){__p+=__j.call(arguments,'');};\n" +
	      source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function(obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function(obj) {
	    _.each(_.functions(obj), function(name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function() {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function(name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function() {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function() {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function() {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}.call(this));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Entity = __webpack_require__(3);
	var EntityManager = __webpack_require__(4);
	var IdGenerator = __webpack_require__(5);

	module.exports = {
	    create: function() {
	        return new EntityManager(Entity, new IdGenerator());
	    }
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Entity = (function() {
	    var Entity = function(id) {
	        this.id = id;
	        this.components = {};
	    };

	    Entity.prototype = {
	        addComponent: function(component) {
	            this.components[component.tag] = component;
	            return this;
	        },
	        getComponent: function(tag) {
	            return this.components[tag];
	        },
	        removeComponent: function(tag) {
	            delete this.components[tag];
	        },
	        toString: function() {
	            return JSON.stringify(this, null, 4)
	        }
	    };

	    return Entity;
	})();

	module.exports = Entity;


/***/ },
/* 4 */
/***/ function(module, exports) {

	var EntityManager = (function () {
	    var EntityManager = function (Entity, idGenerator) {
	        this.Entity = Entity;
	        this.idGenerator = idGenerator;
	        this.entities = []
	    };

	    EntityManager.prototype = {
	        createEntity: function(){
	            var entity = new this.Entity(this.idGenerator.next())
	            this.entities.push(entity);
	            return entity;
	        }
	    };

	    return EntityManager;
	})();

	module.exports = EntityManager;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var SequentialIdGenerator = function() {
	    var count = 0;
	    return {
	        next: function() {
	            return ++count;
	        }
	    };
	};

	module.exports = SequentialIdGenerator;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var SystemManager = __webpack_require__(7);
	var KeyboardSystem = __webpack_require__(8);
	var MovementSystem = __webpack_require__(9);
	var RenderSystem = __webpack_require__(10);
	var FrictionSystem = __webpack_require__(11);
	var BotSystem = __webpack_require__(12);
	var ShootableSystem = __webpack_require__(14);

	module.exports = {
	    create: function() {
	        var systemManager = new SystemManager([
	            new KeyboardSystem(window).setUp(),
	            new BotSystem(),
	            new FrictionSystem(),
	            new MovementSystem(),
	            new ShootableSystem(),
	            new RenderSystem()
	        ]);

	        return systemManager;
	    }
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);

	var Manager = (function() {
	    var Manager = function(systems) {
	        this.systems = systems || []
	    };

	    Manager.prototype = {
	        register: function(systems) {
	            systems = _.isArray(systems) ? systems : [systems];
	            this.systems = this.systems.concat(systems)
	        },
	        update: function(world) {
	            world.renderer.clear();

	            _.each(this.systems, function(system) {
	                system.update(world.entityManager.entities, world);
	            });
	        }
	    };

	    return Manager;
	})();

	module.exports = Manager;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);

	var Keyboard = (function() {
	    var System = function(window) {
	        this.window = window;
	        this.keysDown = { };
	    };

	    var clamp = function(value) {
	        return function(between) {
	            if (value > between.to) { return between.to }
	            if (value < between.from) { return between.from }
	            return value;
	        }
	    };

	    var processMovement = function(entity, components, keysDown) {
	        var velocity = components.velocity;
	        var spatial = components.spatial;
	        var acceleration = components.acceleration;

	        var velocityUpdates = [];

	        var power = acceleration.power;
	        var maxSpeed = acceleration.maxSpeed;
	        var rotation = acceleration.turningSpeed;


	        if(keysDown.left) velocityUpdates.push({ x: 0, y: 0, rotation: -rotation });
	        if(keysDown.right) velocityUpdates.push({ x: 0, y: 0, rotation: rotation });

	        if(keysDown.up) velocityUpdates.push({ x: power, y: power, rotation: 0 });
	        if(keysDown.down) velocityUpdates.push({ x: -power, y: -power, rotation: 0 });

	        _.each(velocityUpdates, function(update) {
	            velocity.x = clamp(velocity.x + update.x)({ from : -maxSpeed, to: maxSpeed });
	            velocity.y = clamp(velocity.y + update.y)({ from : -maxSpeed, to: maxSpeed });

	            spatial.rotation += update.rotation
	        });
	    };

	    var changeCamera = function(entities) {
	        var entityWithCamera = _.find(entities, function(entity) { return entity.getComponent('camera'); });
	        console.log(entityWithCamera.id)
	        var camera = entityWithCamera.getComponent('camera');
	        entityWithCamera.removeComponent('camera');
	        entities[_.random(0, entities.length - 1)].addComponent(camera);
	    };

	    var processShooting = function(entity, components, keysDown) {
	        var shootable = entity.getComponent('shootable');
	        if(!shootable) return;

	        if(keysDown.space) {
	            shootable.firing = true;
	        }
	    };

	    var keyMappings = {
	        37: 'left',
	        38: 'up',
	        39: 'right',
	        40: 'down',
	        32: 'space',
	        13: 'enter'
	    };

	    System.prototype = {
	        setUp: function() {
	            this.window.onkeydown = this.window.onkeyup = this.handleKey.bind(this);
	            return this;
	        },
	        handleKey: function(event) {
	            var keyCode = event.keyCode || event.which;
	            var key = keyMappings[keyCode];
	            if (!key) return;

	            this.keysDown[key] = event.type == 'keydown';
	        },
	        update: function(entities) {
	            if(this.keysDown.enter) {
	                changeCamera(entities);
	            }

	            var process = this.process.bind(this);
	            entities.forEach(function(entity) {
	                var velocity = entity.getComponent('velocity');
	                var spatial = entity.getComponent('spatial');
	                var keyboard = entity.getComponent('keyboard');
	                var acceleration = entity.getComponent('acceleration');
	                if (!velocity || !keyboard || !acceleration) return;

	                process(entity, { velocity: velocity, keyboard: keyboard, spatial: spatial, acceleration: acceleration })
	            });
	        },
	        process: function(entity, components) {
	            processMovement(entity, components, this.keysDown);
	            processShooting(entity, components, this.keysDown);
	        }
	    };

	    return System;
	})();

	module.exports = Keyboard;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var Movement = (function() {
	    var System = function() {

	    };

	    System.prototype = {
	        update: function(entities) {
	            var process = this.process;
	            entities.forEach(function(entity) {
	                var spatial = entity.getComponent('spatial');
	                var velocity = entity.getComponent('velocity');
	                if (!spatial || !velocity) return;

	                process(entity, { spatial: spatial, velocity: velocity })
	            })
	        },
	        process: function(entity, components) {
	            var spatial = components.spatial;
	            var velocity = components.velocity;

	            spatial.x += velocity.x * Math.cos(spatial.rotation);
	            spatial.y += velocity.y * Math.sin(spatial.rotation);
	        }
	    };

	    return System;
	})();

	module.exports = Movement;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);

	var Render = (function () {
	    var System = function () {
	    };

	    var botDebugRenderer = (function() {
	        return {
	            draw: function (entity, spatial, context) {
	                var botComponent = entity.getComponent('bot');
	                if (botComponent && botComponent.target) {
	                    var x = botComponent.target.x;
	                    var y = botComponent.target.y;

	                    context.fillStyle = 'blue';
	                    context.fillRect(x, y, 5, 5);
	                }
	            }
	        };
	    })();

	    var componentDebugRenderer = (function() {
	        return {
	            draw: function(entity, context, size) {
	                if (!entity.getComponent('camera')) return;

	                var capitalizeFirst = function(string) { return string[0].toUpperCase() + string.substr(1) }
	                var componentDebug = _.flatten(_.map(entity.components, function(component) {
	                    var debugged = _.drop(component.toString().split('\n'));

	                    var tag = capitalizeFirst(component.tag);
	                    var splitter = debugged.length === 0 ? '{ }' : '{';
	                    return [tag + ': ' + splitter].concat(debugged);
	                }));

	                var lines = ['Components for entity #' + entity.id + ' - '].concat(componentDebug);

	                context.fillStyle = 'black';
	                context.font = '15px serif';

	                _.each(lines, function(line, index) {
	                    context.fillText(line, 15, 15 * (index + 1));
	                });
	            }
	        }
	    })();

	    var healthBarRenderer = (function() {
	        var calculateHealthBar = function(health, spatial) {
	            var healthBarTotalWidth = 180;
	            return {
	                totalWidth: healthBarTotalWidth,
	                height: 18,
	                greenBarWidth: health.percentage() * healthBarTotalWidth,

	                drawAt: {
	                    x: spatial.center.x - healthBarTotalWidth / 2,
	                    y: spatial.y - 45
	                }
	            };
	        };

	        var colors = {
	            background: 'red',
	            foreground: '#6CDE68',
	            border: '#135E2F'
	        };

	        return {
	            draw: function(entity, spatial, context) {
	                var health = entity.getComponent('health');
	                if (!health) return;

	                var healthBar = calculateHealthBar(health, spatial);

	                context.fillStyle = colors.background;
	                context.fillRect(healthBar.drawAt.x, healthBar.drawAt.y, healthBar.totalWidth, healthBar.height);

	                context.fillStyle = colors.foreground;
	                context.fillRect(healthBar.drawAt.x, healthBar.drawAt.y, healthBar.greenBarWidth, healthBar.height);

	                context.strokeStyle = colors.border;
	                context.lineWidth = 2;
	                context.beginPath();
	                context.rect(healthBar.drawAt.x, healthBar.drawAt.y, healthBar.totalWidth, healthBar.height);
	                context.stroke()
	            }
	        }
	    })();

	    System.prototype = {
	        setUp: function () {

	        },
	        getCamera: function(entities) {
	            var entityWithCamera = _.find(entities, function(entity) {
	                return entity.getComponent('camera')
	            });

	            if (!entityWithCamera) return { x: 0, y: 0 };

	            var spatial = entityWithCamera.getComponent('spatial');
	            var rendered = entityWithCamera.getComponent('rendered');
	            var camera = spatial.center;

	            return camera;
	        },
	        update: function (entities, world) {
	            var renderer = world.renderer;
	            if (!renderer) return; // TODO

	            var camera = this.getCamera(entities);

	            var process = this.process.bind(this);
	            entities.forEach(function (entity) {
	                var rendered = entity.getComponent('rendered');
	                var spatial = entity.getComponent('spatial');
	                if (!rendered || !spatial) return;

	                process(entity, {rendered: rendered, spatial: spatial}, camera, renderer, world)
	            })
	        },
	        process: function (entity, components, camera, renderer, world) {
	            var rendered = components.rendered;
	            var spatial = components.spatial;

	            renderer.batch(function(context) {
	                botDebugRenderer.draw(entity, spatial, context);
	                healthBarRenderer.draw(entity, spatial, context);
	                componentDebugRenderer.draw(entity, context);

	                var center = spatial.center;

	                var drawAt = {
	                    x: -(spatial.width / 2),
	                    y: -(spatial.height / 2)
	                };

	                context.translate(center.x, center.y);

	                context.rotate(spatial.rotation);

	                if(rendered.color) {
	                    context.fillStyle = rendered.color;
	                    context.fillRect(drawAt.x, drawAt.y, rendered.width, rendered.height);
	                } else if(rendered.graphic) {
	                    context.drawImage(rendered.graphic, drawAt.x, drawAt.y);
	                }
	            });

	        }
	    };

	    return System;
	})();

	module.exports = Render;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);

	var Friction = (function() {
	    var System = function(window) {
	        this.window = window;
	        this.keysDown = { };
	    };

	    System.prototype = {
	        setUp: function() {

	        },
	        update: function(entities) {
	            var process = this.process.bind(this);
	            entities.forEach(function(entity) {
	                var velocity = entity.getComponent('velocity');
	                var friction = entity.getComponent('friction');
	                if (!velocity || !friction) return;

	                process(entity, { velocity: velocity, friction: friction })
	            });

	            this.keysDown = {};
	        },
	        process: function(entity, components) {
	            var velocity = components.velocity;
	            var friction = components.friction;

	            velocity.x *= friction.resistance;
	            velocity.y *= friction.resistance;

	            if(Math.abs(velocity.x) < 0.001) { velocity.x = 0; }
	            if(Math.abs(velocity.y) < 0.001) { velocity.y = 0; }
	        }
	    };

	    return System;
	})();

	module.exports = Friction;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var MathHelpers = __webpack_require__(13);

	var Movement = (function () {
	    var System = function () {

	    };

	    var randomBotState = function () {
	        var states = [
	            //'neutral',
	            'roam'
	        ];

	        return states[~~(Math.random() * states.length)];
	    };

	    var changeState = function (bot) {
	        bot.state = randomBotState()
	    };

	    var rotateTowards = function (from, to) {
	        var angle = MathHelpers.normalizeRadians(MathHelpers.angleBetween(to, from.center));
	        var angleDifference = angle - from.rotation;

	        var sensitivity = Math.PI / 120;

	        var newRotation = Math.abs(angleDifference) >= sensitivity ? angle : from.rotation;

	        return newRotation;
	    };

	    var rotateTowardsSmoothly = function(from, to) {
	        var newRotation = rotateTowards(from, to);
	        var oldRotation = from.rotation;

	        var maximumTurningDistance = Math.PI / 120;
	        var turnLeft = oldRotation > newRotation + Math.PI || oldRotation < newRotation;
	        var smoothRotation = turnLeft ? maximumTurningDistance : -maximumTurningDistance;

	        return oldRotation + smoothRotation;
	    };

	    System.prototype = {
	        update: function (entities, world) {
	            var process = this.process;
	            entities.forEach(function (entity) {
	                var spatial = entity.getComponent('spatial');
	                var velocity = entity.getComponent('velocity');
	                var bot = entity.getComponent('bot');

	                if (!spatial || !velocity || !bot) return;

	                process(entity, {spatial: spatial, velocity: velocity, bot: bot}, world)
	            })
	        },
	        process: function (entity, components, world) {
	            var spatial = components.spatial;
	            var velocity = components.velocity;
	            var bot = components.bot;

	            switch (bot.state) {
	                case 'neutral':
	                    velocity.x = 0;
	                    velocity.y = 0;
	                    bot.state = 'roam';

	                    break;

	                case 'roam':
	                    bot.target = {
	                        x: ~~(Math.random() * world.size.width),
	                        y: ~~(Math.random() * world.size.height)
	                    };

	                    bot.state = 'roaming';
	                    break;

	                case 'roaming':
	                    spatial.rotation = rotateTowardsSmoothly(spatial, bot.target);
	                    entity.getComponent('shootable').firing = true;
	                    velocity.x = 1.8;
	                    velocity.y = 1.8;

	                    spatial.x += velocity.x * Math.cos(spatial.rotation);
	                    spatial.y += velocity.y * Math.sin(spatial.rotation);

	                    var distanceFromTarget = MathHelpers.distanceBetween(spatial.center, bot.target);
	                    if(distanceFromTarget < ((spatial.height + spatial.width) / 2)) {
	                        changeState(bot);
	                    }

	                    bot.roamCount = (bot.roamCount + 1) % 2000;
	                    if (bot.roamCount == 0) {
	                        changeState(bot);
	                    }

	                    break;
	            }

	        }
	    };

	    return System;
	})();

	module.exports = Movement;

/***/ },
/* 13 */
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

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(15)

	var Shootable = (function() {
	    var System = function() {

	    };

	    var createBullet = function(world, parent, components) {
	        var spatial = components.spatial;
	        var shootable = components.shootable;

	        return world.entityManager.createEntity()
	                            .addComponent(new Components.Rendered({
	                                width: 66,
	                                height: 66,
	                                graphic: world.assetManager.assets.bullet
	                            }))
	                            .addComponent(new Components.Velocity({ x: shootable.speed, y: shootable.speed }))
	                            .addComponent(new Components.Spatial({
	                                x: spatial.x,
	                                y: spatial.y,
	                                width: 66,
	                                height: 66,
	                                rotation: spatial.rotation
	                            }))
	    };

	    var allowedToShoot = function(shootable) {
	        if (!(shootable && shootable.firing)) return false;

	        return shootable.currentWaitPeriod == 0;
	    };

	    System.prototype = {
	        update: function(entities, world) {
	            var process = this.process;
	            entities.forEach(function(entity) {
	                var spatial = entity.getComponent('spatial');
	                var shootable = entity.getComponent('shootable');
	                if (!spatial || !shootable) return;

	                process(entity, { spatial: spatial, shootable: shootable }, world)
	            })
	        },
	        process: function(entity, components, world) {
	            var shootable = components.shootable;
	            if(shootable.currentWaitPeriod) {
	                shootable.currentWaitPeriod--;
	            }

	            shootable.firing = allowedToShoot(shootable);
	            if(!shootable.firing) return;

	            createBullet(world, entity, components);
	            shootable.firing = false;
	            shootable.currentWaitPeriod = shootable.waitPeriod;
	        }
	    };

	    return System;
	})();

	module.exports = Shootable;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);

	var allComponents = _.object(_.map([
	    'Rendered',
	    'Velocity',
	    'Spatial',
	    'Acceleration',
	    'Keyboard',
	    'Friction',
	    'Health',
	    'Camera',
	    'Bot',
	    'Shootable'
	], function(tag) {
	    return [tag, __webpack_require__(16)("./" + tag.toLowerCase())];
	}));

	module.exports = allComponents;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./acceleration": 17,
		"./acceleration.js": 17,
		"./bot": 19,
		"./bot.js": 19,
		"./camera": 20,
		"./camera.js": 20,
		"./friction": 21,
		"./friction.js": 21,
		"./health": 22,
		"./health.js": 22,
		"./index": 15,
		"./index.js": 15,
		"./keyboard": 23,
		"./keyboard.js": 23,
		"./rendered": 24,
		"./rendered.js": 24,
		"./shootable": 25,
		"./shootable.js": 25,
		"./spatial": 26,
		"./spatial.js": 26,
		"./velocity": 27,
		"./velocity.js": 27
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 16;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);

	module.exports = Components.create('acceleration', {
	    power: 0.2,
	    maxSpeed: 5,
	    turningSpeed: Math.PI / 180
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);

	var safeAccess = function(hash) {
	    return function(key, fallback) {
	        var value = hash[key];
	        return _.isUndefined(value) ? fallback : value;
	    };
	};

	module.exports.create = function(tag, properties, prototype, computedProperties) {
	    prototype = prototype || { };
	    computedProperties = computedProperties || { };

	    var Component = function(instanceProperties) {
	        instanceProperties = instanceProperties || {};

	        _.each(computedProperties, function(computation, property) {
	            Object.defineProperty(this, property, computation);
	        }, this);

	        _.each(properties, function(fallback, property) {
	            this[property] = safeAccess(instanceProperties)(property, fallback)
	        }, this);
	    };

	    Component.prototype = _.extend({
	        tag: tag,
	        toString: function() {
	            return JSON.stringify(this, null, 4)
	        }
	    }, prototype);

	    return Component;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);

	module.exports = Components.create('bot', {
	    state: 'roam',
	    counter: 0,
	    roamCount: 0
	});


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);

	module.exports = Components.create('camera', {
	});


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);

	module.exports = Components.create('friction', {
	    resistance: 0.9
	});


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);

	module.exports = Components.create('health', {
	    current: 50,
	    maximum: 100
	}, {
	    percentage: function() {
	        return this.current / this.maximum;
	    }
	});


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);

	module.exports = Components.create('keyboard', {});


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);

	module.exports = Components.create('rendered', {
	    width: 100,
	    height: 100,
	    color: undefined,
	    graphic: undefined
	}, {
	    toString: function() {
	        return JSON.stringify({ width: this.width, height: this.height}, null, 4);
	    }
	});


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);

	module.exports = Components.create('shootable', {
	    speed: 9,
	    // In milliseconds
	    life: 5000,
	    damage: 0,
	    // How many ticks before being allowed to shoot again
	    waitPeriod: 40,
	    currentWaitPeriod: 0,
	    // Flag to denote whether we wish to fire a bullet in
	    // the next logical update
	    firing: false
	});


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);
	var _ = __webpack_require__(1);
	var MathHelper = __webpack_require__(13);

	module.exports = Components.create('spatial', {
	    x: 0,
	    y: 0,
	    width: 0,
	    height: 0,
	    rotation: 0
	}, {}, {
	    rotation: {
	        set: function (value) {
	            this._rotation = MathHelper.normalizeRadians(value);
	        },
	        get: function () {
	            return this._rotation;
	        }
	    },
	    center: {
	        get: function() {
	            var x = this.x + (this.width / 2);
	            var y = this.y + (this.height / 2);

	            return { x: x, y: y }
	        }
	    }
	});


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Components = __webpack_require__(18);

	module.exports = Components.create('velocity', {
	    x: 0,
	    y: 0
	});


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);
	var Loader = __webpack_require__(29);

	module.exports = new Loader();

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(1);

	module.exports = (function () {
	    function Loader() {
	        this.assets = {};
	    };

	    Loader.prototype = {
	        load: function (requiredAssets, callback) {
	            var totalRequired = requiredAssets.length;
	            var totalLoaded = 0;
	            if(totalRequired === 0) callback();

	            var assets = this.assets;

	            _.each(requiredAssets, function(requiredAsset) {
	                var name = requiredAsset.name;
	                var src = requiredAsset.src;

	                var image = new Image();
	                image.onload = function() {
	                    assets[name] = image;
	                    totalLoaded++;
	                    if(totalLoaded === totalRequired) {
	                        callback();
	                    }
	                };
	                image.src = src;
	            });
	        }
	    };

	    return Loader;
	})();

/***/ },
/* 30 */
/***/ function(module, exports) {

	var runLater = (function() {
	    var fallback = function(callback) {
	        var targetFPS = 60;
	        return window.setTimeout(callback, 1000 / targetFPS);
	    };

	    return window.requestAnimationFrame || fallback;
	})();

	var loopEndlessly = function(callback) {
	    runLater(function() {
	        loopEndlessly(callback);
	    });
	    callback();
	};

	module.exports = {
	    queue: loopEndlessly
	}

/***/ }
/******/ ]);