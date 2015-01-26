var subject = require('./../../../../../app/assets/js/core/systems/manager');

describe('System Manager', function () {

    it('exists', function () {
        expect(subject).toBeTruthy();
    });

    describe('#new', function () {
        context('no arguments supplied', function () {
            var instance = new subject();
            it('has no systems', function () {
                expect(instance.systems).toEqual([]);
            })
        });

        context('systems supplied', function () {
            var system = {};

            var instance = new subject([system]);
            it('has one system', function () {
                expect(instance.systems).toEqual([system]);
            })
        })

    });

    describe('#register', function () {
        var instance = undefined;

        beforeEach(function () {
            instance = new subject();
        });

        context('single system supplied', function () {
            var system = {};

            it('registers the single system', function () {
                instance.register(system);
                expect(instance.systems).toEqual([system]);
            });
        });

        context('multiple systems supplied', function () {
            var system1 = {};
            var system2 = {};

            it('registers both systems', function () {
                instance.register([system1, system2]);
                expect(instance.systems).toEqual([system1, system2]);
            })
        })
    });

    describe('#update', function() {

        context('no systems registered', function() {
            var instance = new subject();
            var entities = [];

            it('does not break', function() {
                expect(function() { instance.update(entities) }).not.toThrow()
            })
        });

        context('systems registered', function() {
            var entities = [];

            var system1Mock = { update: jasmine.createSpy() };
            var system2Mock = { update: jasmine.createSpy() };
            var instance = new subject([system1Mock, system2Mock]);
            instance.update(entities);

            it('calls update on system 1', function() {
                expect(system1Mock.update).toHaveBeenCalledWith(entities)
            });

            it('calls update on system 2', function() {
                expect(system2Mock.update).toHaveBeenCalledWith(entities)
            });
        })
    })
});
