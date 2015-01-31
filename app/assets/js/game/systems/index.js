var entityManager = require('./../entities').entityManager;
var SystemManager = require('./../../core/systems/manager');
var MovementSystem = require('./movement');
var RenderSystem = require('./render');

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
            if(this.callCount % 10 !== 0) return;

            var colors = [
                'red', 'white', 'blue'
            ];

            this.entityManager.createEntity()
                                .addComponent(new Components.Rendered({
                                    width: random(0, 60),
                                    height: random(0, 60),
                                    color: colors[random(0, colors.length)]
                                }))
                                .addComponent(new Components.Velocity({
                                    x: random(-3, 3) | 1,
                                    y: random(-3, 3 | 1)
                                }))
                                .addComponent(new Components.Location({
                                    x: random(0, 500),
                                    y: random(0, 500)
                                }));
        }
    };

    return System;
})();


module.exports = {
    create: function(renderTarget) {
        var systemManager = new SystemManager([
            new MovementSystem(),
            new RandomEntityCreatorSystem(entityManager),
            new RenderSystem(renderTarget).setUp()
        ]);

        return systemManager;
    }
};