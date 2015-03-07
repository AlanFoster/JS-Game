var Components = require('core/components/index');

module.exports = Components.create('shootable', {
    speed: 9,
    // In milliseconds
    life: 5000,
    damage: 0,
    // How many ticks before being allowed to shoot again
    waitPeriod: 40,
    currentWaitPeriod: 0,
    // Flag to denote whether we wish to fire a bullet in
    // the next logical update
    firing: false
});