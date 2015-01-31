subject = require('core/generators/idGenerator')

describe 'Generator', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#next', ->
    instance = new subject('id')
    it 'exists', ->
      expect(instance.next).toBeDefined()


    it 'returns unique ids', ->
      expect(instance.next()).not.toEqual instance.next()