subject = require('game/components')
_ = require('underscore')

describe 'Components Index', ->
  expectedEntities = [
    'Rendered',
    'Velocity',
    'Spatial',
    'Acceleration',
    'Keyboard',
    'Friction',
    'Health',
    'Camera',
    'Bot',
    'Shootable'
  ]

  it 'exposes components', ->
    expect(Object.keys(subject)).toEqual(expectedEntities)

  it 'assigns all values', ->
    _.each subject, (value, _key) ->
      expect(value).toEqual(jasmine.any(Function))
