var Observ = require('observ')
module.exports = connect

function connect () {
  var last = arguments[arguments.length - 1]
  var releases = []

  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i + 1]) {
      arguments[i + 1].set(arguments[i]())
      releases.push(arguments[i](arguments[i + 1].set))
    }
  }

  var obs = Observ(last())
  var set = obs.set
  releases.push(last(set))
  obs.set = arguments[0].set

  obs.destroy = function () {
    while (releases.length) {
      releases.pop()()
    }
  }

  return obs
}
