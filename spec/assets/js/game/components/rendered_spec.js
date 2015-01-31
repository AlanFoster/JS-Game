var subject = require('game/components/rendered');

describe('rendered component', function() {
    it('exists', function() {
        expect(subject).toBeTruthy();
    });

    describe('#new', function() {
        var expectedTagName = 'rendered';

        context('all values supplied', function() {
            var instance = new subject({
                color: 'blue',
                width: 42,
                height: 1337
            });

            it('has color', function() {
                expect(instance.color).toBe('blue');
            });

            it('has width', function() {
                expect(instance.width).toBe(42);
            });

            it('has width', function() {
                expect(instance.height).toBe(1337);
            });

            it('has a tag', function() {
                expect(instance.tag).toBe(expectedTagName)
            });
        });

        context('no values supplied', function() {
            var instance = new subject({});

            it('has a default color', function() {
                expect(instance.color).toBe('red');
            });

            it('has a default width', function() {
                expect(instance.width).toBe(100);
            });

            it('has a default width', function() {
                expect(instance.height).toBe(100);
            });

            it('has a tag', function() {
                expect(instance.tag).toBe(expectedTagName)
            });
        })
    });
});
