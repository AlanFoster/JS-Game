var subject = require('game/components');

describe('Components Main', function () {
    it('exists', function () {
        expect(subject).toBeTruthy();
    });

    [
        'Rendered',
        'Velocity',
        'Location'
    ].forEach(function(component) {
        describe('#' + component, function () {
            it('exists', function () {
                expect(subject[component]).toBeTruthy();
            })
        })
    });
});
