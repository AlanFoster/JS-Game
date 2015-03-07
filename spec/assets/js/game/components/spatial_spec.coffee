subject = require('game/components/spatial')

describe 'spatial component', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#new', ->
    expectedTagName = 'spatial'
    context 'all values supplied', ->
      beforeEach ->
        @instance = new subject { x: 10, y: 15, width: 22, height: 44, rotation: Math.PI / 2 }

      it 'stores x location', ->
        expect(@instance.x).toBe 10

      it 'stores y', ->
        expect(@instance.y).toBe 15

      it 'stores width', ->
        expect(@instance.width).toBe 22

      it 'stores height', ->
        expect(@instance.height).toBe 44

      it 'stores center x', ->
        expect(@instance.center.x)

      it 'stores rotation', ->
        expect(@instance.rotation).toBe Math.PI / 2

      it 'stores the component tag', ->
        expect(@instance.tag).toBe expectedTagName

      fit 'stores the center', ->
        expect(@instance.center).toEqual { x: 21, y: 37}

      it 'caps rotation to positive', ->
        @instance.rotation = Math.PI * 5;
        expect(@instance.rotation).toBe Math.PI

        @instance.rotation = Math.PI * 6;
        expect(@instance.rotation).toBe 0

    context 'no values supplied', ->
      beforeEach ->
        @instance = new subject

      it 'defaults x position', ->
        expect(@instance.x).toBe 0

      it 'defaults y position', ->
        expect(@instance.y).toBe 0

      it 'stores width', ->
        expect(@instance.width).toBe 0

      it 'stores height', ->
        expect(@instance.height).toBe 0

      fit 'stores the center', ->
        expect(@instance.center).toEqual { x: 0, y: 0}

      it 'defaults rotation', ->
        expect(@instance.rotation).toBe 0

      it 'stores the component tag', ->
        expect(@instance.tag).toBe expectedTagName
