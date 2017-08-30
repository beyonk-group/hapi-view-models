'use strict'

exports.register = function (server, options, next) {
  server.decorate('reply', 'vm', function (ViewModel, model) {
    const { auth } = this.request
    const scopes = auth.isAuthenticated ? auth.credentials.scope : []
    const filtered = new ViewModel(model, scopes).render()
    return this.response(filtered)
  })

  next()
}

exports.register.attributes = {
  pkg: require('../../package.json')
}
