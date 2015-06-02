subject = require('core/components')

describe 'components helper', ->
  it 'exists', ->
    expect(subject).toBeTruthy()

  describe '#create', ->
    component = subject.create('tag_name',
      x: 10
      color: undefined
    )
    context 'no argument provided', ->
      instance = new component()
      it 'has a tag name', ->
        expect(instance.tag).toEqual 'tag_name'

      it 'has a default x value', ->
        expect(instance.x).toEqual 10

      it 'has a default color value', ->
        expect(instance.color).toBeUndefined()

    context 'no instance variables provided', ->
      instance = new component({})
      it 'has a tag name', ->
        expect(instance.tag).toEqual 'tag_name'

      it 'has a default x value', ->
        expect(instance.x).toEqual 10

      it 'has a default color value', ->
        expect(instance.color).toBeUndefined()

    context 'instance variables provided', ->
      instance = new component(
        x: 3
        color: 'red'
      )
      it 'has a tag name', ->
        expect(instance.tag).toEqual 'tag_name'

      it 'has a default x value', ->
        expect(instance.x).toEqual 3

      it 'has a default color value', ->
        expect(instance.color).toEqual 'red'

    context 'falsey variables provided', ->
      instance = new component(
        x: 0
        color: undefined
      )
      it 'has a tag name', ->
        expect(instance.tag).toEqual 'tag_name'

      it 'has a falsey x value', ->
        expect(instance.x).toEqual 0

      it 'has a falsey color', ->
        expect(instance.color).toBeUndefined()
