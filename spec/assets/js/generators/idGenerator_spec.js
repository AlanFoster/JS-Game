var subject = require('./../../../../app/assets/js/generators/idGenerator');

describe('Generator', function() {
    it('exists', function() {
        expect(subject).toBeTruthy();
    });

    describe('#next', function() {
        var instance = new subject('id');

        it('exists', function() {
            expect(instance.next).toBeDefined();
        });

        it('returns unique ids', function() {
            expect(instance.next()).not.toEqual(instance.next())
        });
    });
});
