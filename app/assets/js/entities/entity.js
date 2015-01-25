var Entity = (function() {
    var Entity = function(id) {
        this.id = id;
        this.components = {};
    };

    Entity.prototype = {
        addComponent: function(component) {
            this.components[component.tag] = component;
            return this;
        },
        getComponent: function(tag) {
            return this.components[tag];
        },
        removeComponent: function(tag) {
            delete this.components[tag];
        },
        toString: function() {
            return JSON.stringify(this, null, 4)
        }
    };

    return Entity;
})();

module.exports = Entity;
