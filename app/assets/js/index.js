var ecs = require('ecs-dist');
var createWorldFor = ecs.createWorldFor;
var Components = require('./game/components');

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

window.onload = function () {
  var world = createWorldFor(document.getElementById('game'));

  world.systemManager
       .register(new RandomEntityCreatorSystem(world.entityManager));
};