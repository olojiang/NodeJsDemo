/**
 * Created by Hunter on 3/26/2015.
 */

var a = require('./a');
var b = require('./b');

module.exports = {
    text: "This is index.js",
    sayHello: a.sayHello,
    sayWorld: b.sayWorld
};