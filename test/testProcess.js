/**
 * Created by Hunter on 3/29/2015.
 */
/*
  process.argv
   - 0 is node
   - 1 is this js file.
 */
console.info("process.argv:", process.argv);
console.info("process.argv arguments", process.argv.slice(2));

/*
  process.execArgv
    - Node parameter
 */
console.info("process.execArgv:", process.execArgv);

/*
  process.version
    - Node Version
 */
console.info("process.version:", process.version);

/*
  Node version and dependent module versions
 */
console.info("process.versions:", process.versions);

/*
  process.title
 */
console.info("process.title:", process.title);

/*
  process.arch
 */
console.info("process.arch:", process.arch);

/*
  process.platform
 */
console.info("process.platform:", process.platform);

/*
  process.env
 */
console.info("process.env:", process.env);

/*
  process.env can be written and changed the outside
 */
process.env.foo = 'bar';
console.log("process.env.foo:", process.env.foo);

/*
  process.pid
 */
console.info("process.pid:", process.pid);

/*
  - ONLY for Unix
  process.getgroups()
  process.getgid()
  process.getuid()
 */

/*
  process.cwd()
 */
console.info("process.cwd():", process.cwd());

/*
  process.chdir()
 */
console.info("Changed to 'test':");
process.chdir('test');
console.info("process.cwd():", process.cwd());

/*
  process.execPath
    - Node path
 */
console.info("process.execPath:", process.execPath);

/*
  process.stdin,
  process.stdout,
  process.stderr
 */
process.stdout.write("Input something: \n");
process.stdin.setEncoding('utf-8');
process.stdin.on('readable', function(){
    var chunk = process.stdin.read();

    if(chunk !== null) {
        process.stderr.write('data: ' + chunk);

        if(chunk === 'q\n') {
            process.exit(0);
        }
    }
});
process.stdin.on('end', function(){
    process.stdout.write('end');
});

/*
  - process.uptime()
 */
setInterval(function(){
    var uptime = process.uptime();
    console.info("uptime:", uptime);
}, 1000);

/*
 process.nextTick()
 - When node process is available to execute
 */
process.nextTick(function(){
    console.info("process.nextTick()");
});

/**
 * Catch uncaughtException
 */
process.on('uncaughtException', function(err){
    console.info("uncaughtException err:", err);
});

/*
 process.exit()
 */
setTimeout(function(){
    try {
        throw new Error("This is an Error Sample");
    } catch (err) {
        console.info("err:", err);
        process.exit(1);
    }
}, 60*1000);

console.info("Will exit in 60 seconds:");

/*
 process.kill()
 - SIGHUP
 - SIGINT
 - SIGTERM
 - SIGPIPE
 - https://nodejs.org/api/process.html#process_signal_events
 */
//process.on('SIGHUP', function(){
//    console.info("SIGHUP is received");
//});
//process.kill(process.pid, "SIGHUP");