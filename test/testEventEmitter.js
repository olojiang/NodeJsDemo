/**
 * Created by jiang on 5/27/2015.
 */
"use strict";

/*
 * It's just the oberserver Pattern instance.
 * - although we can define our own sub/pub system, but if it's internal supported this, why not just use it, right?
 * - Publish
 * - Subscribe
 */
var events = require('events');
var EventEmitter = events.EventEmitter;
var emitter = new EventEmitter();

// Same category of event, multiple times binding
emitter.on('test', function(value){
    console.info('Test event 1, value=%j', value);
});

// on()
// - listener
emitter.on('test', function(value){
    console.info('Test event 2, value=%j', value);
});

// emit(), Trigger event.
// - first argument is category
// - second argument is parameter
emitter.emit('test', 'valueDemo');

// once(), one time action
emitter.once('testOneTime', function(value){
    console.info('Test ONCE event, value=%j', value);
});

// Only have one effect, first
emitter.emit('testOneTime', 'valueOneTime');
emitter.emit('testOneTime', 'valueOneTime');

// listenerCount() for category
console.info("EventEmitter.listenerCount(emitter, 'test')=", EventEmitter.listenerCount(emitter, 'test'));
console.info("EventEmitter.listenerCount(emitter, 'testOneTime')=", EventEmitter.listenerCount(emitter, 'testOneTime'));

// listeners(), get listener list for category
var listeners = emitter.listeners('test');
listeners.forEach(function(handler){
    console.info('Handlers for test: ', handler);
});

// newListener event, to handle the listener add event
emitter.on('newListener', function(eventName, handler){
    console.info("eventName=%j\n",eventName, handler);
});

emitter.on('newEvent', function(){
    console.info('newEvent.');
});

// newListener, Can be triggered manually as normal trigger
emitter.emit('newListener', 'triggerEvent', function(){
    console.info('triggerEvent.');
});

// removeAllListeners()
// With parameter - category
// Without parameter - remove all
// - Anonymous function can not be removed separately.
console.info("Before Remove - EventEmitter.listenerCount(emitter, 'test')=", EventEmitter.listenerCount(emitter, 'test'));
emitter.removeAllListeners('test');
console.info("After Remove EventEmitter.listenerCount(emitter, 'test')=", EventEmitter.listenerCount(emitter, 'test'));

emitter.on('test2', function(){

});
console.info("Before Remove EventEmitter.listenerCount(emitter, 'test2')=", EventEmitter.listenerCount(emitter, 'test2'));
emitter.removeAllListeners();
console.info("After Remove EventEmitter.listenerCount(emitter, 'test2')=", EventEmitter.listenerCount(emitter, 'test2'));

// removeListener()
// - remove named listener
function test3() {
    console.info('Test 3');
}
emitter.on('test3', test3);
console.info("Before Remove EventEmitter.listenerCount(emitter, 'test3')=", EventEmitter.listenerCount(emitter, 'test3'));
emitter.removeListener('test3', test3);
console.info("After Remove EventEmitter.listenerCount(emitter, 'test3')=", EventEmitter.listenerCount(emitter, 'test3'));

// setMaxListeners(), Limit the MAX number of listener
emitter.setMaxListeners(3);
emitter.on('test4', function(){});
emitter.on('test5', function(){});

try {
    emitter.on('test6', function(){});
    emitter.on('test6', function(){});
    emitter.on('test6', function(){});
    emitter.on('test6', function(){});
} catch (e) {
    console.info("Exceed max number of listener, in single category|type");
    console.error(e.stack);
}

// Inherit EventEmitter
// - Inherit the prototype of basic function
var util = require('util');

function UserDefinedEmitter() {
    // Get all members
    EventEmitter.call(this);

    this.run = function(){
        this.emit('item', 'Hello', 'Emitter');
    };
}

// Get all prototype functions, or member
//UserDefinedEmitter.prototype = EventEmitter.prototype;
// - util.inherits will also do for the inheritance of prototype
util.inherits(UserDefinedEmitter, EventEmitter);

var userEmitter = new UserDefinedEmitter();
userEmitter.on('item', function(value1, value2){
    console.info('User defined Emitter, handler, value1=%s, value2=%s', value1, value2);
});

userEmitter.run();