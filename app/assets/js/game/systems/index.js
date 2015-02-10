var entityManager = require('./../entities').entityManager;
var SystemManager = require('./../../core/systems/manager');
var KeyboardSystem = require('./keyboard');
var MovementSystem = require('./movement');
var RenderSystem = require('./render');
var FrictionSystem = require('./friction');

var Components = require('./../components/index')
var RandomEntityCreatorSystem = (function() {
    var System = function(entityManager) {
        this.entityManager = entityManager;

        this.callCount = 0;
    };

    var random = function(min, max) {
        return ~~(min + (Math.random() * (max - min)));
    };

    System.prototype = {
        update: function(entities) {
            this.callCount++;
            if(this.callCount != 1) return;

            var colors = [
                'red', 'white', 'blue'
            ];

            var entity = this.entityManager.createEntity()
                                            .addComponent(new Components.Rendered({
                                                width: random(0, 60),
                                                height: random(0, 60),
                                                color: colors[random(0, colors.length)]
                                            }))
                                            .addComponent(new Components.Velocity({
                                                x: 0,
                                                y: 0
                                            }))
                                            .addComponent(new Components.Location({
                                                x: random(0, 500),
                                                y: random(0, 500)
                                            }));

            entity.addComponent(new Components.Keyboard({}))
            entity.addComponent(new Components.Acceleration({}))
                  .addComponent(new Components.Friction({}))
        }
    };

    return System;
})();


module.exports = {
    create: function(renderTarget) {
        var systemManager = new SystemManager([
            new KeyboardSystem(window).setUp(),
            new FrictionSystem(),
            new MovementSystem(),
            new RandomEntityCreatorSystem(entityManager),
            new RenderSystem(renderTarget).setUp()
        ]);

        return systemManager;
    }
};