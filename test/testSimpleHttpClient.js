/**
 * Created by Hunter on 3/28/2015.
 */
var simpleClient = require('../js/http/simpleClient');

var host = 'localhost';
var port = 82;
var path = '/';
var content = 'Hello Http Client \nRuby.';
simpleClient.post(host, port, path, content);