/**
 * Created by jiang on 6/26/2015.
 */
"use strict";

var assert = require('assert');
var devUtil = require('../js/devUtil');

describe('Construct Dev|Production JS and CSS', function(){
    it('devJS,CSS', function(){
        var results = devUtil.getFilesMap();
        console.info("results=%j", results);
        assert(true);
    });
});
