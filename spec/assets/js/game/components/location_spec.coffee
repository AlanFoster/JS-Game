subject = require('game/components/location')

describe 'location component', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#new', ->
    expectedTagName = 'location'
    context 'all values supplied', ->
      instance = new subject(
        x: 10
        y: 15
      )
      it 'stores x location', ->
        expect(instance.x).toBe 10

      it 'stores y', ->
        expect(instance.y).toBe 15

      it 'stores the component tag', ->
        expect(instance.tag).toBe expectedTagName

    context 'no values supplied', ->
      instance = new subject({})
      it 'defaults x position', ->
        expect(instance.x).toBe 0

      it 'defaults y position', ->
        expect(instance.y).toBe 0

      it 'stores the component tag', ->
        expect(instance.tag).toBe expectedTagName
