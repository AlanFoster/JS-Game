var createWorldFor = require('./dom/create-world-for');
var runner = require('./dom/runner');
var Assets = require('./assets');
var Components = require('./components');
var Entities = require('./entities');
var Generators = require('./generators');
var Math = require('./math');
var Systems = require('./systems');

var ecs = {
  createWorldFor: function (target) {
    return createWorldFor(ecs, target)
  },
  runner,
  Assets,
  Components,
  Entities,
  Generators,
  Math,
  Systems
};

module.exports = ecs;
