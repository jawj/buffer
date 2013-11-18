var benchmark = require('benchmark')
var suite = new benchmark.Suite()

global.NewBuffer = require('../').Buffer // buffer-browserify-fast
global.OldBuffer = require('buffer-browserify').Buffer // buffer-browserify

var LENGTH = 10

var newTarget = NewBuffer(LENGTH * 4)
var oldTarget = OldBuffer(LENGTH * 4)
var nodeTarget = Buffer(LENGTH * 4)

suite.add('NewBuffer#writeFloatBE', function () {
  for (var i = 0; i < LENGTH; i++) {
    newTarget.writeFloatBE(97.1919 + i, i * 4)
  }
})
.add('OldBuffer#writeFloatBE', function () {
  for (var i = 0; i < LENGTH; i++) {
    oldTarget.writeFloatBE(97.1919 + i, i * 4)
  }
})
.add('Buffer#writeFloatBE', function () {
  for (var i = 0; i < LENGTH; i++) {
    nodeTarget.writeFloatBE(97.1919 + i, i * 4)
  }
})
.on('error', function (event) {
  console.error(event.target.error.stack)
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
})
.run({ 'async': true })