subject = require('game/systems/render')
Entity = require('core/entities/entity')
Spatial = require('game/components/spatial')
Rendered = require('game/components/rendered')

describe 'Render System', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

