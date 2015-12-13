/**
 * Created by Hunter on 4/25/2015.
 */
"use strict";
var pageItem = require('../js/pageItem');

var list = ['index', 'new', 'detail', 'list'];

for (var i = 0; i < list.length; i++) {
    var page = list[i];
    var item = pageItem[page + 'PageItem'];
    console.info(page + ".js:", item.js);
    console.info(page + ".css:", item.css);
}
