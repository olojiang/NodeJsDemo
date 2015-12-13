/**
 * Created by Hunter on 5/14/2015.
 */

"use strict";

var assert = require('assert');
var dirUtil = require('../js/file/dirUtil');
var os = require('os');

describe('Test Dir Functions', function(){
    it('Test remove dir && make new dir', function(){
        dirUtil.rmdir('d:\\test');
        assert(dirUtil.mkdir('d:\\test'));
        assert(dirUtil.rmdir('d:\\test'));
    });

    it('File list can be got', function(){
        var fileList = dirUtil.getFileList(os.tmpdir(), false/*keepFilesList*/);

        console.info("fileList:", fileList, ", size:", fileList.length);
        assert(fileList);
        assert(fileList.length>0);
    });

    it('Directory list can be got', function(){
        var fileList = dirUtil.getDirList(os.tmpdir(), false/*keepFilesList*/);

        console.info("fileList:", fileList, ", size:", fileList.length);
        assert(fileList);
        assert(fileList.length>0);
    });
});
