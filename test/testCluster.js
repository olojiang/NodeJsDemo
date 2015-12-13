/**
 * Created by Hunter on 5/25/2015.
 */
"use strict";

var cluster = require('cluster');
var http = require('http');
var numCpu = require('os').cpus().length;

function workerOnline(worker){
    console.info("Worker %s is online", worker.id);
}

function workerDisconnect(worker){
    console.info("Worker %s is disconnected", worker.id);
}

function workerExit(worker){
    console.info("Worker %s is exiting", worker.id);
}

// check to see if it's cluster
if(cluster.isMaster) {
    // Main process

    // Setup cluster option
    cluster.setupMaster({
        exec: __filename, // self, which means can be other js to fork
        args: process.argv.slice(2), // node, and js file will be excluded, arguments may be changed.
        silent: false // worker's output is sent back to main, when false by default
    });

    // cluster events
    cluster.on('fork', function(worker) {
        console.info("Worker is forked: ", worker.process.pid);
    });

    cluster.on('online', function(worker) {
        console.info("Worker is online: ", worker.process.pid);
    });

    // When worker is disconnected
    cluster.on('disconnect', function(worker) {
        console.info("Worker is disconnected: ", worker.process.pid);
    });

    // Can detect error and restart clusteer
    cluster.on('exit', function(worker, code, signal){
        console.info("Worker exit: ", worker.process.pid);

        // detect crash reason
        var crash = true;

        if( crash ) {
            console.info('Restarting worker');
            cluster.fork();
        }
    });

    // fork() child process
    console.info("numCpu=", numCpu);

    var i, len;
    for (i = 0; i < numCpu; i++) {
        console.info("Forking children, %d", i);

        // fork()
        // - to fork() child process
        var worker = cluster.fork();

        // - returned Worker from fork() has several event
        worker.on('online', workerOnline.bind(null, worker));
        worker.on('disconnect', workerDisconnect.bind(null, worker));
        worker.on('exit', workerExit.bind(null, worker));

        // Because process is fork() out,
        // So worker.process has the Child_Process ability to send() signal and message
        // - refer to node.js child_process for more
    }

    console.info("process.pid=", process.pid);

    // Workers object can be got
    // - in Cluster main process
    var workers = cluster.workers;
    for(var j in workers) {
        if( workers.hasOwnProperty(j) ) {
            var workerJ = workers[j];

            console.info("Workers object find worker: %s, pid=%s", workerJ.id, workerJ.process.pid);
        }
    }

    // disconnect all worker;
    setTimeout(function(){
        cluster.disconnect();
    }, 3000);
} else {
    // Child process
    var server = http.createServer(function(req, res){
        console.log(process.pid + ": get request for URL %s", req.url);
        res.writeHead(200);
        res.end("Hello from Cluster child process");
    }).listen(8000);

    server.on('listening', function(){
        console.info('%s is listening on: 8000', process.pid);
    });

    console.info("Worker's process.pid=", process.pid);
}