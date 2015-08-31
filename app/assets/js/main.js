var _ = require('underscore');

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

    Renderer.prototype = {
        setUp: function (world) {
            if (!this.target) return;

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
