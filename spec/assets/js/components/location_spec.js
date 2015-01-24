var subject = require('./../../../../app/assets/js/components/location').Location;

describe('location component', function() {
    it('exists', function() {
        expect(subject).toBeTruthy();
    });

    describe('#new', function() {
        var expectedTagName = 'location';

        context('all values supplied', function() {
            var instance = new subject({
                x: 10,
                y: 15
            });

            it('stores x location', function() {
                expect(instance.x).toBe(10);
            });

            it('stores y', function() {
                expect(instance.y).toBe(15);
            });

            it('stores the component tag', function() {
               expect(instance.tag).toBe(expectedTagName)
            });
        });

        context('no values supplied', function() {
            var instance = new subject({});

            it('defaults x position', function() {
                expect(instance.x).toBe(0);
            });

            it('defaults y position', function() {
                expect(instance.y).toBe(0);
            });

            it('stores the component tag', function() {
                expect(instance.tag).toBe(expectedTagName)
            });
        })
    });
});
