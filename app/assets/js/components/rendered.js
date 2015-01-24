var Rendered = (function() {
    var Component = function(instanceProperties) {
        this.color = instanceProperties.color || 'red';
        this.width = instanceProperties.width || 100;
        this.height = instanceProperties.height || 100;
    };

    Component.prototype = {
        tag: 'rendered',
        toString: function() {
            return JSON.stringify(this, undefined, 4);
        }
    };

    return Component;
})();

exports.Rendered = Rendered;