var ecs = require('ecs-dist');
var Entity = ecs.Entities.Entity;
var EntityManager = ecs.Entities.EntityManager;
var IdGenerator = ecs.Generators.id;

module.exports = {
    create: function() {
        return new EntityManager(Entity, new IdGenerator());
    }
};
