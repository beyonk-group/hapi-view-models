'use strict'

const server = require('./support/server')
const {expect} = require('code')

describe('plugin', () => {
  const request = {method: 'GET', url: '/endpoint'}

  context('given request with role "sees-a"', () => {
    it('returns filtered response based on role', async () => {
      request.credentials = {scope: ['sees-a']}
      const response = await server.inject(request)
      expect(response.result).to.equal({a: 'b', c: true})
      delete request.credentials
    })
  })

  context('given request with role "sees-d"', () => {
    it('returns filtered response based on role', async () => {
      request.credentials = {scope: ['sees-d']}
      const response = await server.inject(request)
      expect(response.result).to.equal({d: 4, c: true})
      delete request.credentials
    })
  })

  context('given request with no role', () => {
    it('returns filtered response based on lack of role', async () => {
      const response = await server.inject(request)
      expect(response.result).to.equal({c: true})
    })
  })
})
