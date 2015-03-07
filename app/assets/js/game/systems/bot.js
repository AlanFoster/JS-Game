var MathHelpers = require('core/math');

var Movement = (function () {
    var System = function () {

    };

    var randomBotState = function () {
        var states = [
            //'neutral',
            'roam'
        ];

        return states[~~(Math.random() * states.length)];
    };

    var changeState = function (bot) {
        bot.state = randomBotState()
    };

    var rotateTowards = function (from, to) {
        var angle = MathHelpers.normalizeRadians(MathHelpers.angleBetween(to, from.center));
        var angleDifference = angle - from.rotation;

        var sensitivity = Math.PI / 120;

        var newRotation = Math.abs(angleDifference) >= sensitivity ? angle : from.rotation;

        return newRotation;
    };

    var rotateTowardsSmoothly = function(from, to) {
        var newRotation = rotateTowards(from, to);
        var oldRotation = from.rotation;

        var maximumTurningDistance = Math.PI / 120;
        var turnLeft = oldRotation > newRotation + Math.PI || oldRotation < newRotation;
        var smoothRotation = turnLeft ? maximumTurningDistance : -maximumTurningDistance;

        return oldRotation + smoothRotation;
    };

    System.prototype = {
        update: function (entities, world) {
            var process = this.process;
            entities.forEach(function (entity) {
                var spatial = entity.getComponent('spatial');
                var velocity = entity.getComponent('velocity');
                var bot = entity.getComponent('bot');

                if (!spatial || !velocity || !bot) return;

                process(entity, {spatial: spatial, velocity: velocity, bot: bot}, world)
            })
        },
        process: function (entity, components, world) {
            var spatial = components.spatial;
            var velocity = components.velocity;
            var bot = components.bot;

            switch (bot.state) {
                case 'neutral':
                    velocity.x = 0;
                    velocity.y = 0;
                    bot.state = 'roam';

                    break;

                case 'roam':
                    bot.target = {
                        x: ~~(Math.random() * world.size.width),
                        y: ~~(Math.random() * world.size.height)
                    };

                    bot.state = 'roaming';
                    break;

                case 'roaming':
                    spatial.rotation = rotateTowardsSmoothly(spatial, bot.target);
                    entity.getComponent('shootable').firing = true;
                    velocity.x = 1.8;
                    velocity.y = 1.8;

                    spatial.x += velocity.x * Math.cos(spatial.rotation);
                    spatial.y += velocity.y * Math.sin(spatial.rotation);

                    var distanceFromTarget = MathHelpers.distanceBetween(spatial.center, bot.target);
                    if(distanceFromTarget < ((spatial.height + spatial.width) / 2)) {
                        changeState(bot);
                    }

                    bot.roamCount = (bot.roamCount + 1) % 2000;
                    if (bot.roamCount == 0) {
                        changeState(bot);
                    }

                    break;
            }

        }
    };

    return System;
})();

module.exports = Movement;