/**
 * Created by Hunter on 4/6/2015.
 */
var htmlUtil = require('../js/html.util.js');
var result = htmlUtil.getBlogPreview('<p>eeeee<span>aaaaaa</span>eeeee</p><p>bbbbbbbbbbbbbbbbbbb</p><p>cccccccccccccccccc</p><p>ddddddddddddddd</p>', 20);
console.info("20 result:", result);
result = htmlUtil.getBlogPreview('<p>eeeee<span>aaaaaa</span>eeeee</p><p>bbbbbbbbbbbbbbbbbbb</p><p>cccccccccccccccccc</p><p>ddddddddddddddd</p>', 50);
console.info("50 result:", result);
result = htmlUtil.getBlogPreview('<p>eeeee<span>aaaaaa</span>eeeee</p><p>bbbbbbbbbbbbbbbbbbb</p><p>cccccccccccccccccc</p><p>ddddddddddddddd</p>', 100);
console.info("100 result:", result);
result = htmlUtil.getBlogPreview('<p>eeeee<span>aaaaaa</span>eeeee</p><p>bbbbbbbbbbbbbbbbbbb</p><p>cccccccccccccccccc</p><p>ddddddddddddddd</p>', 150);
console.info("150 result:", result);

var path = require('path');
var fs = require('fs');
var _ = require('underscore');

var dirUtil = require('../js/file/dirUtil');
var mongo = require('../js/mongodb/mongo');
var blogCollection = require('../js/mongodb/blog');
var url = "olojiang.com";
var port = 27017;
var dbName = "blog";
var user = "blogAdmin";
var password = "zhu88jie@blogAdmin";
var db = mongo.conn(url, port, dbName, user, password, callback);
blogCollection.initModel(db);

function callback() {
    blogCollection.selectBlogByAuthor('jiwei', null, 1, null, false, function(docs){
        //console.info("docs[0]:", docs[0]);
        var result = [];
        var ourImageResult = [];

        for (var i = 0; i < docs.length; i++) {
            var doc = docs[i];
            var images = [];
            var ourImage = [];
            htmlUtil.getImages(doc.content, images, ourImage);

            result = result.concat(images);
            ourImageResult = ourImageResult.concat(ourImage);
        }

        console.info("htmlUtil.getImages(docs):", result);

        ourImageResult = _.map(ourImageResult, function(item){
            return item.replace(/\/uploadFiles\//, '');
        });
        console.info("ourImageResult:", ourImageResult);

        console.info("process.argv[1]:", process.argv[1]);
        var targetPath = path.join(path.dirname(process.argv[1]), "../public/uploadFiles");
        console.info("targetPath:", targetPath);

        dirUtil.eachFiles(targetPath, function(pathX){
            var fileName = path.basename(pathX);
            if( ourImageResult.indexOf(fileName) >-1) {
                // Find it, then it's valid
            } else {
                // Not find it, then it's invalid file, need to delete.
                console.info("Delete file:", pathX);
                fs.unlinkSync(pathX);
            }
        });
    });
}