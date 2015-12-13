/**
 * Created by Hunter on 5/29/2015.
 */
"use strict";

var http = require('http');

// connect
// - npm install -g connect
var connect = require('connect');
var app = connect();

// - npm install -g ws
var WebSocketServer = require('ws').Server;

// create web server
//app.use(connect.static("public"));
var server = http.createServer(app);

// create WebSocket server based on web server
var wsServer = new WebSocketServer({
    server: server
});

// after on connection
wsServer.on('connection', function(ws){

    // specific web socket connection
    // on('message')
    ws.on('message', function(message, flags){
        // echo back
        console.info("From client: \n%s", message);
        ws.send("Server is happy to know you, " + message, flags);
    });
});

// Listen on Http Server
server.listen(800);

// Client Part
var webSocket = require('ws');
var ws = new webSocket("ws://localhost:800");

ws.on('open', function(){
    ws.send('Hello from Client');
});

ws.on('message', function(data, flags) {
    console.info("From server: \n%s", data);
    ws.close();
});