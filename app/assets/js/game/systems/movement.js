var Movement = (function() {
    var System = function() {

    };

    System.prototype = {
        update: function(entities) {
            var process = this.process;
            entities.forEach(function(entity) {
                var location = entity.getComponent('location');
                var velocity = entity.getComponent('velocity');
                if (!location || !velocity) return;

                process(entity, { location: location, velocity: velocity })
            })
        },
        process: function(entity, components) {
            var location = components.location;
            var velocity = components.velocity;

            location.x += velocity.x * Math.cos(location.rotation);
            location.y += velocity.y * Math.sin(location.rotation);
        }
    };

    return System;
})();

module.exports = Movement;