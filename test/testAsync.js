/**
 * Created by Hunter on 5/17/2015.
 */
"use strict";
//debugger;
// https://github.com/caolan/async#readme

var async = require('async');

// series()
// - Any one of the function in chain failed, it will end
// - first parameter is function array
async.series([
    function(callback){
        setTimeout(function(){
            callback(null/*error*/, 5/*result*/);
        }, 300);
    },
    function(callback){
        setTimeout(function(){
            callback(null/*error*/, 7/*result*/);
        }, 300);
    },
    function(callback){
        setTimeout(function(){
            callback(null/*error*/, 9/*result*/);
        }, 300);
    }
], function(errors, results){
    if(!!errors) {
        console.error(errors);
    } else {
        console.info("results(series)=", results);
    }
});

// Async with errors
// - callback function's first parameter
async.series([
    function(callback){
        setTimeout(function(){
            callback(null/*error*/, 5/*result*/);
        }, 300);
    },
    function(callback){
        setTimeout(function(){
            callback(new Error('customized error')/*error*/, 7/*result*/);
        }, 300);
    },
    function(callback){
        setTimeout(function(){
            callback(null/*error*/, 9/*result*/);
        }, 300);
    }
], function(errors, results){
    if(!!errors) {
        console.error("errors=", errors);
    } else {
        console.info("results(series)=", results);
    }
});

// parallel()
// - first parameter is an object, key is used to get result
async.parallel({
    one: function(callback){
        setTimeout(function(){
            callback(null/*error*/, 1/*result*/);
        }, 300);
    },
    two: function(callback){
        setTimeout(function(){
            callback(null/*error*/, 2/*result*/);
        }, 300);
    },
    three: function(callback){
        setTimeout(function(){
            callback(null/*error*/, 3/*result*/);
        }, 300);
    }
}, function(errors, results){
    if(!!errors) {
        console.error("errors=", errors);
    } else {
        console.info("results(parallel)=", results);
    }
});

// parallelLimit()
// - only add a parameter as 2nd one, for the parallelism limitation
async.parallelLimit({
    one2: function(callback){
        setTimeout(function(){
            callback(null/*error*/, 11/*result*/);
        }, 300);
    },
    two2: function(callback){
        setTimeout(function(){
            callback(null/*error*/, 12/*result*/);
        }, 300);
    },
    three2: function(callback){
        setTimeout(function(){
            callback(null/*error*/, 13/*result*/);
        }, 300);
    }
}, 2/*parallelLimit*/, function(errors, results){
    if(!!errors) {
        console.error("errors=", errors);
    } else {
        console.info("results(parallelLimit)=", results);
    }
});

// waterfall()
// - It's series() with dependencies
async.waterfall([
    function(callback){
        setTimeout(function(){
            callback(null/*error*/, 5/*param1*/);
        }, 300);
    },
    function(a, callback){
        setTimeout(function(){
            callback(null/*error*/, a*a/*param1*/, a*a*a/*param2*/);
        }, 300);
    },
    function(a, b, callback){
        setTimeout(function(){
            callback(null/*error*/, a+b/*param1*/);
        }, 300);
    }
], function(errors, result){
    if(!!errors) {
        console.error(errors);
    } else {
        console.info("results(waterfall)=", result);
    }
});

// queue()
// - if a task repeats, and handling is the same
// - if a task repeat operation want to be limited with the parallelism
// - it will generate several results

// Create queue
var queueMaxParallel = 5;
function worker(item, callback){
    setTimeout(function(){
        callback(null/*error*/, item*item/*param1*/);
    }, 300);
}

var queue = async.queue(worker, queueMaxParallel);

// Can change, after queue object, is created
//queue.concurrency = 5;

// Handle result
function done(error, results) {
    if(error) {
        throw error;
    }

    console.info("results(queue)=", results);
}

// Fill th e queue
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(function(i){
    // Push item, and call back function into queue
    // - actual to worker
    queue.push(i, function(error, result){
        if(error) {
            throw error;
        }
        console.info("%d^2=", i, result);
    });
});

// When queue has all space occupied.
queue.saturated = function(){
    console.info("* Used all queue space");
};

// When queue is empty because, every task sent to worker
queue.empty = function(){
    console.info("* Queue input slot is empty");
};

// When queue is empty because, every task to work has benn done
queue.drain = function(){
    console.info("* Queue work area is drain");
};

// whilst()
var i = 0;
async.whilst(function(){
    return i<5;
}, function(callback){
    i++;
    console.info('i=%d', i);
    callback(null/*error*/);
}, function(error){
    if(error){
        throw error;
    }
    console.info("Done, whilst()");
});

// until()
var i = 0;
async.until(function(){
    return i>=5;
}, function(callback){
    i++;
    console.info('i=%d', i);
    callback(null/*error*/);
}, function(error){
    if(error){
        throw error;
    }
    console.info("Done, until()");
});

// doWhilst()
i = 0;
async.doWhilst(function(callback){
    i++;
    console.info('i=%d', i);
    callback(null/*error*/);
}, function(){
    return i<5;
}, function(error){
    if(error){
        throw error;
    }
    console.info("Done, doWhilst()");
});

// doUntil()
i = 0;
async.doUntil(function(callback){
    i++;
    console.info('i=%d', i);
    callback(null/*error*/);
}, function(){
    return i>=5;
}, function(error){
    if(error){
        throw error;
    }
    console.info("Done, doWhilst()");
});

// forEach()
var results = {};
var iterator = function(value, callback){
    setTimeout(function(){
        results[value] = value*value;

        callback();
    }, 1000);
};
var doneForEach = function(error){
    if(error) {
        console.info('error = %j, stack = %j', error, error.stack);
    }

    console.info("results(forEach)=", results);
};
async.forEach([1, 2, 3, 4], iterator, doneForEach);

// forEachSeries()
var doneForEachSeries = function(error){
    if(error) {
        console.info('error = %j, stack = %j', error, error.stack);
    }

    console.info("results(doneForEachSeries)=", results);
};
async.forEachSeries([1, 2, 3, 4], iterator, doneForEachSeries);

// forEachLimit()
var doneForEachLimit = function(error){
    if(error) {
        console.info('error = %j, stack = %j', error, error.stack);
    }

    console.info("results(doneForEachLimit)=", results);
};
var maxConcurrency = 2;
async.forEachLimit([1, 2, 3, 4], maxConcurrency, iterator, doneForEachLimit);

// map()
// - gather errors and results, Automatically
var doneMap = function(error, results){
    if(error) {
        console.info('error = %j, stack = %j', error, error.stack);
    }

    console.info("results(map)=", results);
};
var iteratorMap = function(value, callback){
    setTimeout(function(){
        var newVal = value*value*value;

        callback(null/*error*/, newVal);
    }, 1000);
};
async.map([1, 2, 3, 4], iteratorMap, doneMap);

// reduce()
var doneReduce = function(error, results){
    if(error) {
        console.info('error = %j, stack = %j', error, error.stack);
    }

    console.info("results(reduce)=", results);
};
var iteratorReduce = function(memo, value, callback){
    setTimeout(function(){
        var newVal = memo + value*value*value;

        callback(null/*error*/, newVal);
    }, 1000);
};
var initMemo = 0;
async.reduce([1, 2, 3, 4], initMemo, iteratorReduce, doneReduce);

// filter()
var doneFilter = function(results){
    console.info("results(filter)=", results);
};
var iteratorFilter = function(value, callback){
    setTimeout(function(){
        var newVal = value*value*value;

        // Test for filter, true will keep, otherwise drop
        callback(newVal>15);
    }, 1000);
};
async.filter([1, 2, 3, 4], iteratorFilter, doneFilter);

// detect()
// - identify first item will return
var doneDetect = function(result){
    console.info("result(detect)=", result);
};
var iteratorDetect = function(value, callback){
    setTimeout(function(){
        var newVal = value*value*value;

        // Test for filter, true will keep, otherwise drop
        callback(newVal>15);
    }, 1000);
};
async.detect([1, 2, 3, 4], iteratorDetect, doneDetect);