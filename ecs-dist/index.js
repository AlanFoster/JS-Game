'use strict';

var _createWorldFor = require('./dom/create-world-for');
var runner = require('./dom/runner');
var Assets = require('./assets');
var Components = require('./components');
var Entities = require('./entities');
var Generators = require('./generators');
var Math = require('./math');
var Systems = require('./systems');

var ecs = {
  createWorldFor: function createWorldFor(target) {
    return _createWorldFor(ecs, target);
  },
  runner: runner,
  Assets: Assets,
  Components: Components,
  Entities: Entities,
  Generators: Generators,
  Math: Math,
  Systems: Systems
};

module.exports = ecs;