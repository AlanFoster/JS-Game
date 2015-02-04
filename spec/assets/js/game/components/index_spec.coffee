subject = require('game/components')
_ = require('underscore')

describe 'Components Index', ->
  expectedEntities = [
    'Rendered',
    'Velocity',
    'Location',
    'Keyboard'
  ]

  it 'exposes components', ->
    expect(Object.keys(subject)).toEqual(expectedEntities)

  it 'assigns all values', ->
    _.each(subject, (_key, value) ->
      expect(value).toBe jasmine.any(Function)
