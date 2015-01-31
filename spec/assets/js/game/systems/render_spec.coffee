subject = require('game/systems/render')
Entity = require('core/entities/entity')
Location = require('game/components/location')
Rendered = require('game/components/rendered')

describe 'Movement System', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#update', ->
    instance = new subject()
    it 'exists', ->
      expect(instance.update).toBeDefined()

    context 'when no entities are supplied', ->
      it 'does not cause an error', ->
        expect(-> instance.update []).not.toThrow()

    context 'entities with components supplied', ->
      rendered = new Rendered()
      location = new Location()
      validEntity = new Entity('valid').addComponent(rendered).addComponent(location)
      invalidEntity1 = new Entity('invalid1')
      beforeEach ->
        spyOn(instance, 'process').and.returnValue()
        spyOn(instance, 'preprocess').and.returnValue()
        instance.context = {}
        entities = [
          invalidEntity1
          validEntity
        ]
        instance.update entities

      it 'callled preprocess', ->
        expect(instance.preprocess).toHaveBeenCalled()

      it 'called processed the required entities', ->
        expectedComponents =
          rendered: rendered
          location: location

        expect(instance.process).toHaveBeenCalledWith validEntity, expectedComponents

      it 'did not process invalid entity 1', ->
        expect(instance.process).not.toHaveBeenCalledWith invalidEntity1, jasmine.any(Object)

  describe '#process', ->
    # TODO - Decide how to best test the DOM ...