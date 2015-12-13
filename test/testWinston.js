/**
 * Created by jiang on 5/22/2015.
 */
"use strict";

// require
var winston  = require('winston');

// log()
winston.log('info', 'Info');
winston.log('warn', 'Warn');
winston.log('error', 'Error');

// info()
winston.info('Hello %s', 'Info');

// error()
winston.error('Hello %s', 'Error');

// warn()
winston.warn('Hello %s', 'Warn');

// Transport
// - can be removed
// - can be add
// -- winston.transports.xxxxx
// -- Console
// -- File
// - option => level, colorize, timestamp, filename, maxsize, maxFiles
winston.remove(winston.transports.Console)
    .add(winston.transports.Console, {
        colorize: true,
        timestamp: true
    })
    .add(winston.transports.File, {
        filename: "winstonTest0.log",
        level: "warn",
        timestamp: true
    });

winston.info("New Console Transport: %j", 'info');
winston.warn("New Console Transport: %j", 'warn');
winston.error("New Console Transport: %j", 'error');

// Get new Logger
// - Multiple destination and customized output
// - Logger contains the transports
var logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            colorize: true,
            timestamp: true
        }),
        new winston.transports.File({
            filename: "winstonTest.log",
            level: "warn",
            timestamp: true
        })
    ]
});

logger.info("New Logger: %j", 'info');
logger.warn("New Logger: %j", 'warn');
logger.error("New Logger: %j", 'error');