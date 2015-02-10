var Components = require('core/components/index');

module.exports = Components.create('acceleration', {
    power: 0.2,
    maxSpeed: 5,
    turningSpeed: Math.PI / 180
});