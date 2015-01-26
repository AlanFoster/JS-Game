var subject = require('game/systems');

describe('Systems Main', function () {

    it('exists', function () {
        expect(subject).toBeTruthy();
    });

    describe('#systemManager', function() {
        it('exists', function() {
            expect(subject.create).toBeTruthy();
        })
    })
});