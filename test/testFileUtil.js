/**
 * Created by Hunter on 3/27/2015.
 */
var fileUtil = require('../js/file/fileUtil');

var content = fileUtil.readText('test/testFileUtil.js');
console.info("content:", content);