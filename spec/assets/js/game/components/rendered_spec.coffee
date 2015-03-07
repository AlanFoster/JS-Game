subject = require('game/components/rendered')

describe 'rendered component', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#new', ->
    expectedTagName = 'rendered'
    context 'all values supplied', ->
      instance = new subject(
        color: 'blue'
        width: 42
        height: 1337
      )

      it 'has color', ->
        expect(instance.color).toBe 'blue'

      it 'has width', ->
        expect(instance.width).toBe 42

      it 'has width', ->
        expect(instance.height).toBe 1337

      it 'has a tag', ->
        expect(instance.tag).toBe expectedTagName

    context 'no values supplied', ->
      instance = new subject({})

      it 'has a default color', ->
        expect(instance.color).toBeUndefined()

      it 'has a default graphic', ->
        expect(instance.graphic).toBeUndefined()

      it 'has a default width', ->
        expect(instance.width).toBe 100

      it 'has a default width', ->
        expect(instance.height).toBe 100

      it 'has a tag', ->
        expect(instance.tag).toBe expectedTagName