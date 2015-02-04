subject = require('game/components/keyboard')

describe 'keyboard component', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#new', ->
    expectedTagName = 'keyboard'
    context 'all values supplied', ->
      instance = new subject({})

      it 'has a tag', ->
        expect(instance.tag).toBe expectedTagName