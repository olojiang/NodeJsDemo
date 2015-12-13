/**
 * Created by Hunter on 3/27/2015.
 */
"use strict";

var fs = require('fs');
var path = require('path');
var dirUtil= require('./dirUtil');
var iconv = require('iconv-lite');
var cp = require('child_process');

function readText(path) {
    var rs = fs.readFileSync(path);

    if(rs[0]=== 0xEF && rs[1]=== 0xBB && rs[2]=== 0xBF) {
        // Remove UTF-8 BOM, if we find it
        rs = rs.slice(3);
    }

    return rs.toString();
}

exports.readText = readText;

function readFileSync(path) {
    var rs = fs.readFileSync(path);

    if(rs[0]=== 0xEF && rs[1]=== 0xBB && rs[2]=== 0xBF) {
        // Remove UTF-8 BOM, if we find it
        rs = rs.slice(3);
    }

    return rs;
}

exports.readFileSync = readFileSync;

/**
 * Get all matched string count for all the files under dir
 * @param dirPath
 *   - search for files under dir
 * @param regex
 *   - match file content with the regex
 * @param ext
 *   - match file with the ext
 */
exports.getStringCount = function(dirPath, regex, ext) {
    var list = dirUtil.getFileList(dirPath, true);
    console.info("%s: list.length=%s", dirPath, list.length);
    var i, len;

    var results = [];

    for (i = 0, len = list.length; i < len; i++) {
        var filePath = list[i];

        // Judge the ext file
        if( path.extname(filePath.path).toLowerCase() !== ext.toLowerCase() ) {
            console.info('* Skip: %s', filePath.path);
            continue;
        }

        var item = this.readFileSync(filePath.path);

        // Use Encoding GBK to try first
        var content = iconv.decode(item, 'gbk');
        var matches = content.match(regex) || [];

        var stat = fs.statSync(filePath.path);

        if (matches.length !== 0) {
            console.info("[%d/%d] [ANSI] filePath=%s, regex=%s, matches.length=%s", i, len, filePath.path, regex, matches.length);
        } else {
            // Match is null, then try utf-8
            content = item.toString();
            matches = content.match(regex) || [];
            console.info("[%d/%d] [UTF-8] filePath=%s, regex=%s, matches.length=%s", i, len, filePath.path, regex, matches.length);
        }

        results.push({
            path: filePath.path,
            matchLength: matches.length,
            regex: regex,
            size: stat.size
        });
    }

    results.sort(function(item1, item2){
        return item1.matchLength/item1.size - item2.matchLength/item2.size;
    });

    return results;
};

exports.copy = function(src, dest){
    fs.writeFileSync(dest, fs.readFileSync(src));
    console.info("Copied: " + src + " -> " + dest);
};

exports.copyByStreamPipe = function(src, dest) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    console.info("Stream Copied" + src + " -> " + dest);
};

exports.copyByStreamManual = function(src, dest) {
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(dest);

    rs.on('data', function(chuck){
        if( ws.write(chuck) === false ) {
            // Pause when ws not write fully.
            rs.pause();
        }
    });

    rs.on('end', function(){
        ws.end();
    });

    ws.on('drain', function(){
        rs.resume();
    });
};

/**
 * Move file by command line
 * @param sourcePath
 * @param targetPath
 * @param i
 * @param len
 * @returns {string}
 */
exports.moveFile = function(sourcePath, targetPath, i, len) {
    // Move file to target
    var cmd = 'move "' + sourcePath + '" "' + targetPath + '"';
    console.info("* CMD [%d/%d]: ", (i + 1), len, cmd);
    cp.exec(cmd, function(error, stdout, stderr){
        if(error !== null) {
            console.error('execute error: ', error);
        }
    });
    return cmd;
};