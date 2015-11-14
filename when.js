var Observ = require('observ')
var watch = require('observ/watch')
module.exports = when

function when (condition, whenTrue, whenFalse) {
  var obs = Observ()
  var set = obs.set
  var input = Observ()
  obs.set = input.set

  var releases = []
  watch(condition, function (value) {
    while (releases.length) { releases.pop()() }
    var transform = value ? whenTrue : whenFalse
    releases.push(watch(input, transform.set), watch(transform, set))
  })

  return obs
}
