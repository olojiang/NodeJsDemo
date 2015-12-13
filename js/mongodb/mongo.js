/**
 * Created by Hunter on 3/14/2015.
 */
var mongoose = require('mongoose');

exports.conn = function(url, port, dbName, user, pass, callBack) {
    var urlString = 'mongodb://'+url+":"+port+"/"+dbName;
    var options = {
        user: user,
        pass: pass
    };

    console.info("Connecting to: " + urlString);
    var db = mongoose.createConnection(urlString, options);

    db.on('error', function(error){
        console.error(error);
    });

    db.on('open', function(){
        console.info("Connection is open: ", urlString);

        // Call user functions
        callBack();
    });

    return db;
};

