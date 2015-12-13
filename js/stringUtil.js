/**
 * Created by Hunter on 2/27/2015.
 */
"use strict";

/**
 * Generate random string with max length
 * @param prefix
 * @param randomNumber
 * @returns {*}
 */
function generateString(prefix, randomNumber) {
    if(randomNumber<=0) {
        return prefix;
    }

    var arr="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var result = "";
    for(var i = 0; i<randomNumber; i++) {
        result += arr[Math.floor(Math.random()*52)];
    }

    return prefix + result;
}

/**
 * Get a string with max String length
 * @param content
 * @param number
 * @returns {*}
 */
function maxString(content, number) {
    if(content && content.length>number) {
        return content.substring(0, number-3)+"...";
    } else if(!content) {
        return "";
    } else {
        return content;
    }
}

if(typeof exports === "undefined") {
    exports = {};
}

exports.generateString = generateString;
exports.maxString = maxString;