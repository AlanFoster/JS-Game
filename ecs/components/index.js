var _ = require('underscore');
var MathHelper = require('core/math');

var safeAccess = function(hash) {
    return function(key, fallback) {
        var value = hash[key];
        return _.isUndefined(value) ? fallback : value;
    };
};

module.exports.create = function(tag, properties, prototype, computedProperties) {
    prototype = prototype || { };
    computedProperties = computedProperties || { };

    var Component = function(instanceProperties) {
        instanceProperties = instanceProperties || {};

        _.each(computedProperties, function(computation, property) {
            Object.defineProperty(this, property, computation);
        }, this);

        _.each(properties, function(fallback, property) {
            this[property] = safeAccess(instanceProperties)(property, fallback)
        }, this);
    };

    Component.prototype = _.extend({
        tag: tag,
        toString: function() {
            return JSON.stringify(this, null, 4)
        }
    }, prototype);

    return Component;
};