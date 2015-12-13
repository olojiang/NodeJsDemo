/**
 * Created by Hunter on 4/18/2015.
 */
var path = require('path');
var dp = require('../js/process/daemonProcess');

dp.daemon(path.join(__dirname, "../js/process/errorMainProcess.js"));