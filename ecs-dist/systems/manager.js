'use strict';

var _ = require('underscore');

var Manager = (function () {
    var Manager = function Manager(systems) {
        this.systems = systems || [];
    };

    Manager.prototype = {
        register: function register(systems) {
            systems = _.isArray(systems) ? systems : [systems];
            this.systems = this.systems.concat(systems);
        },
        update: function update(world) {
            world.renderer.clear();

            _.each(this.systems, function (system) {
                system.update(world.entityManager.entities, world);
            });
        }
    };

    return Manager;
})();

module.exports = Manager;