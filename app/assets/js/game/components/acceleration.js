var Components = require('ecs-dist').Components;

module.exports = Components.create('acceleration', {
    power: 0.2,
    maxSpeed: 5,
    turningSpeed: Math.PI / 180
});
