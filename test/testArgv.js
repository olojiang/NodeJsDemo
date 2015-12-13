/**
 * Created by Hunter on 3/26/2015.
 */
/*
 https://www.npmjs.com/package/argv
 npm install argv -gd

 node D:\dest\nodejs\node.exe test\testArgv.js -o test --param=1,2,3 --number=5 -b true
 */

var argv = require('argv');

// Parses default arguments 'process.argv.slice( 2 )'
// argv.run();

argv.help();

// parameter is the requirements
// Input is the targets
var args = argv.option([
    {
        name: "option",
        short: "o",
        type: 'string'
    },
    {
        name: "param",
        type: 'csv,int'
    },
    {
        name: "number",
        type: "int"
    },
    {
        name: "boolean",
        short: "b",
        type: "boolean"
    }
]).run();

console.info("args", args);
var options = args.options;

console.info("option", options.option);
console.info("param", options.param);
console.info("number", options.number);
console.info("boolean", options.boolean);
