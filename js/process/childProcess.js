/**
 * Created by Hunter on 4/16/2015.
 */
process.on('message', function(m){
    console.log('Child got message from parent: ', m);
});

process.send({msg: 'Hi Parent.'});

process.on('SIGTERM', function(){
    // Clean up
    console.info("Child process got SIGTERM.");
    process.exit(0);
});