'use strict'

const Hapi = require('hapi')
const assert = require('assert')
const { unauthorized } = require('boom')

const ViewModel = require('../view-model')

const plugin = require('.')
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
  path: '/endpoint',
  handler: (request, reply) => {
    reply.vm(SomeViewModel, {
      a: 'b',
      c: true,
      d: 4
    })
  }
})

module.exports = server
