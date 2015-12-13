"use strict";

/**
 * Created by Hunter on 4/6/2015.
 */
var $ = require('cheerio');

exports.getBlogPreview = function(content, maxLength) {
    var list = $(content);

    var result = [];
    var totalLen = 0;
    //console.info("list.html():", list.html());
    for(var i = 0, len = list.length; i<len; i++) {
        var item = list.get(i);

        // Get HTML
        result.push($.html(item));

        // Get Text
        totalLen = totalLen + $(item).text().length;
        if(totalLen> maxLength) {
            break;
        }
    }

    return result.join("\n");
};

exports.removeImageSize = function(content) {
    var list = $(content);

    var images = list.find('img');
    for (var i = 0; i < images.length; i++) {
        var image = images[i];

        $(image).attr('width', '');
        $(image).attr('height', '');
    }

    return $.html(list);
};

exports.getImages = function(content, allImages, ourImages) {
    var list = $(content);

    var images = list.find('img');
    for (var i = 0; i < images.length; i++) {
        var image = images[i];

        var src = $(image).attr('src');
        var newSrc = src.replace(/^\/uploadFiles\//g, "http://olojiang.com/uploadFiles/");
        $(image).attr('src', newSrc);
        $(image).attr('width', '');
        $(image).attr('height', '');

        if(src !== newSrc) {
            //console.info("content:", $.html(list));
            ourImages.push(src);
        }

        allImages.push($.html(image));
    }

    return $.html(list);
};