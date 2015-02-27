subject = require('game/components')
_ = require('underscore')

describe 'Components Index', ->
  expectedEntities = [
    'Rendered',
    'Velocity',
    'Location',
    'Acceleration',
    'Keyboard',
    'Friction',
    'Camera',
    'Bot'
  ]

  it 'exposes components', ->
    expect(Object.keys(subject)).toEqual(expectedEntities)

  it 'assigns all values', ->
    _.each subject, (_key, value) ->
      expect(value).toMatch(jasmine.any(Function))
