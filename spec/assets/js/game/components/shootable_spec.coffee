subject = require('game/components/shootable')

describe 'shootable component', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#new', ->
    expectedTagName = 'shootable'
    context 'all values supplied', ->
      beforeEach ->
        @instance = new subject { speed: 10, life: 1000, damage: 100, firing: true }

      it 'has speed', ->
        expect(@instance.speed).toBe 10

      it 'has life', ->
        expect(@instance.life).toBe 1000

      it 'has damage', ->
        expect(@instance.damage).toBe 100

      it 'has a firing flag', ->
        expect(@instance.firing).toBe true

      it 'has a tag', ->
        expect(@instance.tag).toBe expectedTagName

    fcontext 'no values supplied', ->
      beforeEach ->
        @instance = new subject

      it 'has speed', ->
        expect(@instance.speed).toBe 0.5

      it 'has life', ->
        expect(@instance.life).toBe 5000

      it 'has damage', ->
        expect(@instance.damage).toBe 0

      it 'has a firing flag', ->
        expect(@instance.firing).toBe false

      it 'has a tag', ->
        expect(@instance.tag).toBe expectedTagName
