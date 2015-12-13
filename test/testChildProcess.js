/**
 * Created by Hunter on 4/16/2015.
 */
var cp = require('child_process');
var path = require('path');

// spawn()
// - It returns an object with stdin and stdout
// - Return a lot of data, use spawn()
var nodeCmd = cp.spawn('node', ['test/testPath.js']);
nodeCmd.stdout.setEncoding('utf8');
nodeCmd.stdout.on('data', function(d){
    console.info("spawn(), data:", d);
});
nodeCmd.stderr.setEncoding('utf8');
nodeCmd.stderr.on('data', function(e){
    console.info("spawn(), error:", e);
});
nodeCmd.on('exit', function(){
    console.info("spawn(), exit!");
});
//echo.stdin.write('Hello spawn()');
//echo.stdin.end();

// exec()
// It executes on the Shell or CMD env
cp.exec('dir /w', function(e, stdout, stderr){
    if(!e) {
        console.info("exec('dir /w'), stdout:", stdout);
        console.info("exec('dir /w'), stderr:", stderr);
    } else {
        console.info("exec('dir /w'), error:", e);
    }
});
cp.exec('node -v', function(e, stdout, stderr){
    if(!e) {
        console.info("exec('node -v'), stdout:", stdout);
        console.info("exec('node -v'), stderr:", stderr);
    } else {
        console.info("exec('node -v'), error:", e);
    }
});

// exec() with some options
// - encapsulate of spawn
// - as it has buffer, exceed buffer will result error, so it's not suitable to use it to return a lot of data.
// - It's not safe, when you execute a command line return a lot of data
var options = {
    encoding: 'utf8',
    timeout: 0,
    maxBuffer: 200 * 1024,
    killSignal: 'SIGTERM',
    setsid: false,
    cwd: 'f:/',
    env: null
};

// exec with stream syntax
var execStream = cp.exec('dir /a', options, function(e, stdout, stderr){
    if(!e) {
        console.info("exec('node -v'), stdout:", stdout);
        console.info("exec('node -v'), stderr:", stderr);
    } else {
        console.info("exec('node -v'), error:", e);
    }
});

execStream.stdout.on('data', function(data) {
    console.info("exec(). Stream ('dir /a'), on data:", data);
});

execStream.stderr.on('error', function(error) {
    console.info("exec(). Stream ('dir /a'), on error:", error);
});

execStream.on('close', function() {
    console.info("exec(). Stream ('dir /a'), end.");
});

// execFile()
// It's not in shell or CMD env
cp.execFile('node', ['-v'], function(e, result){
    if(!e) {
        console.info("execFile: 'node', ['-v']:", result);
    } else {
        console.info('execFile: node', ['-v'], e);
    }
});

// fork()
// - encapsulate of spawn
// - Child process must be the JavaScript
// - Use fork to create child process which can communicate with its parent process
// - the same as: cp.spawn('node', [path.join(__dirname, '../js/process/childProcess.js')], {stdio: ['ipc'}})
// -- the stdio's 'ipc' for cp.spawn(), will open the ipc communication between parent and child process,
// -- which is encapsulated by fork()
var childProcess = cp.fork(path.join(__dirname, '../js/process/childProcess.js'));

childProcess.send({msg: 'Hi Child.'});

childProcess.on('message', function(m){
    console.info("Parent got message from child:", m);
    setTimeout(function(){
        childProcess.kill('SIGTERM');
    }, 1000);
});