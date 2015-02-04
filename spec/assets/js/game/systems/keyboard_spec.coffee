subject = require('game/systems/keyboard')
Entity = require('core/entities/entity')
Location = require('game/components/location')
Velocity = require('game/components/velocity')
Rendered = require('game/components/rendered')
_ = require('underscore')

describe 'Keyboard System', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#setUp', ->
    beforeEach ->
      @mockWindow = { onkeydown: undefined }
      @instance = new subject(@mockWindow)
      @instance.setUp()

    it 'registers an eventHandler', ->
      expect(@mockWindow.onkeydown).toEqual(jasmine.any(Function))

  describe '#handleKey', ->
    beforeEach ->
      @keys =
        left: 37
        up: 38
        right: 39
        down: 40
      @instance = new subject()

    context 'left key down', ->
      beforeEach ->
        event = { keyCode: @keys.left }
        @expected =
          left: true
          up: false
          right: false
          down: false
        @instance.handleKey event

      it 'sets the keys correctly', ->
        expect(@instance.keysDown).toEqual(@expected)

    context 'up key down', ->
      beforeEach ->
        event = { keyCode: @keys.up }
        @expected =
          left: false
          up: true
          right: false
          down: false
        @instance.handleKey event

      it 'sets the keys correctly', ->
        expect(@instance.keysDown).toEqual(@expected)

    context 'right key down', ->
      beforeEach ->
        event = { keyCode: @keys.right }
        @expected =
          left: false
          up: false
          right: true
          down: false
        @instance.handleKey event

      it 'sets the keys correctly', ->
        expect(@instance.keysDown).toEqual(@expected)

    context 'down key down', ->
      beforeEach ->
        event = { keyCode: @keys.down }
        @expected =
          left: false
          up: false
          right: false
          down: true
        @instance.handleKey event

      it 'sets the keys correctly', ->
        expect(@instance.keysDown).toEqual(@expected)

  describe '#process', ->
    beforeEach ->
      @instance = new subject()

    [
       { key: 'left', expectedX: -0.2, expectedY: 0 },
       { key: 'up', expectedX: 0, expectedY: -0.2 },
       { key: 'right', expectedX: 0.2, expectedY: 0 },
       { key: 'down', expectedX: 0, expectedY: 0.2 }
    ].forEach ({key, expectedX, expectedY}) ->
      describe "#{key} is down", ->
        beforeEach ->
          @instance.keysDown = {}
          @instance.keysDown[key] = true
          @velocity = new Velocity x: 0, y: 0
          @instance.process({}, { velocity: @velocity })

         it 'increases X velocity', ->
           expect(@velocity.x).toBe expectedX

         it 'increases Y velocity', ->
           expect(@velocity.y).toBe expectedY

    [
       { key: 'left', expectedX: -2, expectedY: 0 },
       { key: 'up', expectedX: 0, expectedY: -2 },
       { key: 'right', expectedX: 2, expectedY: 0 },
       { key: 'down', expectedX: 0, expectedY: 2 }
    ].forEach ({key, expectedX, expectedY}) ->
      describe "#{key} is down multiple times", ->
        beforeEach ->
          @instance.keysDown = {}
          @instance.keysDown[key] = true
          @velocity = new Velocity x: 0, y: 0

          [0..12].forEach () =>
            @instance.process({}, { velocity: @velocity })

         it 'increases X velocity', ->
           expect(@velocity.x).toBe expectedX

         it 'increases Y velocity', ->
           expect(@velocity.y).toBe expectedY  