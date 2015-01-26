var SystemManager = require('./../core/systems/manager');
var MovementSystem = require('./../core/systems/movement');
var RenderSystem = require('./../core/systems/render');

var systemManager = new SystemManager([
    new MovementSystem(),
    new RenderSystem()
]);

module.exports = {
    systemManager: systemManager
};