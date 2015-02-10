subject = require('game/systems/keyboard')
Entity = require('core/entities/entity')
Location = require('game/components/location')
Velocity = require('game/components/velocity')
Rendered = require('game/components/rendered')
Acceleration = require('game/components/acceleration')
_ = require('underscore')

describe 'Keyboard System', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#setUp', ->
    beforeEach ->
      @mockWindow = {onkeydown: undefined}
      @instance = new subject(@mockWindow)
      @instance.setUp()

    it 'registers an eventHandler', ->
      expect(@mockWindow.onkeydown).toEqual(jasmine.any(Function))

    it 'registers an eventHandler', ->
      expect(@mockWindow.onkeyup).toEqual(jasmine.any(Function))

  describe '#handleKey', ->
    beforeEach ->
      @keys =
        left: 37
        up: 38
        right: 39
        down: 40
      @instance = new subject()

    describe 'left key down', ->
      beforeEach ->
        event = {keyCode: @keys.left, type: 'keydown'}
        @expected =
          left: true
        @instance.handleKey event

      it 'sets the keys correctly', ->
        expect(@instance.keysDown).toEqual(@expected)

    describe 'up key down', ->
      beforeEach ->
        event = {keyCode: @keys.up, type: 'keydown'}
        @expected =
          up: true
        @instance.handleKey event

      it 'sets the keys correctly', ->
        expect(@instance.keysDown).toEqual(@expected)

    describe 'right key down', ->
      beforeEach ->
        event = {keyCode: @keys.right, type: 'keydown'}
        @expected =
          right: true
        @instance.handleKey event

      it 'sets the keys correctly', ->
        expect(@instance.keysDown).toEqual(@expected)

    describe 'down key down', ->
      beforeEach ->
        event = {keyCode: @keys.down, type: 'keydown'}
        @expected =
          down: true
        @instance.handleKey event

      it 'sets the keys correctly', ->
        expect(@instance.keysDown).toEqual(@expected)

  describe '#process', ->
    beforeEach ->
      @instance = new subject()

    [
      {key: 'left', x: 0, y: 0, rotation: -1},
      {key: 'up', x: 1, y: 1, rotation: 0},
      {key: 'right', x: 0, y: 0, rotation: 1},
      {key: 'down', x: -1, y: -1, rotation: 0}
    ].forEach ({key, x, y, rotation}) ->
      describe "#{key} is down", ->
        beforeEach ->
          @instance.keysDown = {}
          @instance.keysDown[key] = true
          @velocity = new Velocity x: 0, y: 0
          @acceleration = new Acceleration power: 1, maxSpeed: 5, turningSpeed: 1
          @location = new Location x: 0, y: 0, rotation: 0
          @instance.process({}, {velocity: @velocity, acceleration: @acceleration, location: @location})

        it 'increases X velocity', ->
          expect(@velocity.x).toBe x

        it 'increases Y velocity', ->
          expect(@velocity.y).toBe y

        it 'increases Y velocity', ->
          expect(@location.rotation).toBe rotation

    [
      {key: 'left', x: 0, y: 0, rotation: -26},
      {key: 'up', x: 5, y: 5, rotation: 0},
      {key: 'right', x: 0, y: 0, rotation: +26},
      {key: 'down', x: -5, y: -5, rotation: 0}
    ].forEach ({key, x, y, rotation}) ->
      describe "#{key} is down multiple times", ->
        beforeEach ->
          @instance.keysDown = {}
          @instance.keysDown[key] = true
          @velocity = new Velocity x: 0, y: 0
          @acceleration = new Acceleration power: 1, maxSpeed: 5, turningSpeed: 1
          @location = new Location x: 0, y: 0, rotation: 0

          [0..25].forEach () =>
            @instance.process({}, {velocity: @velocity, acceleration: @acceleration, location: @location})

        it 'increases X velocity', ->
          expect(@velocity.x).toBe x

        it 'increases Y velocity', ->
          expect(@velocity.y).toBe y

        it 'increases Y velocity', ->
          expect(@location.rotation).toBe rotation
