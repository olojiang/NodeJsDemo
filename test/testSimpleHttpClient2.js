/**
 * Created by Hunter on 04/02/2015.
 */
var simpleClient = require('../js/http/simpleClient');

//http://sports.sina.com.cn/nba/2015-04-27/04427588908.shtml

//var host = 'www.baidu.com';
//var port = 80;
//var path = '/';
//var content = 'Hello Http Client \nNode.js.';
var host = 'www.sina.com.cn';
var port = 80;
var path = '/';
var content = 'Hello Http Client \nNode.js.';
simpleClient.post(host, port, path, content, 'get');