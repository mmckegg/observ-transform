var ObservTranform = require('../')
var Observ = require('observ')
var test = require('ava')

test(function (t) {
  var result = ObservTranform(function (input) {
    return input * 3
  })
  result.set(100)
  t.same(result(), 300)
  t.end()
})

test(function withStringArgs (t) {
  var result = ObservTranform(function (input, args) {
    return input * args.multiply + args.add
  }, ['multiply', 'add'])
  result.multiply.set(3)
  result.add.set(24)
  result.set(100)
  t.same(result(), 324)
  t.end()
})

test(function withObjectArgs (t) {
  var result = ObservTranform(function (input, args) {
    return input * args.multiply + args.add
  }, {
    multiply: Observ(3),
    add: Observ(24)
  })
  result.set(100)
  t.same(result(), 324)
  t.end()
})

test(function keyConflict (t) {
  t.throws(function () {
    ObservTranform(function (input, args) {}, {
      name: Observ('test')
    })
  })
  t.end()
})
