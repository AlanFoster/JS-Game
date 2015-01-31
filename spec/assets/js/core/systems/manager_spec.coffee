subject = require('core/systems/manager')

describe 'System Manager', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#new', ->
    context 'no arguments supplied', ->
      instance = new subject()
      it 'has no systems', ->
        expect(instance.systems).toEqual []

    context 'systems supplied', ->
      system = {}
      instance = new subject([system])
      it 'has one system', ->
        expect(instance.systems).toEqual [system]

  describe '#register', ->
    instance = undefined
    beforeEach ->
      instance = new subject()

    context 'single system supplied', ->
      system = {}
      it 'registers the single system', ->
        instance.register system
        expect(instance.systems).toEqual [system]

    context 'multiple systems supplied', ->
      system1 = {}
      system2 = {}
      it 'registers both systems', ->
        instance.register [
          system1
          system2
        ]
        expect(instance.systems).toEqual [
          system1
          system2
        ]

  describe '#update', ->
    context 'no systems registered', ->
      instance = new subject()
      entities = []
      it 'does not break', ->
        expect(-> instance.update entities).not.toThrow()

    context 'systems registered', ->
      entities = []
      system1Mock = update: jasmine.createSpy()
      system2Mock = update: jasmine.createSpy()
      instance = new subject([
        system1Mock
        system2Mock
      ])
      instance.update entities
      it 'calls update on system 1', ->
        expect(system1Mock.update).toHaveBeenCalledWith entities

      it 'calls update on system 2', ->
        expect(system2Mock.update).toHaveBeenCalledWith entities