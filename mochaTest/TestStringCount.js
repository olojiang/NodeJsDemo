/**
 * Created by Hunter on 6/20/2015.
 */
"use strict";

var fileUtil = require('../js/File/fileUtil');
var dirUtil = require('../js/File/dirUtil');
var iconv = require('iconv-lite');
var fs = require('fs');
var path = require('path');

String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length) {
        str = padString + str;
    }
    return str;
};

// Test Suite
describe("Test to find string in file", function(){
    // Test Case
    it.skip("Read File", function(){
        var item = fileUtil.readText('f:\\ToDel\\PP_Novel_CN\\ToRead\\冰峰魔戀（又名胸大有罪）.txt');
        console.info("item.length=", item.length);
        console.info("item.substring(0, 100)=", item.substring(0, 100));

        var regex = /淫/g;
        var matches = item.match(regex)||[];
        console.info("matches.length=", matches.length, matches[1]);
    });

    // Test Case
    it("Read all dir files", function(){
        var regex = /乳/g;
        //var regex = /pussy/g;
        //var dirPath = 'f:\\ToDel\\PP_Novel_CN\\ToRead';
        var dirPath = 'f:\\ToDel\\H\\S\\重生女强玄幻小说';
        //var dirPath = 'f:\\ToDel\\PP_Novel_CN\\Multiple\\Novel';
        //var dirPath = 'f:\\ToDel\\PP_Novel_CN\\Novel03';
        //var dirPath = 'f:\\ToDel\\PP_Novel_EN\\xNovel Sex Stories';
        //var dirPath = 'f:\\ToDel\\PP_Novel_EN\\Storiesonline Sex Stories';
        //var targetDir = 'f:\\ToDel\\PP_Novel_CN\\ToRead';
        var minMatchLength = 30;
        var minSize = 70000;
        var ext = '.txt';

        var files = fileUtil.getStringCount(dirPath, regex, ext);
        var i, len, n=1;
        var fileMap = {};
        for (i = 0, len = files.length; i < len; i++) {
            var file = files[i];

            if(file.matchLength<minMatchLength) {
                console.info("* Remove, because match length<%d: file.path=%s", minMatchLength, file.path);

                try {
                    fs.unlinkSync(file.path);
                } catch(e) {
                    console.error(e);
                }
                continue;
            }

            // Skip small files
            if(file.size<minSize) {
                console.info("* Remove, because size<%d: file.path=%s", minSize, file.path);

                try {
                    fs.unlinkSync(file.path);
                } catch(e) {
                    console.error(e);
                }
                continue;
            }

            var name = path.basename(file.path).replace(/^\d+_/, "");
            if(fileMap[name]) {
                console.info("* Remove, because duplicated: file.path=%s", minSize, file.path);
                try {
                    fs.unlinkSync(file.path);
                } catch(e) {
                    console.error(e);
                }
                continue;
            } else {
                fileMap[name] = true;
            }

            console.info("%d, path=%s, matchLength=%s, regex=%s, size=%s", n, file.path, file.matchLength, file.regex, file.size);
            fs.renameSync(file.path, path.join(path.dirname(file.path), (""+n).lpad("0", 4)+"_"+name));
            n++;
        }
    });
});