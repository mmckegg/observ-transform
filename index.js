var Observ = require('observ')
var blackList = {
  'length': 'Clashes with `Function.prototype.length`.\n',
  'name': 'Clashes with `Function.prototype.name`.\n',
  'input': 'input is reserved key of observ-transform.\n',
  '_diff': '_diff is reserved key of observ-transform.\n',
  '_type': '_type is reserved key of observ-transform.\n',
  '_version': '_version is reserved key of observ-transform.\n'
}

module.exports = Transform

function Transform (func, args) {
  var obs = Observ()
  var set = obs.set

  var input = Observ()
  obs.set = input.set
  obs.input = input

  var listeners = [
    input(refresh)
  ]

  var argValues = {}
  if (Array.isArray(args)) {
    args.forEach(function (key) {
      checkKey(key)
      obs[key] = Observ()
      listeners.push(obs[key](function (value) {
        argValues[key] = value
        refresh()
      }))
    })
  } else if (args instanceof Object) {
    Object.keys(args).forEach(function (key) {
      checkKey(key)
      obs[key] = typeof args[key] === 'function' ? args[key] : Observ(args[key])
      argValues[key] = obs[key]()
      listeners.push(obs[key](function (value) {
        argValues[key] = value
        refresh()
      }))
    })
  }

  // remove all listeners
  obs.destroy = function () {
    while (listeners.length) {
      listeners.pop()()
    }
  }

  return obs

  function refresh () {
    var newValue = func(input(), argValues)
    if (obs() !== newValue) {
      set(newValue)
    }
  }
}

function checkKey (key) {
  if (blackList.hasOwnProperty(key)) {
    throw new Error("cannot create an observ-transform with a arg named '" + key + "'.\n" + blackList[key])
  }
}
