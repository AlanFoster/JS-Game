subject = require('game/components')
describe 'Components Main', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  [
    'Rendered'
    'Velocity'
    'Location'
  ].forEach (component) ->
    describe "#{component}", ->
      it 'exists', ->
        expect(subject[component]).toBeTruthy()
