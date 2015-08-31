subject = require('game/systems')

describe 'Systems Main', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#systemManager', ->
    it 'exists', ->
      expect(subject.create).toBeTruthy()
