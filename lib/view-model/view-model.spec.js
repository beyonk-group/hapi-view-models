'use strict'

const { expect } = require('code')
const ViewModel = require('.')

describe('view-model', () => {
  const source = {
    a: {
      b: {
        c: 1
      }
    },
    b: 2,
    c: ['a', 'b', 'c'],
    d: {
      e: true
    },
    e: 'foo',
    f: {
      g: 'bar'
    }
  }

  class SomeViewModel extends ViewModel {
    get includes () {
      return {
        role1: ['a.b.c'],
        role2: ['c'],
        role3: ['e', 'f'],
        role4: ['f']
      }
    }
  }

  it('Included by multiple roles', () => {
    expect(
      new SomeViewModel(source, ['role3']).render()
    ).to.equal({
      a: {
        b: {}
      },
      b: 2,
      d: {
        e: true
      },
      e: 'foo',
      f: {
        g: 'bar'
      }
    })
  })

  it('Renders properties partially obscured by other role', () => {
    expect(
      new SomeViewModel(source, ['role4']).render()
    ).to.equal({
      a: {
        b: {}
      },
      b: 2,
      d: {
        e: true
      },
      f: {
        g: 'bar'
      }
    })
  })

  it('Omits a single property', () => {
    expect(
      new SomeViewModel(source, ['role1']).render()
    ).to.equal({
      a: {
        b: {
          c: 1
        }
      },
      b: 2,
      d: {
        e: true
      }
    })
  })

  it('Includes multiple properties', () => {
    expect(
      new SomeViewModel(source, ['role3']).render()
    ).to.equal({
      a: {
        b: {}
      },
      b: 2,
      d: {
        e: true
      },
      e: 'foo',
      f: {
        g: 'bar'
      }
    })
  })

  it('Omits a nested property', () => {
    expect(
      new SomeViewModel(source, ['role2']).render()
    ).to.equal({
      a: {
        b: {}
      },
      b: 2,
      c: ['a', 'b', 'c'],
      d: {
        e: true
      }
    })
  })

  it('Omits nothing, given all possible roles', () => {
    expect(
      new SomeViewModel(source, ['role1', 'role2', 'role3']).render()
    ).to.equal({
      a: {
        b: {
          c: 1
        }
      },
      b: 2,
      c: ['a', 'b', 'c'],
      d: {
        e: true
      },
      e: 'foo',
      f: {
        g: 'bar'
      }
    })
  })

  it('All omittable properties omitted', () => {
    expect(
      new SomeViewModel(source, []).render()
    ).to.equal({
      a: {
        b: {}
      },
      b: 2,
      d: {
        e: true
      }
    })
  })
})
