/**
 * Created by Hunter on 3/14/2015.
 */
var mapUtil = require('../js/map.util.js');

var mongo = require('../js/mongodb/mongo');
var blogCollection = require('../js/mongodb/blog');
var url = "olojiang.com";
var port = 27017;
var dbName = "blog";
var user = "blogAdmin";
var password = "zhu88jie@blogAdmin";

function testInsert() {
    blogCollection.insertBlog({
        title: "testTitle_" + Math.random().toFixed(3),
        content: "testContent_" + Math.random().toFixed(3),
        author: "jiwei",
        createDate: new Date(),
        updateDate: new Date(),
        visited: 0,
        tags: ["test", "node.js"]
    }, function (n) {
        console.info(n);
    });

    blogCollection.insertBlog({
        title: "testTitle",
        content: "testContent",
        author: "jiwei",
        createDate: new Date(),
        updateDate: new Date(),
        visited: 0,
        tags: ["test", "node.js"]
    }, function (n) {
        console.info(n);
    });

    blogCollection.insertBlog({
        title: "testTitle2",
        content: "testContent2",
        author: "jiwei",
        createDate: new Date(),
        updateDate: new Date(),
        visited: 0,
        tags: ["test", "node.js"]
    }, function (n) {
        console.info(n);
    });
}
function testSelect() {
    blogCollection.selectBlogTags(function(docs){
        console.info("blogCollection.selectBlogTags():", docs);

        var countNumber = mapUtil.countNumber(docs, "author", "tags");
        console.info("countNumber:", countNumber);

        var countUnique = mapUtil.countUnique(docs, "author", "tags");
        console.info("countUnique:", countUnique);
    });

    //blogCollection.selectBlogByAuthor('jiwei', function (docs) {
    //    console.info("Query Result: ", docs);
    //});

    //blogCollection.selectBlogById('55059c88c2391f0833b6e0b8', function (docs) {
    //    console.info("Query Result: ", docs);
    //});
}
function testUpdate() {
    blogCollection.updateBlogById("550593d6ded4e0202d2a3968", {author: 'yunjiali'}, function (n) {

    });
}
function testRemove() {
    blogCollection.removeBlogByTitle("testTitle", function (n) {

    });
}
function callback() {

    //testInsert();
    testSelect();
    //testRemove();
    //testUpdate();
}

var db = mongo.conn(url, port, dbName, user, password, callback);
blogCollection.initModel(db);
