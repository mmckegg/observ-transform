observ-transform
===

Observable transform (with args) based on [observ](https://github.com/raynos/observ) pattern.

## Install via [npm](https://www.npmjs.com/package/observ-transform)

```bash
$ npm install observ-transform
```

## API

```js
var Transform = require('observ-transform')
```

### `var transform = Transform(func, args)`

Specify `args` as an `Array` of strings (to add observ properties to transform), or an `Object` containing observable values.

Returns an observable transform object.

### `transform()`

Returns the current transformed value.

### `transform.set(value)`

Set the value to transform via `func`.

### `var release = transform(listener)`

Listen for changes.

### `transform.input()`

Return current input value.

## Example

## Using String Args

```js
var Transform = require('observ-transform')
var obs = Tranform(function (input, args) {
  return input * args.multiply + args.add
}, ['multiply', 'add'])
obs.multiply.set(3)
obs.add.set(24)
obs.set(100)
t.same(obs(), 324)
```

## Using Object Args

```js
var obs = Transform(function (input, args) {
  return input * args.multiply + args.add
}, {
  multiply: Observ(3),
  add: Observ(24)
})
obs.set(100)
t.same(obs(), 324)
```
