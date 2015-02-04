var _ = require('underscore')

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

    System.prototype = {
        setUp: function() {
            this.window.onkeydown = this.handleKey.bind(this);
            return this;
        },
        handleKey: function(event) {
            var keyCode = event.keyCode || event.which;

            this.keysDown.left = keyCode == 37;
            this.keysDown.up = keyCode == 38;
            this.keysDown.right = keyCode == 39;
            this.keysDown.down = keyCode == 40;
        },
        update: function(entities) {
            var process = this.process.bind(this);
            entities.forEach(function(entity) {
                var velocity = entity.getComponent('velocity');
                var keyboard = entity.getComponent('keyboard');
                if (!velocity || !keyboard) return;

                process(entity, { velocity: velocity, keyboard: keyboard })
            });

            this.keysDown = {};
        },
        process: function(entity, components) {
            var velocity = components.velocity;
            var velocityUpdates = [];
            var power = 0.2;
            var powerClamp = 2;

            if(this.keysDown.left) velocityUpdates.push({ x: -power, y: 0 });
            if(this.keysDown.up) velocityUpdates.push({ x: 0, y: -power });
            if(this.keysDown.right) velocityUpdates.push({ x: power, y: 0 });
            if(this.keysDown.down) velocityUpdates.push({ x: 0, y: power });

            _.each(velocityUpdates, function(update) {
                velocity.x = clamp(velocity.x + update.x)({ from : -powerClamp, to: powerClamp });
                velocity.y = clamp(velocity.y + update.y)({ from : -powerClamp, to: powerClamp });
            });
        }
    };

    return System;
})();

module.exports = Keyboard;