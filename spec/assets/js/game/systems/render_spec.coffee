subject = require('game/systems/render')
Entity = require('core/entities/entity')
Spatial = require('game/components/spatial')
Rendered = require('game/components/rendered')

describe 'Render System', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#update', ->
    beforeEach ->
      @renderer = {}
      @world = { renderer: @renderer }
      @instance = new subject()

    it 'exists', ->
      expect(@instance.update).toBeDefined()

    context 'when no entities are supplied', ->
      it 'does not cause an error', ->
        expect(=> @instance.update([], @world)).not.toThrow()

    context 'entities with components supplied', ->

      beforeEach ->
        @rendered = new Rendered()
        @spatial = new Spatial()
        @validEntity = new Entity('valid').addComponent(@rendered).addComponent(@spatial)
        @invalidEntity1 = new Entity('invalid1')

        spyOn(@instance, 'process').and.returnValue()
        @instance.context = {}
        entities = [
          @invalidEntity1
          @validEntity
        ]
        @instance.update entities, @world,

      it 'called processed the required entities', ->
        expectedComponents =
          rendered: @rendered
          spatial: @spatial

        expect(@instance.process).toHaveBeenCalledWith @validEntity, expectedComponents, {x: 0, y: 0}, @renderer, @world

      it 'did not process invalid entity 1', ->
        expect(@instance.process).not.toHaveBeenCalledWith @invalidEntity1, jasmine.any(Object)

  describe '#process', ->
    # TODO - Decide how to best test the DOM ...
