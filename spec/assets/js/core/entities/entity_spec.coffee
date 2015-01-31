subject = require('core/entities/entity')

describe 'Entity', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#new', ->
    instance = new subject('id')
    it 'has an id', ->
      expect(instance.id).toBe 'id'

    it 'has no components', ->
      expect(instance.components).toBeDefined()

  describe 'component management', ->
    createComponent = (tag) ->
      tag: tag

    instance = new subject('id')
    healthComponent = createComponent('health')
    velocityComponent = createComponent('velocity')
    it 'adds and retrieves components', ->
      instance.addComponent(healthComponent).addComponent velocityComponent
      expect(instance.getComponent('health')).toEqual healthComponent
      expect(instance.getComponent('velocity')).toEqual velocityComponent

    it 'removes components', ->
      instance.addComponent(healthComponent).addComponent velocityComponent
      expect(instance.getComponent('health')).toEqual healthComponent
      expect(instance.removeComponent('health')).toBeUndefined()
      expect(instance.getComponent('health')).toBeUndefined()