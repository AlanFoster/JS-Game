var _ = require('underscore');

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

    var processMovement = function(entity, components, keysDown) {
        var velocity = components.velocity;
        var spatial = components.spatial;
        var acceleration = components.acceleration;

        var velocityUpdates = [];

        var power = acceleration.power;
        var maxSpeed = acceleration.maxSpeed;
        var rotation = acceleration.turningSpeed;

        if(keysDown.left) velocityUpdates.push({ x: 0, y: 0, rotation: -rotation });
        if(keysDown.right) velocityUpdates.push({ x: 0, y: 0, rotation: rotation });

        if(keysDown.up) velocityUpdates.push({ x: power, y: power, rotation: 0 });
        if(keysDown.down) velocityUpdates.push({ x: -power, y: -power, rotation: 0 });

        _.each(velocityUpdates, function(update) {
            velocity.x = clamp(velocity.x + update.x)({ from : -maxSpeed, to: maxSpeed });
            velocity.y = clamp(velocity.y + update.y)({ from : -maxSpeed, to: maxSpeed });

            spatial.rotation += update.rotation
        });
    };

    var processShooting = function(entity, components, keysDown) {
        var shootable = entity.getComponent('shootable');
        if(!shootable) return;

        if(keysDown.space) {
            shootable.firing = true;
        }
    };

    var keyMappings = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    System.prototype = {
        setUp: function() {
            this.window.onkeydown = this.window.onkeyup = this.handleKey.bind(this);
            return this;
        },
        handleKey: function(event) {
            var keyCode = event.keyCode || event.which;
            var key = keyMappings[keyCode];
            if (!key) return;

            this.keysDown[key] = event.type == 'keydown';
        },
        update: function(entities) {
            var process = this.process.bind(this);
            entities.forEach(function(entity) {
                var velocity = entity.getComponent('velocity');
                var spatial = entity.getComponent('spatial');
                var keyboard = entity.getComponent('keyboard');
                var acceleration = entity.getComponent('acceleration');
                if (!velocity || !keyboard || !acceleration) return;

                process(entity, { velocity: velocity, keyboard: keyboard, spatial: spatial, acceleration: acceleration })
            });

        },
        process: function(entity, components) {
            processMovement(entity, components, this.keysDown);
            processShooting(entity, components, this.keysDown);
        }
    };

    return System;
})();

module.exports = Keyboard;