/**
 * Created by Hunter on 3/26/2015.
 */

/*
 -s test/testCopy.js -d test/testCopy.js_copied
 */
var argv = require('argv');
var copyUtil = require('../js/file/fileUtil.js');

var args = argv.option([{
    name: "source",
    short: "s",
    type: "path"
}, {
    name: "dest",
    short: "d",
    type: "path"
}
]).run();

var options = args.options;
console.info("args", options);

copyUtil.copy(options.source, options.dest);

copyUtil.copyByStreamPipe(options.source, options.dest+"_stream_pipe");

copyUtil.copyByStreamManual(options.source, options.dest+"_stream_manual");