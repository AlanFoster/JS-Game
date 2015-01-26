var subject = require('core/systems/movement');
var Entity = require('core/entities/entity');
var Location = require('core/components/location');
var Velocity = require('core/components/velocity');
var Rendered = require('core/components/rendered');

describe('Movement System', function() {
    it('exists', function() {
        expect(subject).toBeTruthy();
    });

    describe('#update', function(){
        var instance = new subject();

        it('exists', function() {
            expect(instance.update).toBeDefined();
        });

        context('when no entities are supplied', function(){
            it('does not cause an error', function() {
                expect(function() { instance.update([]) } ).not.toThrow();
            })
        });

        context('entities with components supplied', function(){
            var location = new Location();
            var velocity = new Velocity();
            var validEntity = new Entity('valid').addComponent(location)
                                                 .addComponent(velocity)
                                                 .addComponent(new Rendered());

            var invalidEntity1 = new Entity('invalid1').addComponent(new Velocity());
            var invalidEntity2 = new Entity('invalid2').addComponent(new Location());


            beforeEach(function() {
                spyOn(instance, 'process');
                var entities = [
                    invalidEntity1,
                    validEntity,
                    invalidEntity2
                ];
                instance.update(entities);
            });

            it('called processed the required entities', function(){
                var expectedComponents = {
                    location: location,
                    velocity: velocity
                };

                expect(instance.process).toHaveBeenCalledWith(validEntity, expectedComponents);
            });

            it('did not process invalid entity 1', function() {
                expect(instance.process).not.toHaveBeenCalledWith(invalidEntity1, jasmine.any(Object));
            });

            it('did not process invalid entity 2', function() {
                expect(instance.process).not.toHaveBeenCalledWith(invalidEntity2, jasmine.any(Object));
            });
        })
    });

    describe('#process', function() {
        var instance = new subject();
        var entity = undefined;

        beforeEach(function() {
            var velocity = new Velocity({ x: 2, y: 3 });
            var location = new Location({ x: 0, y: 0 });
            entity = new Entity('id').addComponent(location)
                                     .addComponent(velocity);

            instance.process(entity, { velocity: velocity, location: location })
        });

        afterEach(function() {
            entity = undefined;
        });

        it('increases the x position by the y velocity', function() {
            expect(entity.getComponent('location').x).toEqual(2);
        });

        it('increases the y position by the y velocity', function() {
            expect(entity.getComponent('location').y).toEqual(3);
        });
    });
});
