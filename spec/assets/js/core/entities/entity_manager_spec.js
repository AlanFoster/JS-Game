var subject = require('core/entities/entity_manager');
var IdGenerator = require('core/generators/idGenerator');

describe('Entity', function() {
    it('exists', function() {
        expect(subject).toBeTruthy();
    });

    var createEntityManager = function() {
        var MockEntity = function(id) { this.id = id; };
        var idGenerator = new IdGenerator();

        return new subject(MockEntity, idGenerator);
    };

    describe('#createEntity', function() {
        var instance = createEntityManager();

        it('returns an entity', function() {
            expect(instance.createEntity().id).toBe(1)
        });

        it('returns unique identities', function() {
            var first = instance.createEntity();
            var second = instance.createEntity();

            expect(first.id).not.toEqual(second.id)
        })
    });

    describe('#entities', function(){
        context('no entities', function() {
            var instance = createEntityManager();

            it('has no entities', function() {
                expect(instance.entities).toEqual([]);
            });
        });

        context('entities created', function() {
            var instance = createEntityManager();
            var entityOne = instance.createEntity();
            var entityTwo = instance.createEntity();
            var entityThree = instance.createEntity();

            it('has no entities', function() {
                expect(instance.entities).toEqual([entityOne, entityTwo, entityThree]);
            });
        })
    })
});
