var Movement = (function() {
    var System = function() {

    };

    System.prototype = {
        update: function(entities) {
            var process = this.process;
            entities.forEach(function(entity) {
                var spatial = entity.getComponent('spatial');
                var velocity = entity.getComponent('velocity');
                if (!spatial || !velocity) return;

                process(entity, { spatial: spatial, velocity: velocity })
            })
        },
        process: function(entity, components) {
            var spatial = components.spatial;
            var velocity = components.velocity;

            spatial.x += velocity.x * Math.cos(spatial.rotation);
            spatial.y += velocity.y * Math.sin(spatial.rotation);
        }
    };

    return System;
})();

module.exports = Movement;