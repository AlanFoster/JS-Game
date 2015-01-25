var EntityManager = (function () {
    var EntityManager = function (Entity, idGenerator) {
        this.Entity = Entity;
        this.idGenerator = idGenerator;
        this.entities = []
    };

    EntityManager.prototype = {
        createEntity: function(){
            var entity = new this.Entity(this.idGenerator.next())
            this.entities.push(entity);
            return entity;
        }
    };

    return EntityManager;
})();

exports.EntityManager = EntityManager;