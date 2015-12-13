/**
 * Created by Hunter on 3/26/2015.
 */
/**
 * Use folder name to require (%DIR%+index.js))
 * - main.js contains a.js b.js,
 * - that's why we call it package.
 * @type {exports}
 */
var testPackage = require('../js/testPackage');

console.info("Text", testPackage.text);

testPackage.sayHello();
testPackage.sayWorld();

var testPackage2 = require('../js/testPackage2');

console.info("Text", testPackage2.text);

testPackage2.sayHello();
testPackage2.sayWorld();