var Velocity = (function() {
    var Component = function(instanceProperties) {
        this.x = instanceProperties.x || 0;
        this.y = instanceProperties.y || 0;
    };

    Component.prototype = {
        tag: 'velocity',
        toString: function() {
            return JSON.stringify(this, undefined, 4);
        }
    };

    return Component;
})();

exports.Velocity = Velocity;