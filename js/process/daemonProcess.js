"use strict";

/**
 * Created by Hunter on 4/18/2015.
 */
var cp = require('child_process');

function daemon(file) {
    var worker = cp.spawn('node', [file], {stdio: ['ipc']});

    worker.stdout.on('data', function(data){
        console.info('child data: ', data.toString());
    });

    worker.stderr.on('data', function(e){
        console.error('child error: ', e.toString());
    });

    worker.on('message', function(msg){
        console.info("From " + file, JSON.stringify(msg));
    });

    worker.on('exit', function(code){
        console.info("Main Process exit, detected exit code: ", code);
        if(code !== 0) {
            // Restart process.
            console.info("Main Process restarted: " + file);
            daemon(file);
        }
    });
}

exports.daemon = daemon;