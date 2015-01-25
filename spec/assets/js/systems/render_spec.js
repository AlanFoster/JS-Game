var subject = require('./../../../../app/assets/js/systems/render');
var Entity = require('./../../../../app/assets/js/entities/entity');
var Location = require('./../../../../app/assets/js/components/location');
var Rendered = require('./../../../../app/assets/js/components/rendered');

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
            var validEntity = new Entity('valid').addComponent(rendered)
                                                 .addComponent(new Location());

            var invalidEntity1 = new Entity('invalid1');

            beforeEach(function() {
                spyOn(instance, 'process');
                var entities = [
                    invalidEntity1,
                    validEntity
                ];
                instance.update(entities);
            });

            it('called processed the required entities', function(){
                var expectedComponents = {
                    rendered: rendered
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
