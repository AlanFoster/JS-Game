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
        var angle = MathHelpers.angleBetween(to, from);
        var angleDifference = angle - from.rotation;

        var sensitivity = Math.PI / 120;

        var newRotation = Math.abs(angleDifference) >= sensitivity ? angleDifference : from.rotation;

        return newRotation;
    };

    var rotateTowardsSmoothly = function(from, to) {
        var newRotation = rotateTowards(from, to);
        var oldRotation = from.rotation;

        var maximumTurningDistance = Math.PI / 180;
        var turnLeft = oldRotation > newRotation + Math.PI || oldRotation < newRotation
        var smoothRotation = turnLeft ? maximumTurningDistance : -maximumTurningDistance;

        return oldRotation + smoothRotation;
    };

    System.prototype = {
        update: function (entities) {
            var process = this.process;
            entities.forEach(function (entity) {
                var location = entity.getComponent('location');
                var velocity = entity.getComponent('velocity');
                var bot = entity.getComponent('bot');

                if (!location || !velocity || !bot) return;

                process(entity, {location: location, velocity: velocity, bot: bot})
            })
        },
        process: function (entity, components) {
            var location = components.location;
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
                        //x: ~~(Math.random() * 400),
                        //y: ~~(Math.random() * 400)
                        x: 200,
                        y: 200
                    };

                    //velocity.x = 2;
                    //velocity.y = 2;

                    bot.state = 'roaming';
                    break;

                case 'roaming':
                    location.rotation = rotateTowardsSmoothly(location, bot.target);

                    //bot.target.x = 100 + ((bot.target.x + 1) % 200);

                    //location.x += velocity.x * Math.cos(location.rotation);
                    //location.y += velocity.y * Math.sin(location.rotation);

                    var distanceFromTarget = MathHelpers.distanceBetween(location, bot.target);
                    if(distanceFromTarget < 20) {
                        changeState(bot);
                    }

                    //bot.roamCount = (bot.roamCount + 1) % 200;
                    //if (bot.roamCount == 0) {
                    //    changeState(bot);
                    //}

                    break;
            }

        }
    };

    return System;
})();

module.exports = Movement;