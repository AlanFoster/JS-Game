"use strict";

var Entity = (function () {
    var Entity = function Entity(id) {
        this.id = id;
        this.components = {};
    };

    Entity.prototype = {
        addComponent: function addComponent(component) {
            this.components[component.tag] = component;
            return this;
        },
        getComponent: function getComponent(tag) {
            return this.components[tag];
        },
        removeComponent: function removeComponent(tag) {
            delete this.components[tag];
        },
        toString: function toString() {
            return JSON.stringify(this, null, 4);
        }
    };

    return Entity;
})();

module.exports = Entity;