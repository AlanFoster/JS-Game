var Components = require('game/components')

var Shootable = (function() {
    var System = function() {

    };

    var createBullet = function(world, parent, components) {
        var spatial = components.spatial;
        var shootable = components.shootable;

        return world.entityManager.createEntity()
                            .addComponent(new Components.Rendered({
                                width: 66,
                                height: 66,
                                graphic: world.assetManager.assets.bullet
                            }))
                            .addComponent(new Components.Velocity({ x: shootable.speed, y: shootable.speed }))
                            .addComponent(new Components.Spatial({
                                x: spatial.x,
                                y: spatial.y,
                                width: 66,
                                height: 66,
                                rotation: spatial.rotation
                            }))
    };

    var allowedToShoot = function(shootable) {
        if (!(shootable && shootable.firing)) return false;

        return shootable.currentWaitPeriod == 0;
    };

    System.prototype = {
        update: function(entities, world) {
            var process = this.process;
            entities.forEach(function(entity) {
                var spatial = entity.getComponent('spatial');
                var shootable = entity.getComponent('shootable');
                if (!spatial || !shootable) return;

                process(entity, { spatial: spatial, shootable: shootable }, world)
            })
        },
        process: function(entity, components, world) {
            var shootable = components.shootable;
            if(shootable.currentWaitPeriod) {
                shootable.currentWaitPeriod--;
            }

            shootable.firing = allowedToShoot(shootable);
            if(!shootable.firing) return;

            createBullet(world, entity, components);
            shootable.firing = false;
            shootable.currentWaitPeriod = shootable.waitPeriod;
        }
    };

    return System;
})();

module.exports = Shootable;
