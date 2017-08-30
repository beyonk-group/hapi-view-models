'use strict'

const server = require('./dummy-server')
const { expect } = require('code')

describe('plugin', () => {
  context('Authorised request', () => {
    let res

    before(() => {
      return server.inject({
        url: '/endpoint',
        headers: {
          loggedIn: true
        },
        credentials: {
          scope: ['sees-a']
        }
      })
      .then(response => res = response)
    })

    it('returns correct http status', () => {
      const { statusCode } = res
      expect(statusCode).to.equal(200)
    })

    it('returns payload', () => {
      const { result } = res
      expect(result).to.be.an.object()
    })

    it('filters based on role', () => {
      const { result } = res
      expect(result).to.equal({
        a: 'b',
        c: true
      })
    })
  })

  context('Unauthorised request', () => {
    let res

    before(() => {
      res = server.inject({
        url: '/endpoint',
        headers: {
          loggedIn: false
        }
      })
      .then(response => res = response)
    })

    it('returns correct http status', () => {
      const { statusCode } = res
      expect(statusCode).to.equal(200)
    })

    it('returns payload', () => {
      const { result } = res
      expect(result).to.be.an.object()
    })

    it('all role restricted properties are filtered', () => {
      const { result } = res
      expect(result).to.equal({
        c: true
      })
    })
  })
})
