'use strict'

const {get, set} = require('lodash')

exports.register = function (server, options, next) {
  server.decorate('reply', 'vm', function (ViewModel, response, path) {
    const {auth} = this.request
    const scopes = auth.isAuthenticated ? auth.credentials.scope : []
    if (typeof path === 'undefined') {
      response = buildViewModels(response, scopes)
    } else {
      const model = get(response, path)
      set(response, path, buildViewModels(model, scopes))
    }
    return this.response(response)

    function buildViewModels (models, scopes) {
      if (Array.isArray(models)) {
        return models.map((model) => new ViewModel(model, scopes).render())
      }
      return new ViewModel(models, scopes).render()
    }
  })

  next()
}

exports.register.attributes = {
  pkg: require('../package.json')
}
