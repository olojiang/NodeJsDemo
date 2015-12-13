"use strict";

/**
 * Created by Hunter on 4/16/2015.
 */
process.on('message', function(m){
    console.log('Child got message from parent: ', m);
});

setInterval(function(){
    process.send({msg: 'Hi Daemon Process.'});
}, 1000);

setTimeout(function(){
    // exit with abnormal exit code
    process.exit(2);
}, 3000);

//console.info("test info");
//console.error("test error");