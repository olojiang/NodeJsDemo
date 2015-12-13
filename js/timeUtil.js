/**
 * Created by Hunter on 5/14/2015.
 */

"use strict";
var moment = require('moment');

/**
 * Get date in format
 * - format example: 'YYYY_MM_DD'
 * - input is time object
 * @param time
 * @param format
 */
exports.getDateByFormat = function(time, format){
    var t = moment(time);

    return t.format(format);
};
