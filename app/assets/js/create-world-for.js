//var _ = require('underscore');
//
//var getWorldSizeFor = function(target) {
//  return {
//    width: window.innerWidth - 30,
//    height: window.innerHeight - 30
//  };
//};
//
//var createWorldFor = function(target) {
//  var entityManager = require('game/entities').create();
//  var systemManager = require('game/systems').create(entityManager);
//  var assetManager = require('core/assets');
//  var runner = require('core/runner');
//
//  var world = {
//    entityManager: entityManager,
//    assetManager: assetManager,
//    systemManager: systemManager,
//
//    size: getWorldSizeFor(target)
//  };
//
//  world.renderer = new Renderer(target).setUp(world);
//
//  assetManager.load([
//    { src: 'images/player.gif', name: 'player' },
//    { src: 'images/enemy.gif', name: 'enemy' },
//    { src: 'images/bullet.png', name: 'bullet' }
//  ], function () {
//    runner.queue(function () {
//      systemManager.update(world);
//    })
//  });
//
//  return world;
//};
//
//var Renderer = (function () {
//  var Renderer = function (target) {
//    this.target = target;
//
//    this.context = undefined;
//  };
//
//  Renderer.noop = {
//    clear: function() { },
//    batch: function(drawingFunction) { }
//  };
//
//  Renderer.prototype = {
//    setUp: function (world) {
//      if (!this.target) return Renderer.noop;
//
//      this.size = world.size;
//
//      var canvas = document.createElement('canvas');
//      canvas.width = this.size.width;
//      canvas.height = this.size.height;
//
//      this.context = canvas.getContext('2d');
//
//      this.target.appendChild(canvas);
//
//      return this;
//    },
//    clear: function () {
//      var context = this.context;
//
//      context.clearRect(0, 0, this.size.width, this.size.height);
//      context.moveTo(0, 0);
//    },
//    batch: function(drawingFunction) {
//      var context = this.context;
//
//      context.save();
//      drawingFunction(context);
//      context.restore();
//    }
//  };
//
//  return Renderer;
//})();

module.exports = function() {
  alert('hello world');
};
