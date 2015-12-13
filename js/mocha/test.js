/**
 * Created by Hunter on 5/5/2015.
 */
"use strict";

// Test Case
it("An example test", function(){

});

// Test Suite
describe("A test suite", function(){
    // Test Case
    it("Test Case 1", function(){

    });

    it("Test Case 2", function(){

    });
});

// Nested Test Suite
describe("Test Suite Out", function(){
    describe("Test Suite Inner", function(){
        it("Test Case 3", function(){

        });
    });
});

// Asynchronous
it("Async Test", function(done){
    setTimeout(function(){
        done();
    }, 500);
});

// Async, fail method
//it("Async Test, Failed", function(done){
//    setTimeout(function(){
//        done(new Error('Intended Error'));
//    }, 500);
//});

// Assertion
var assert = require('assert');
it("Using assert", function(){
    assert(true === true);
    assert("Hello Mocha".indexOf("Mocha")>-1);
    assert.strictEqual("Hello Mocha".indexOf("Mocha"), 6);
    assert.equal(3, '3', '3 equals');
    assert.notEqual(3, 'Three', '3 not equal');
});

// Hooks
// before, after
// beforeEach, afterEach
describe("Before After, Suite", function(){
    before(function(){
        console.info("before() is called.");
    });

    after(function(){
        console.info("after() is called");
    });

    beforeEach(function(){
        console.info("beforeEach() is called.");
    });

    afterEach(function(){
        console.info("afterEach() is called");
    });

    // Test Case
    it("Test Case 4", function(){

    });

    it("Test Case 5", function(){

    });
});

// Skip Test Case
it.skip("Skip Test", function(){

});

// Only one Test Case
//it.only("Only me", function(){
//
//});