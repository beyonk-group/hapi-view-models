'use strict'

const {get, set} = require('lodash')

exports.register = function (server, options, next) {
  server.decorate('reply', 'vm', function (ViewModel, response, path) {
    const {auth} = this.request
    const scopes = auth.isAuthenticated ? auth.credentials.scope : []
    if (typeof path === 'undefined') {
      response = new ViewModel(response, scopes).render()
    } else {
      const model = get(response, path)
      set(response, path, new ViewModel(model, scopes))
    }
    return this.response(response)
  })

  next()
}

exports.register.attributes = {
  pkg: require('../../package.json')
}
