subject = require('game/systems/movement')
Entity = require('core/entities/entity')
Spatial = require('game/components/spatial')
Velocity = require('game/components/velocity')
Rendered = require('game/components/rendered')

describe 'Movement System', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#update', ->
    beforeEach ->
      @instance = new subject()

    it 'exists', ->
      expect(@instance.update).toBeDefined()

    describe 'when no entities are supplied', ->
      it 'does not cause an error', ->
        expect(=> @instance.update []).not.toThrow()

    describe 'entities with components supplied', ->

      beforeEach ->
        @instance = new subject()
        @spatial = new Spatial()
        @velocity = new Velocity()
        @validEntity = new Entity('valid').addComponent(@spatial).addComponent(@velocity).addComponent(new Rendered())
        @invalidEntity1 = new Entity('invalid1').addComponent(new Velocity())
        @invalidEntity2 = new Entity('invalid2').addComponent(new Spatial())

        spyOn @instance, 'process'
        entities = [
          @invalidEntity1
          @validEntity
          @invalidEntity2
        ]
        @instance.update entities

      it 'processed the required entities', ->
        expectedComponents =
          spatial: @spatial
          velocity: @velocity

        expect(@instance.process).toHaveBeenCalledWith @validEntity, expectedComponents

      it 'did not process invalid entity 1', ->
        expect(@instance.process).not.toHaveBeenCalledWith @invalidEntity1, jasmine.any(Object)

      it 'did not process invalid entity 2', ->
        expect(@instance.process).not.toHaveBeenCalledWith @invalidEntity2, jasmine.any(Object)

  describe '#process', ->
    beforeEach ->
      @instance = new subject()
      @velocity = new Velocity x: 2, y: 3
      @spatial = new Spatial x: 0, y: 0

      @entity = new Entity('id').addComponent(@spatial).addComponent(@velocity)
      @instance.process @entity,
                        velocity: @velocity
                        spatial: @spatial

    it 'increases the x position by the y velocity', ->
      expect(@entity.getComponent('spatial').x).toEqual 2

    it 'increases the y position by the y velocity', ->
      expect(@entity.getComponent('spatial').y).toEqual 0