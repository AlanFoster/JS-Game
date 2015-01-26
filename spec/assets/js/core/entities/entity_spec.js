var subject = require('./../../../../../app/assets/js/core/entities/entity');

describe('Entity', function() {
    it('exists', function() {
        expect(subject).toBeTruthy();
    });

    describe('#new', function() {
       var instance = new subject('id');

        it('has an id', function() {
            expect(instance.id).toBe('id');
        });

        it('has no components', function() {
            expect(instance.components).toBeDefined();
        })
    });

    describe('component management', function() {
        var createComponent = function(tag) {
            return { tag : tag };
        };

        var instance = new subject('id');
        var healthComponent = createComponent('health');
        var velocityComponent = createComponent('velocity');

        it('adds and retrieves components', function() {
            instance.addComponent(healthComponent)
                    .addComponent(velocityComponent);

            expect(instance.getComponent('health')).toEqual(healthComponent);
            expect(instance.getComponent('velocity')).toEqual(velocityComponent);
        });

        it('removes components', function() {
            instance.addComponent(healthComponent)
                    .addComponent(velocityComponent);

            expect(instance.getComponent('health')).toEqual(healthComponent);
            expect(instance.removeComponent('health')).toBeUndefined();
            expect(instance.getComponent('health')).toBeUndefined();
        });
    });
});
