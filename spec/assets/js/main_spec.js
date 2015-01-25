var subject = require('./../../../app/assets/js/main');

describe('main', function() {
    describe('#world', function() {
        it('exists', function() {
            expect(subject).toBeTruthy();
        });

        it('has entities', function() {
            expect(subject.world.entities).toEqual([]);
        });
    });
});