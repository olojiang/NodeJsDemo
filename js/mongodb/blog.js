/**
 * Created by Hunter on 4/14/2015.
 */
"use strict";

var mongoose = require('mongoose');
var _ = require('underscore');

var blogSchema = new mongoose.Schema({
    title:  {type: String},
    content: {type: String},
    author: {type: String},
    createDate: {type: Date},
    updateDate: {type: Date},
    visit: {type: Number},
    tags: {type: Array},
    privacy: {type: String},
    source: {type: String},
    text: {type: String}
});

var blogModel = null;

/**
 * Initialize blog model with existing db connection
 * @param db
 */
exports.initModel = function(db) {
    blogModel = db.model('blog', blogSchema);
};

/**
 * Insert into blog item
 * @param doc
 * @param callBack
 */
exports.insertBlog = function(doc, callBack) {
    blogModel.create(doc, function(error, number){
        if(error) {
            console.error(error);
            callBack(0);
        } else {
            console.info("Insert result: ", number);
            callBack(number);
        }
    });
};

/**
 * Update Blog
 * @param target
 * @param doc
 * @param callBack
 */
exports.updateBlog = function(target, doc, callBack) {
    blogModel.update(target, doc, function(error, number) {
        if(error) {
            console.error(error);
            callBack(0);
        } else {
            console.info("update Result: ", number);

            callBack(number);
        }
    });
};

/**
 * Select Blogs by a single author
 * @param author
 * @param tag
 * @param sort
 * @param direction
 * @param start
 * @param countPerPage
 * @param loginPassed
 * @param callBack
 */
exports.selectBlogByAuthor = function(author, tag, sort, direction, start, countPerPage, loginPassed, callBack) {
    var where = {author: author};

    if(tag ){
        _.extend(where, {tags: tag});
    }
    if(!loginPassed){
        _.extend(where, {privacy: 'public'});
    }

    var sortMap = {
        update: 'updateDate',
        create: 'createDate',
        access: 'visit',
        title: 'title'
    };
    var sortField = sortMap[sort];
    var sortObject = {};
    sortObject[sortField]=direction;
    
    //console.info("sortObject=%j", sortObject);

    var find = blogModel.find(where);    // Where
    find.sort(sortObject)           // Sort
        .skip(start-1);             // Skip

    if(countPerPage) {
        find.limit(countPerPage);    // Limit
    }

    find.exec(function(error, docs){
            if(error) {
                console.error(error);
                callBack(0);
            } else {
                callBack(docs);
            }
        });
};

/**
 * Select blog statistics by author
 * @param author
 * @param callBack
 */
exports.selectStatByAuthor = function(author, callBack) {
    var where = {author: author};
    var columns = 'privacy source';

    var find = blogModel.find(where, columns);    // Where

    find.exec(function(error, docs){
        if(error) {
            console.error(error);
            callBack(0);
        } else {
            callBack(docs);
        }
    });
};

/**
 * Select
 * @param callBack
 */
exports.selectBlogTags = function(callBack) {
    blogModel.find({}, "tags author")    //select some items
        .exec(function(error, docs){
            if(error) {
                console.error(error);
                callBack(0);
            } else {
                callBack(docs);
            }
        });
};

/**
 * Select single blog by ID
 * @param id
 * @param callBack
 */
exports.selectBlogById = function(id, callBack) {
    blogModel.findOne({_id: id}, function(error, docs){
        if(error) {
            console.error(error);
            callBack(0);
        } else {
            callBack(docs);
        }
    });
};

/**
 * Count blog by author, tag, login status
 * @param author
 * @param tag
 * @param loginPassed
 * @param callBack
 */
exports.countBlogByAuthor = function(author, tag, loginPassed, callBack) {
    var where = {author: author};

    if( tag ) {
        _.extend(where, {tags: tag});
    }
    if( !loginPassed ) {
        _.extend(where, {privacy: 'public'});
    }

    blogModel.find(where)    // Where
        .count()
        .exec(function(error, count){
            if(error) {
                console.error(error);
                callBack(0);
            } else {
                callBack(count);
            }
        });
};

/**
 * Remove Blog by Title
 * @param title
 * @param callBack
 */
exports.removeBlogByTitle = function(title, callBack) {
    blogModel.remove({title: title}, function(error, number) {
        if(error) {
            console.error(error);
            callBack(0);
        } else {
            console.info("Removed Result: ", number);
            callBack(number);
        }
    });
};

/**
 * Remove blog by ID
 * @param id
 * @param callBack
 */
exports.removeBlogById = function(id, callBack) {
    blogModel.remove({_id: id}, function(error, number) {
        if(error) {
            console.error(error);
            callBack(0);
        } else {
            console.info("Removed Result: ", number);

            callBack(number);
        }
    });
};