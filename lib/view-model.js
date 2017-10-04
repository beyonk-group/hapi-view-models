'use strict'

const {omit, pull} = require('lodash')

class ViewModel {
  constructor (model, scopes) {
    this.model = model
    this.scopes = scopes

    const omittable = Object.values(this.includes)
    this.omittable = [].concat(...omittable)
  }

  get omissions () {
    return this.scopes.reduce((curr, scope) => {
      const omissions = this.includes[scope]
      if (omissions) {
        curr = curr.concat(omissions)
      }
      return curr
    }, [])
  }

  render () {
    const omitted = pull(this.omittable, ...this.omissions)
    return omit(this.model, ...omitted)
  }
}

module.exports = ViewModel
