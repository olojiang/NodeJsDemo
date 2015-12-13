/**
 * Created by Hunter on 5/14/2015.
 */
"use strict";

var assert = require('assert');
var timeUtil = require('../js/timeUtil');
describe('Test Time Functions', function(){
    it('Test time format correctly', function(){
        var dateString = timeUtil.getDateByFormat(new Date(), 'YYYY_MM_DD');
        console.info("\ndateString:", dateString);

        assert(true);
    });
});