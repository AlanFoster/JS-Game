var _ = require('underscore');

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