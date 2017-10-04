'use strict'

const Hapi = require('hapi')
const assert = require('assert')
const {unauthorized} = require('boom')

const {plugin, ViewModel} = require('../../')

const server = new Hapi.Server()

class SomeViewModel extends ViewModel {
  get includes () {
    return {
      'sees-a': ['a'],
      'sees-d': ['d']
    }
  }
}

server.connection()

server.register(plugin, err => {
  assert.ifError(err)
})

server.auth.scheme('wide-open', (server, options) => {
  return {
    authenticate: (request, reply) => {
      return request.headers.loggedIn
        ? reply.continue({
          credentials: {}
        })
        : reply(unauthorized('Missing credentials'))
    },
    options
  }
})

server.auth.strategy('placeholder', 'wide-open', 'try')

server.route({
  method: 'GET',
  path: '/response-is-view-model',
  handler (request, reply) {
    reply.vm(SomeViewModel, {
      a: 'b',
      c: true,
      d: 4
    })
  }
})

server.route({
  method: 'GET',
  path: '/response-envelope',
  handler (request, reply) {
    reply.vm(SomeViewModel, {
      data: {
        a: 'b',
        c: true,
        d: 4
      }
    }, 'data')
  }
})

server.route({
  method: 'GET',
  path: '/deeply-nested',
  handler (request, reply) {
    reply.vm(SomeViewModel, {
      deeply: {
        nested: {
          data: {
            a: 'b',
            c: true,
            d: 4
          }
        }
      }
    }, 'deeply.nested.data')
  }
})

module.exports = server
