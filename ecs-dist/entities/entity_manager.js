"use strict";

var EntityManager = (function () {
    var EntityManager = function EntityManager(Entity, idGenerator) {
        this.Entity = Entity;
        this.idGenerator = idGenerator;
        this.entities = [];
    };

    EntityManager.prototype = {
        createEntity: function createEntity() {
            var entity = new this.Entity(this.idGenerator.next());
            this.entities.push(entity);
            return entity;
        }
    };

    return EntityManager;
})();

module.exports = EntityManager;