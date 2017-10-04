'use strict'

const server = require('./support/server')
const {expect} = require('code')

describe('response is view model', () => {
  const request = {method: 'GET', url: '/single'}

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

describe('response is view model collection', () => {
  const request = {method: 'GET', url: '/collection'}

  context('given request with role "sees-a"', () => {
    it('returns filtered response based on role', async () => {
      request.credentials = {scope: ['sees-a']}
      const response = await server.inject(request)
      expect(response.result).to.equal([
        {a: 'b', c: true},
        {a: 'b', c: true}
      ])
      delete request.credentials
    })
  })

  context('given request with role "sees-d"', () => {
    it('returns filtered response based on role', async () => {
      request.credentials = {scope: ['sees-d']}
      const response = await server.inject(request)
      expect(response.result).to.equal([
        {d: 4, c: true},
        {d: 4, c: true}
      ])
      delete request.credentials
    })
  })

  context('given request with no role', () => {
    it('returns filtered response based on lack of role', async () => {
      const response = await server.inject(request)
      expect(response.result).to.equal([
        {c: true},
        {c: true}
      ])
    })
  })
})

describe('response is envelope containing view model', () => {
  const request = {method: 'GET', url: '/envelope'}

  context('given request with role "sees-a"', () => {
    it('returns filtered response based on role', async () => {
      request.credentials = {scope: ['sees-a']}
      const response = await server.inject(request)
      expect(response.result).to.equal({data: {a: 'b', c: true}})
      delete request.credentials
    })
  })

  context('given request with role "sees-d"', () => {
    it('returns filtered response based on role', async () => {
      request.credentials = {scope: ['sees-d']}
      const response = await server.inject(request)
      expect(response.result).to.equal({data: {d: 4, c: true}})
      delete request.credentials
    })
  })

  context('given request with no role', () => {
    it('returns filtered response based on lack of role', async () => {
      const response = await server.inject(request)
      expect(response.result).to.equal({data: {c: true}})
    })
  })
})

describe('response envelope deeply nested view model', () => {
  const request = {method: 'GET', url: '/deeply-nested'}

  context('given request with role "sees-a"', () => {
    it('returns filtered response based on role', async () => {
      request.credentials = {scope: ['sees-a']}
      const response = await server.inject(request)
      expect(response.result).to.equal({
        deeply: {
          nested: {
            data: {a: 'b', c: true}
          }
        }
      })
      delete request.credentials
    })
  })
})

describe('response envelope deeply nested view model collection', () => {
  const request = {method: 'GET', url: '/deeply-nested-collection'}

  context('given request with role "sees-a"', () => {
    it('returns filtered response based on role', async () => {
      request.credentials = {scope: ['sees-a']}
      const response = await server.inject(request)
      expect(response.result).to.equal({
        deeply: {
          nested: {
            data: [{a: 'b', c: true}, {a: 'b', c: true}]
          }
        }
      })
      delete request.credentials
    })
  })
})
