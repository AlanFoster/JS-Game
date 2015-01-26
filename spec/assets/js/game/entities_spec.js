var subject = require('game/entities');

describe('Entities Main', function () {

    it('exists', function () {
        expect(subject).toBeTruthy();
    });

    describe('#entityManager', function() {
        it('exists', function() {
            expect(subject.entityManager).toBeTruthy();
        })
    })
});
