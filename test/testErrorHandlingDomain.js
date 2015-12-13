/**
 * Created by Hunter on 5/22/2015.
 */
"use strict";
var domain = require('domain');

// Domain basic
var dBasic = domain.create();

// run()
// - it will execute the function body, immediately
dBasic.run(function(){
    setTimeout(function(){
        throw new Error("domain error.");
    }, 200);
});

// Domain handle error
dBasic.on('error', function(error){
    if(error) {
        console.error(error.stack);
    }

    // When this domain is not needed any more.
    dBasic.dispose();
});

// Explicit Binding
// add()
// - it will enable the other domain to use within a domain.
var dOuter = domain.create();
var dInner = domain.create();

dOuter.run(function(){
    // add() to change domain
    dInner.add(setTimeout(function(){
        throw new Error("Error will NOT popup to dOuter.");
    }, 200));
});
dInner.on('error', function(error){
    if(error) {
        console.error("dInner", error.stack);
    }
});

dOuter.on('error', function(error){
    if(error) {
        console.error("dOuter", error.stack);
    }
});

// remove()
// add() and remove() accept timer handler
// - unbind domain
var dOuter2 = domain.create();
var dInner2 = domain.create();

dOuter2.run(function(){
    // timer
    var timer = setTimeout(function(){
        throw new Error("Error will popup to Global.");
    }, 200);

    // add() to change domain
    dInner2.add(timer);

    // remove() to unbind the domain impact
    // - Note: remove() from dInner2 will not give the result of binding to dOuter2
    dInner2.remove(timer);
});
dInner2.on('error', function(error){
    if(error) {
        console.error("dInner", error.stack);
    }
});

dOuter2.on('error', function(error){
    if(error) {
        console.error("dOuter", error.stack);
    }
});

// bind()
// - will not execute immediately, VS run()
// - find an existing function, not a new function, VS run()
var fs = require('fs');
var bindDomain = domain.create();

fs.readFile("", "utf8", bindDomain.bind(function(error, data){
    if(error) {
        console.error("Read file error", error.stack);
    }

    console.data('bind(), data: ', data);

    bindDomain.destroy();
}));

bindDomain.on('error', function(error){
    if(error) {
        console.error("bindDomain.onError: ", error.stack);
    }
});

// intercept()
// - same as bind()
// - but handle the error by default
var interceptDomain = domain.create();

fs.readFile("", "utf8", interceptDomain.bind(function(data){
    console.data('intercept(), data: ', data);

    interceptDomain.destroy();
}));

interceptDomain.on('error', function(error){
    if(error) {
        console.error("interceptDomain.onError: ", error.stack);
    }
});

// Global error
process.on("uncaughtException", function(error){
    console.error("Global Exception: %s\n", error.message, error.stack);
});

throw new Error("Customized Error");