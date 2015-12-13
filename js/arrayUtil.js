/**
 * Created by Hunter on 4/26/2015.
 */
"use strict";
// - Underscore
var underscore = require('underscore');

/**
 * Reduce for one page
 * @param files
 * @param dependentList
 * @returns {*}
 */
function reduceOnePage(files, dependentList) {
    return underscore.reduce(dependentList, function (memo, itemKey) {
        var item = files[itemKey];
        var baseDir = files.baseDir;
        var js = item.js;
        var css = item.css;
        var resultJsArray = [];
        var resultCssArray = [];
        resultJsArray = reduceOneType(js, resultJsArray, baseDir, memo.js);
        resultCssArray = reduceOneType(css, resultCssArray, baseDir, memo.css);
        return {
            js: resultJsArray,
            css: resultCssArray
        };
    }, {js: [], css: []});
}

/**
 * Reduce one single type
 * - js or css
 * @param newItem
 * @param newArray
 * @param baseDir
 * @param memoArray
 * @returns {Array.<T>|string|Buffer|*}
 */
function reduceOneType(newItem, newArray, baseDir, memoArray) {
    if (newItem) {
        if (underscore.isArray(newItem)) {
            newArray = newArray.concat(underscore.map(newItem, function (item) {
                return baseDir + item;
            }));
        } else {
            newArray.push(baseDir + newItem);
        }
    }
    newArray = memoArray.concat(newArray);
    return newArray;
}

exports.reduceOnePage = reduceOnePage;