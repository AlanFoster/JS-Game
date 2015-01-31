subject = require('game/entities')

describe 'Entities Main', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#entityManager', ->
    it 'exists', ->
      expect(subject.entityManager).toBeTruthy()
