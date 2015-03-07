subject = require('core/systems/manager')

describe 'System Manager', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#new', ->
    context 'no arguments supplied', ->
      beforeEach ->
        @instance = new subject()

      it 'has no systems', ->
        expect(@instance.systems).toEqual []

    context 'systems supplied', ->
      beforeEach ->
        @system = {}
        @instance = new subject([@system])

      it 'has one system', ->
        expect(@instance.systems).toEqual [@system]

  describe '#register', ->
    beforeEach ->
      @instance = new subject()

    context 'single system supplied', ->
      beforeEach ->
        @system = {}
        @instance.register @system

      it 'registers the single system', ->
        expect(@instance.systems).toEqual [@system]

    context 'multiple systems supplied', ->
      beforeEach ->
        @system1 = {}
        @system2 = {}

        @instance.register [
          @system1
          @system2
        ]

      it 'registers both systems', ->
        expect(@instance.systems).toEqual [
          @system1
          @system2
        ]

  describe '#update', ->

    beforeEach ->
      @renderer =  { clear: (->) }
      spyOn @renderer, 'clear'

      @entities = []
      @world = { renderer: @renderer, entityManager: { entities: @entities } }

    context 'no systems registered', ->
      beforeEach ->
        @instance = new subject()

      it 'does not break', ->
        expect(=> @instance.update @world).not.toThrow()
        expect(@renderer.clear).toHaveBeenCalled()

    context 'systems registered', ->
      beforeEach ->
        @system1Mock = update: jasmine.createSpy()
        @system2Mock = update: jasmine.createSpy()

        @instance = new subject [ @system1Mock, @system2Mock ]

        @instance.update @world

        it 'clears the renderer', ->
        expect(@renderer.clear).toHaveBeenCalled()

      it 'calls update on system 1', ->
        expect(@system1Mock.update).toHaveBeenCalledWith @entities, @world

      it 'calls update on system 2', ->
        expect(@system2Mock.update).toHaveBeenCalledWith @entities, @world