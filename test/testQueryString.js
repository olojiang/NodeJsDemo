/**
 * Created by Hunter on 3/29/2015.
 */
var queryString = require('querystring');

/*
  parse()
 */
var parsedString = queryString.parse('abc=true&def=789&def=999&param=ccc&ooo=');
console.info("parsedString:", parsedString);

/*
  stringify()
 */
var qString = queryString.stringify({
    param1: 'abc',
    param2: ['def', 'hij'],
    param3: ''
});

console.info("qString:", qString);