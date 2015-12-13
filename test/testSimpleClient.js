/**
 * Created by Hunter on 3/29/2015.
 */
"use strict";

var simpleClient = require('../js/net/simpleClient');

var host = 'localhost';

for (var i = 0; i < 5; i++) {
    simpleClient.conn(host, 81, [
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'HOST: '+host,
        'Accept: */*',
        'Hello Net Server',
        ''
    ].join('\n'));
}

//simpleClient.conn('192.168.1.31', 8651, '');
