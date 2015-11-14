var Observ = require('observ')
module.exports = send

function send (args) {
  var obs = Observ()
  for (var i = 0; i < arguments.length; i++) {
    obs(arguments[i].set)
  }
  return obs
}
