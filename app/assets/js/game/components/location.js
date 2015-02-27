var Components = require('core/components/index');
var _ = require('underscore');
var MathHelper = require('core/math');

module.exports = (function() {
    var Component = function(values) {
        this.x = _.isUndefined(values.x) ? 0 : values.x;
        this.y = _.isUndefined(values.y) ? 0 : values.y;
        this._rotation = _.isUndefined(values.rotation) ?  0 : values._rotation;

        Object.defineProperty(this, 'rotation', {
            set: function(value) {
                this._rotation = MathHelper.normalizeRadians(value);
            },
            get: function() {
                return this._rotation;
            }
        });
    };

    Component.prototype = {
        tag: 'location',
        toString: function() {
            return JSON.stringify(this, null, 4)
        }
    };

    return Component;
})();


//
//module.exports = Components.create('location', {
//    x: 0,
//    y: 0,
//    rotation: 0
//});
