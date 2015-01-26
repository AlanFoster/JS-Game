var SystemManager = require('./../core/systems/manager');
var MovementSystem = require('./../core/systems/movement');
var RenderSystem = require('./../core/systems/render');

module.exports = {
    create: function(renderTarget) {
        var systemManager = new SystemManager([
            new MovementSystem(),
            new RenderSystem(renderTarget).setUp()
        ]);

        return systemManager;
    }
};