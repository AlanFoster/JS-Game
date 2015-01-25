var _ = require('underscore');

var safeAccess = function(hash) {
    return function(key, fallback) {
        var value = hash[key];
        return _.isUndefined(value) ? fallback : value;
    };
};

exports.create = function(tag, properties) {
    var Component = function(instanceProperties) {
        _.each(properties, function(fallback, property) {
            this[property] = safeAccess(instanceProperties)(property, fallback)
        }, this)
    };

    Component.prototype = {
        tag: tag,
        toString: function() {
            return JSON.stringify(this, null, 4)
        }
    };

    return Component;
};