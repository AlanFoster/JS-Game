window.onload = function() {
    var _ = require('underscore');
    var entityManager = require('game/entities').entityManager;
    var systemManager = require('game/systems').create(document.body);
    var runner = require('core/runner');

    runner.queue(function() {
        systemManager.update(entityManager.entities);
    })
};
