"use strict";

var pathX = require('path');

/**
 * Removes a module from the cache
 */
require.uncache = function (moduleName) {
    // Run over the cache looking for the files
    // loaded by the specified module name
    require.searchCache(moduleName, function (mod) {
        delete require.cache[mod.id];
    });

    // Remove cached paths to the module.
    // Thanks to @bentael for pointing this out.
    Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
        if (cacheKey.indexOf(moduleName)>0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};

/**
 * Runs over the cache to search for all the cached
 * files
 */
require.searchCache = function (moduleName, callback) {
    // Resolve the module identified by the specified name
    var mod = require.resolve(moduleName);

    // Check if the module has been resolved and found within
    // the cache
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        // Recursively go over the results
        (function run(mod) {
            // Go over each of the module's children and
            // run over it
            mod.children.forEach(function (child) {
                run(child);
            });

            // Call the specified callback providing the
            // found module
            callback(mod);
        })(mod);
    }
};

var jsonTest = module.exports = {
    test: false,
    setTest: function(test) {
        this.test = test;
    },
    getJson: function(file) {
        var path = '../json/'+file+'.json';
        console.info("read path:", path);
        require.uncache(path);
        return require(path);
    }
};

function test() {
    jsonTest.setTest(true);
    var json = jsonTest.getJson('testFile');
    console.info("json:%j", json);
    console.info("require.cache:", require.cache);

    jsonTest.getJson('testFile');
}

if(process.argv[2] === 'testSingle=true') {
    test();
}