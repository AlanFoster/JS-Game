subject = require('game/components/health')

describe 'health component', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#new', ->
    expectedTagName = 'health'
    context 'all values supplied', ->
      beforeEach ->
        @instance = new subject current: 10,  maximum: 1000

      it 'has current health', ->
        expect(@instance.current).toBe 10

      it 'has maximum', ->
        expect(@instance.maximum).toBe 1000

      it 'has a percentage', ->
        expect(@instance.percentage()).toBe 0.01

      it 'has a tag', ->
        expect(@instance.tag).toBe expectedTagName

    context 'no values supplied', ->
      beforeEach ->
        @instance = new subject

      it 'has current health', ->
        expect(@instance.current).toBe 50

      it 'has maximum', ->
        expect(@instance.maximum).toBe 100

      it 'has a percentage', ->
        expect(@instance.percentage()).toBe 0.5

      it 'has a tag', ->
        expect(@instance.tag).toBe expectedTagName