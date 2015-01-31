var subject = require('game/systems/render');
var Entity = require('core/entities/entity');
var Location = require('game/components/location');
var Rendered = require('game/components/rendered');

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
            var rendered = new Rendered();
            var location = new Location();
            var validEntity = new Entity('valid').addComponent(rendered)
                                                 .addComponent(location);

            var invalidEntity1 = new Entity('invalid1');

            beforeEach(function() {
                spyOn(instance, 'process').and.returnValue()
                spyOn(instance, 'preprocess').and.returnValue()
                instance.context = {}
                var entities = [
                    invalidEntity1,
                    validEntity
                ];
                instance.update(entities);
            });

            it('callled preprocess', function() {
                expect(instance.preprocess).toHaveBeenCalled()
            });

            it('called processed the required entities', function(){
                var expectedComponents = {
                    rendered: rendered,
                    location: location
                };

                expect(instance.process).toHaveBeenCalledWith(validEntity, expectedComponents);
            });

            it('did not process invalid entity 1', function() {
                expect(instance.process).not.toHaveBeenCalledWith(invalidEntity1, jasmine.any(Object));
            });
        })
    });

    describe('#process', function() {
      // TODO - Decide how to best test the DOM ...
    });
});
