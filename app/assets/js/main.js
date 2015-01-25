var _ = require('underscore');
var Entity = require('./entities/entity');
var EntityManager = require('./entities/entity_manager');
var IdGenerator = require('./generators/idGenerator');
var SystemManager = require('./systems/manager');
var MovementSystem = require('./systems/movement');
var RenderSystem = require('./systems/render');

var Rendered = require('./components/rendered');
var Velocity = require('./components/velocity');
var Location = require('./components/location');

var entityManager = new EntityManager(Entity, new IdGenerator());
var systemManager = new SystemManager([
    new MovementSystem(),
    new RenderSystem()
]);

var entity = entityManager.createEntity()
                          .addComponent(new Rendered())
                          .addComponent(new Velocity({ x: 1, y: 3 }))
                          .addComponent(new Location());


var looper = (function() {
    var runLater = (function() {
        var fallback = function(callback) {
            var targetFPS = 2;
            return window.setTimeout(callback, 1000 / targetFPS);
        };

        return fallback;
    })();

    var loopEndlessly = function(callback) {
        runLater(function() {
            loopEndlessly(callback);
        });
        callback()
    };

    return {
        queue: loopEndlessly
    };
})();

window.onload = function() {
    looper.queue(function() {
        systemManager.update(entityManager.entities);
    })
};

module.exports.world = {
    entities: []
};
