/**
 * Created by Hunter on 3/26/2015.
 */
var exported = require('../js/exportsDemo.js');

console.info("exported: ", exported);
console.info("text: ", exported.text);
console.info("add（5, 6）: ", exported.add(5, 6));
console.info("subtract（5, 6）: ", exported.subtract(5, 6));

var exported2 = require('../js/exportsDemo2.js');
console.info("exported2", exported2);
exported2.say();