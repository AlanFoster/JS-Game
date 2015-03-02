var Components = require('core/components/index');
var _ = require('underscore');
var MathHelper = require('core/math');

module.exports = (function() {
    var Component = function(values) {
        values = values || {};

        Object.defineProperty(this, 'rotation', {
            set: function(value) {
                this._rotation = MathHelper.normalizeRadians(value);
            },
            get: function() {
                return this._rotation;
            }
        });

        Object.defineProperty(this, 'center', {
            get: function() {
                var x = this.x + (this.width / 2);
                var y = this.y + (this.height / 2);

                return { x: x, y: y }
            }
        });

        this.x = _.isUndefined(values.x) ? 0 : values.x;
        this.y = _.isUndefined(values.y) ? 0 : values.y;

        this.width = _.isUndefined(values.width) ? 0 : values.width;
        this.height = _.isUndefined(values.height) ? 0 : values.height;

        this.rotation = _.isUndefined(values.rotation) ?  0 : values.rotation;
    };

    Component.prototype = {
        tag: 'spatial',
        toString: function() {
            return JSON.stringify(this, null, 4)
        }
    };

    return Component;
})();