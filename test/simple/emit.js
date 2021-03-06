
var simpleEvents = require('nodeunit').testCase;
var file = '../../lib/eventemitter2';
var EventEmitter2;

if(typeof require !== 'undefined') {
  EventEmitter2 = require(file).EventEmitter2;
}
else {
  EventEmitter2 = window.EventEmitter2;
}

module.exports = simpleEvents({

  '1. Add two listeners on a single event and emit the event.': function (test) {

    var emitter = new EventEmitter2({ verbose: true });

    function functionA() { test.ok(true, 'The event was raised'); }
    function functionB() { test.ok(true, 'The event was raised'); }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2');

    test.expect(2);
    test.done();

  },
  '2. Add two listeners on a single event and emit the event twice.': function (test) {

    var emitter = new EventEmitter2({ verbose: true });

    function functionA() { test.ok(true, 'The event was raised'); }
    function functionB() { test.ok(true, 'The event was raised'); }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2');
    emitter.emit('test2');

    test.expect(4);
    test.done();

  },
  '3. Add two listeners on a single event and emit the event with a parameter.': function (test) {

    var emitter = new EventEmitter2({ verbose: true });

    function functionA(value1) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The event was raised');
    }

    function functionB(value1) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The event was raised');
    }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2', 'Hello, Node');

    test.expect(4);
    test.done();

  },
  '4. Add two listeners on an single event and emit the event twice with a parameter.': function (test) {

    var emitter = new EventEmitter2({ verbose: true });

    function functionA(value1) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The event was raised');
    }

    function functionB(value1) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The event was raised');
    }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2', 'Hello, Node1');
    emitter.emit('test2', 'Hello, Node2');

    test.expect(8);
    test.done();

  },
  '5. Add two listeners on an single event and emit the event twice with multiple parameters.': function (test) {

    var emitter = new EventEmitter2({ verbose: true });

    function functionA(value1, value2, value3) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The value named "value1" is OK');
      test.equal(typeof value2, 'string', 'The value named "value2" is OK');
      test.equal(typeof value3, 'string', 'The value named "value3" is OK');
    }

    function functionB(value1, value2, value3) {
      test.ok(true, 'The event was raised');
      test.equal(typeof value1, 'string', 'The value named "value1" is OK');
      test.equal(typeof value2, 'string', 'The value named "value2" is OK');
      test.equal(typeof value3, 'string', 'The value named "value3" is OK');
    }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);

    emitter.emit('test2', 'Hello, Node1', 'Hello, Node2', 'Hello, Node3');
    emitter.emit('test2', 'Hello, Node1', 'Hello, Node2', 'Hello, Node3');

    test.expect(16);
    test.done();

  },
  '6. Stop propagation of an event.': function (test) {

    var emitter = new EventEmitter2({ verbose: true });

    function functionA() {
      test.ok(true, 'The event was raised');
    }

    function functionB() {
      test.ok(true, 'The event was raised');
      return true;
    }

    function functionC() {
      test.ok(true, 'The event was raised');
      return null;
    }

    function functionD() {
      test.ok(true, 'The event was raised');
      return false;
    }

    function functionE() {
      test.ok(true, 'The event should not have been raised');
    }

    emitter.on('test2', functionA);
    emitter.on('test2', functionB);
    emitter.on('test2', functionC);
    emitter.on('test2', functionD);
    emitter.on('test2', functionE);

    emitter.emit('test2');

    test.expect(4);
    test.done();

  },
  '6. Stop propagation of an onAny event.': function (test) {

    var emitter = new EventEmitter2({ verbose: true });

    function functionA() {
      test.ok(true, 'The event was raised');
    }

    function functionB() {
      test.ok(true, 'The event was raised');
      return true;
    }

    function functionC() {
      test.ok(true, 'The event was raised');
      return null;
    }

    function functionD() {
      test.ok(true, 'The event was raised');
      return false;
    }

    function functionE() {
      test.ok(true, 'The event should not have been raised');
    }

    function functionF() {
      test.ok(true, 'The event should not have been raised');
    }

    emitter.onAny(functionA);
    emitter.onAny(functionB);
    emitter.onAny(functionC);
    emitter.onAny(functionD);
    emitter.on('test2', functionE);
    emitter.onAny(functionF);

    emitter.emit('test2');

    test.expect(4);
    test.done();

  },
  '7. Check return values of emit.': function (test) {

    var emitter = new EventEmitter2({ verbose: true });

    function functionA() { test.ok(true, 'The event was raised'); }

    emitter.on('test6', functionA);

    test.ok(emitter.emit('test6'), 'emit should return true after calling a listener');
    test.ok(!emitter.emit('other'), 'emit should return false when no listener was called');

    emitter.onAny(functionA);
    test.ok(emitter.emit('other'), 'emit should return true after calling an onAny() listener');

    test.expect(5);
    test.done();
  }

  '7. Check return values of wildcardEmitter.emit.': function (test) {
    var emitter = new EventEmitter2({ verbose: true, wildcard: true });
    function functionA() { test.ok(true, 'The event was raised'); }

    emitter.on('test7', functionA);
    emitter.on('wildcard.*', functionA);

    test.ok(emitter.emit('test7'), 'emit should return true after calling a listener');
    test.ok(emitter.emit('wildcard.7'), 'emit should return true after calling a wildcard listener');
    test.ok(!emitter.emit('other7'), 'emit should return false when no listener was called');
    test.ok(!emitter.emit('other.7'), 'emit should return false when no wildcard listener was called');

    test.expect(6);
    test.done();
  },

});

