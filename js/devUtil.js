/**
 * Created by jiang on 6/26/2015.
 */
"use strict";

var util = require('util');

var pageItem = require('pageItem');
var pages = pageItem.items;

/*
 <link rel="stylesheet" href="/css/dist/newCss.min.css"/>
 <script src="/js/dist/newJs.min.js"></script>
 */

/**
 * Get Test Files Map
 */
function getDevFilesMap() {
    var item = null;
    var files = null;
    var result = {};
    for (var page in pages) {
        if (!pages.hasOwnProperty(page)) {
            continue;
        }

        // Initialize the files
        files = [];

        // Get item
        item = pages[page];
        //console.info("page=", page);
        //console.info("item=", item);

        // CSS
        var css = item.css;
        var i, len, file;
        for (i = 0, len = css.length; i < len; i++) {
            file = css[i];
            files.push(util.format('<link rel="stylesheet" href="%s"/>', file.replace(/^public/, '')));
        }

        // JS
        var js = item.js;
        for (i = 0, len = js.length; i < len; i++) {
            file = js[i];
            files.push(util.format('<script src="%s"></script>', file.replace(/^public/, '')));
        }

        //console.info("Dev files=", files);
        result[page] = files;
    }

    return result;
}

/**
 * Get Product Files Map
 */
function getProductFilesMap() {
    var item = null;
    var files = null;
    var result = {};
    for (var page in pages) {
        if (!pages.hasOwnProperty(page)) {
            continue;
        }

        // Initialize the files
        files = [];

        // Get item
        item = pages[page];
        //console.info("page=", page);
        //console.info("item=", item);

        // CSS
        var css = item.css;
        files.push(util.format('<link rel="stylesheet" href="/css/dist/%sCss.min.css"/>', page));

        // JS
        files.push(util.format('<script defer src="/js/dist/%sJs.min.js"></script>', page));

        //console.info("Product files=", files);
        result[page] = files;
    }

    return result;
}

/**
 * Get development and product files map
 * @returns {{development: *, product: *}}
 */
exports.getFilesMap = function() {
    return {
        development: getDevFilesMap(),
        product: getProductFilesMap()
    };
};