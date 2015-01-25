var subject = require('./../../../../app/assets/js/components/components');

describe('location component', function() {
    it('exists', function() {
        expect(subject).toBeTruthy();
    });

    describe('#create', function() {
        var component = subject.create('tag_name', { x: 10, color: undefined });

        context('no argument provided', function() {
            var instance = new component();

            it('has a tag name', function() {
                expect(instance.tag).toEqual('tag_name');
            });

            it('has a default x value', function() {
                expect(instance.x).toEqual(10);
            });

            it('has a default color value', function() {
                expect(instance.color).toBeUndefined();
            })
        });

        context('no instance variables provided', function() {
            var instance = new component({});

            it('has a tag name', function() {
                expect(instance.tag).toEqual('tag_name');
            });

            it('has a default x value', function() {
                expect(instance.x).toEqual(10);
            });

            it('has a default color value', function() {
                expect(instance.color).toBeUndefined();
            })
        });

        context('instance variables provided', function() {
            var instance = new component({ x: 3, color: 'red' });

            it('has a tag name', function() {
                expect(instance.tag).toEqual('tag_name');
            });

            it('has a default x value', function() {
                expect(instance.x).toEqual(3);
            });

            it('has a default color value', function() {
                expect(instance.color).toEqual('red');
            })
        });

        context('falsey variables provided', function() {
            var instance = new component({ x: 0, color: undefined });

            it('has a tag name', function() {
                expect(instance.tag).toEqual('tag_name');
            });

            it('has a falsey x value', function() {
                expect(instance.x).toEqual(0);
            });

            it('has a falsey color', function() {
                expect(instance.color).toBeUndefined();
            })
        });
    });
});
