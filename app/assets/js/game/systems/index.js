var SystemManager = require('./../../core/systems/manager');
var KeyboardSystem = require('./keyboard');
var MovementSystem = require('./movement');
var RenderSystem = require('./render');
var FrictionSystem = require('./friction');
var BotSystem = require('./bot');
var ShootableSystem = require('./shootable');

module.exports = {
    create: function() {
        var systemManager = new SystemManager([
            new KeyboardSystem(window).setUp(),
            new BotSystem(),
            new FrictionSystem(),
            new MovementSystem(),
            new ShootableSystem(),
            new RenderSystem()
        ]);

        return systemManager;
    }
};
