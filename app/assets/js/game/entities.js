var Entity = require('./../core/entities/entity');
var EntityManager = require('./../core/entities/entity_manager');
var IdGenerator = require('./../core/generators/idGenerator');

module.exports = {
    entityManager: new EntityManager(Entity, new IdGenerator())
};