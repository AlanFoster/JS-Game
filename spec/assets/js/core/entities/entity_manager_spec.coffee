subject = require('core/entities/entity_manager')
IdGenerator = require('core/generators/idGenerator')

describe 'Entity', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  createEntityManager = ->
    MockEntity = (id) ->
      @id = id

    idGenerator = new IdGenerator()
    new subject(MockEntity, idGenerator)

  describe '#createEntity', ->
    instance = createEntityManager()
    it 'returns an entity', ->
      expect(instance.createEntity().id).toBe 1

    it 'returns unique identities', ->
      first = instance.createEntity()
      second = instance.createEntity()
      expect(first.id).not.toEqual second.id

  describe '#entities', ->
    context 'no entities', ->
      instance = createEntityManager()
      it 'has no entities', ->
        expect(instance.entities).toEqual []

    context 'entities created', ->
      instance = createEntityManager()
      entityOne = instance.createEntity()
      entityTwo = instance.createEntity()
      entityThree = instance.createEntity()
      it 'has no entities', ->
        expect(instance.entities).toEqual [
          entityOne
          entityTwo
          entityThree
        ]