var subject = require('./../../../../app/assets/js/entities/entity_manager').EntityManager;

describe('Entity', function() {
    it('exists', function() {
        expect(subject).toBeTruthy();
    });

    var createEntityManager = function() {
        var EntitySpy = function(id) { this.id = id; };

        // TODO Write spy with multiple return values
        var IdGeneratorSpy = {
            next: (function() {
                var count = 0;
                return function() {
                    count++;
                    return 'generated id ' + count;
                }
            })()
        };

        return new subject(EntitySpy, IdGeneratorSpy);
    };

    describe('#createEntity', function() {
        var instance = createEntityManager();

        it('returns an entity', function() {
            expect(instance.createEntity().id).toBe('generated id 1')
        });
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
