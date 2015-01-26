window.onload = function() {
    var _ = require('underscore');
    var entityManager = require('./game/entities').entityManager;
    var systemManager = require('./game/systems').create(document.body);
    var Components = require('./game/components');
    var runner = require('./core/runner');

    var entity = entityManager.createEntity()
                              .addComponent(new Components.Rendered())
                              .addComponent(new Components.Velocity({ x: 1, y: 3 }))
                              .addComponent(new Components.Location());

    runner.queue(function() {
        systemManager.update(entityManager.entities);
    })
};
