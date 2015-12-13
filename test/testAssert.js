/**
 * Created by Hunter on 5/16/2015.
 */
"use strict";

var assert = require('assert');
var actual, expect, errMessage;

/*
 * ok
 */
errMessage = "ok() meet not true";
assert.ok(true, errMessage);

/*
 * assert === ok
 */
assert(8 === 32/4);

/*
 * equal or notEqual => ==
 */
actual = 5;
expect = 3+2;
errMessage = "Object is not refer to the same, or !=";
assert.equal(actual, expect, errMessage);
assert.equal(actual, expect, errMessage);

/*
 * strictEqual or notStrictEqual => ===
 */
function multiple(a, b){
    return a*b;
}
actual = multiple(7, 11);
expect = 77;
errMessage = "Multiple doesn't works";
assert.strictEqual(actual, expect, errMessage);
//assert.notStrictEqual(actual, expect, errMessage);

/*
 * deepEqual or notDeepEqual
 * - Object compare
 */
actual = {
    key: 'key',
    value: 'value'
};
expect = {
    key: 'key',
    value: 'value'
};
errMessage = "Object compare failed";
assert.deepEqual(actual, expect, errMessage);
//assert.notDeepEqual(actual, expect, errMessage);

/*
 * throws()
 * - expect exception
 * doesNotThrow()
 * - expect no exception block
 */
function errorGenerator(){
    throw new RangeError('Not in range');
}
function normalFunction(a, b){
    return a*b;
}
assert.throws(errorGenerator.bind(null), RangeError);
assert.doesNotThrow(normalFunction.bind(null, 5, 8), RangeError);

/*
 * ifError()
 * - falsy value check, null, false, ""
 * - BUT no error
 */
assert.ifError(null);
assert.ifError(false);
assert.ifError("");
//assert.ifError(new Error('error'));