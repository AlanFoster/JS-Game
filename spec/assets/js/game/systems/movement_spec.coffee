subject = require('game/systems/movement')
Entity = require('core/entities/entity')
Location = require('game/components/location')
Velocity = require('game/components/velocity')
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
      location = new Location()
      velocity = new Velocity()
      validEntity = new Entity('valid').addComponent(location).addComponent(velocity).addComponent(new Rendered())
      invalidEntity1 = new Entity('invalid1').addComponent(new Velocity())
      invalidEntity2 = new Entity('invalid2').addComponent(new Location())

      beforeEach ->
        spyOn instance, 'process'
        entities = [
          invalidEntity1
          validEntity
          invalidEntity2
        ]
        instance.update entities

      it 'called processed the required entities', ->
        expectedComponents =
          location: location
          velocity: velocity

        expect(instance.process).toHaveBeenCalledWith validEntity, expectedComponents

      it 'did not process invalid entity 1', ->
        expect(instance.process).not.toHaveBeenCalledWith invalidEntity1, jasmine.any(Object)

      it 'did not process invalid entity 2', ->
        expect(instance.process).not.toHaveBeenCalledWith invalidEntity2, jasmine.any(Object)

  describe '#process', ->
    instance = new subject()
    entity = undefined
    beforeEach ->
      velocity = new Velocity(
        x: 2
        y: 3
      )
      location = new Location(
        x: 0
        y: 0
      )
      entity = new Entity('id').addComponent(location).addComponent(velocity)
      instance.process entity,
        velocity: velocity
        location: location

    afterEach ->
      entity = undefined

    it 'increases the x position by the y velocity', ->
      expect(entity.getComponent('location').x).toEqual 2

    it 'increases the y position by the y velocity', ->
      expect(entity.getComponent('location').y).toEqual 3