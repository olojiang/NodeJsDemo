/**
 * Created by Hunter on 3/27/2015.
 */
"use strict";
var fs = require('fs');
var path = require('path');

/**
 * Walk through with each file in a directory
 * @param dir
 * @param callback
 */
function eachFiles(dir, callback) {
    fs.readdirSync(dir).forEach(function(file){
        var newPath = path.join(dir, file);

        if( fs.statSync(newPath).isDirectory() ) {
            eachFiles(newPath, callback);
        } else {
            callback(newPath);
        }
    });
}

exports.eachFiles = eachFiles;

var files = [];

/**
 * Get File List in a directory recursively
 * @param dir
 * @param keepFiles
 * @returns {Array}
 */
function getFileList(dir, keepFiles) {
    getFileListExt(dir, keepFiles, true/*isFile*/);
    return files;
}

exports.getFileList = getFileList;

/**
 * Get Directory List in a directory recursively
 * @param dir
 * @param keepFiles
 * @returns {Array}
 */
function getDirList(dir, keepFiles) {
    getFileListExt(dir, keepFiles, false/*isFile*/);
    return files;
}

exports.getDirList = getDirList;

/**
 * Get File List in a directory recursively
 * @param dir
 * @param keepFiles
 * @param isFile
 *  - true, for file,
 *  - false for directory
 * @returns {Array}
 */
function getFileListExt(dir, keepFiles, isFile) {
    if(!keepFiles) {
        files = [];
    }
    fs.readdirSync(dir).forEach(function(file){
        var newPath = path.join(dir, file);

        var stat = fs.statSync(newPath);
        if( stat.isDirectory() ) {
            if( !isFile ) {
                files.push(newPath);
            }

            getFileListExt(newPath, true, isFile);
        } else {
            if( isFile ) {
                files.push({
                    path: newPath,
                    mtime: stat.mtime
                });
            }
        }
    });

    return files;
}

/**
 * Make new dir, if it's not exists
 * @param path
 * @returns {boolean}
 */
function mkdir(path) {
    if( !fs.existsSync(path) ) {
        fs.mkdirSync(path);
        return true;
    } else {
        return false;
    }
}

exports.mkdir = mkdir;

/**
 * Remove dir, if it's not exists
 * @param path
 * @returns {boolean}
 */
function rmdir(path) {
    if( fs.existsSync(path) ) {
        fs.rmdirSync(path);
        return true;
    } else {
        return false;
    }
}

exports.rmdir = rmdir;