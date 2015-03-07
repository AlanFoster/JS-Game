var Components = require('core/components/index');
var _ = require('underscore');
var MathHelper = require('core/math');

module.exports = Components.create('spatial', {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotation: 0
}, {}, {
    rotation: {
        set: function (value) {
            this._rotation = MathHelper.normalizeRadians(value);
        },
        get: function () {
            return this._rotation;
        }
    },
    center: {
        get: function() {
            var x = this.x + (this.width / 2);
            var y = this.y + (this.height / 2);

            return { x: x, y: y }
        }
    }
});