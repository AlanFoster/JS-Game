var _ = require('underscore');
var Renderer = require('./renderer');

var getWorldSizeFor = function(target) {
  return {
    width: window.innerWidth - 30,
    height: window.innerHeight - 30
  };
};

var createWorldFor = function(target) {
  var entityManager = require('game/entities').create();
  var systemManager = require('game/systems').create(entityManager);
  var assetManager = require('core/assets');
  var runner = require('core/runner');

  var world = {
    entityManager: entityManager,
    assetManager: assetManager,
    systemManager: systemManager,

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
  });

  return world;
};
