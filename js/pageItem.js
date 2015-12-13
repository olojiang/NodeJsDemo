/**
 * Created by Hunter on 4/26/2015.
 */
"use strict";

var arrayutil = require('./arrayUtil.js');

var files = {
    baseDir: "public/", // path related to calling JS
    jquery: {
        js: "js/vendor/jquery-1.11.1.js"
    },
    bootstrap: {
        js: "js/vendor/bootstrap.js",
        css: "css/vendor/bootstrap.css"
    },
    underscore: {
        js: "js/vendor/underscore.js"
    },
    moment: {
        js: "js/vendor/moment.min.js"
    },
    jqueryUi: {
        js: "js/vendor/jquery-ui.js",
        css: ["css/vendor/jquery-ui.css", "css/vendor/jquery-ui.theme.css"]
    },
    message: {
        js: ["js/vendor/jquery.noty.js", "js/bigknow/bigknow.noty.message.js", "js/vendor/jquery.bpopup.min.js", "js/bigknow/bigknow.mask.message.js"],
        css: ["css/vendor/jquery.noty.css", "css/vendor/noty_theme_default.css"]
    },
    inputDialog: {
        js: "js/bigknow/bigknow.input.dialog.js",
        css: "css/bigknow/bigknow.input.dialog.css"
    },
    syntax: {
        js: ["js/vendor/syntaxHighlight/shCore.js", "js/vendor/syntaxHighlight/shBrushJScript.js", "js/vendor/syntaxHighlight/shBrushJava.js",
            "js/vendor/syntaxHighlight/shBrushCss.js", "js/vendor/syntaxHighlight/shBrushBash.js", "js/vendor/syntaxHighlight/shBrushPerl.js",
            "js/vendor/syntaxHighlight/shBrushSql.js", "js/vendor/syntaxHighlight/shBrushXml.js", "js/vendor/syntaxHighlight/shBrushPlain.js"],
        css: ["css/vendor/syntaxHighlight/shCore.css", "css/vendor/syntaxHighlight/shThemeFadeToGrey.css"]
    },
    animate: {
        css: "css/vendor/animate.css"
    },
    hitch: {
        js: "js/bigknow/jquery.hitch.js"
    },
    ajax: {
        js: "js/bigknow/bigknow.ajax.js"
    },
    select: {
        js: "js/bigknow/bigknow.select.js"
    },
    upload: {
        js: "js/bigknow/bigknow.upload.js"
    },
    validate: {
        js: "js/bigknow/bigknow.validate.js"
    },
    date: {
        js: "js/bigknow/bigknow.date.util.js"
    },
    util: {
        js: ["js/bigknow/bigknow.string.util.js"]
    },
    paging: {
        js: "js/bigknow/bigknow.paging.js",
        css: "css/bigknow/bigknow.paging.css"
    },
    arctext: {
        js: "js/vendor/jquery.arctext.js"
    },
    shareMedia: {
        js: ["js/bigknow/bigknow.share.js"],
        css: ["css/bigknow/bigknow.share.css"]
    },
    tagsinput: {
        js: ["js/vendor/bootstrap-tagsinput.min.js", "js/bigknow/bigknow.tags.input.js"],
        css: ["css/vendor/bootstrap-tagsinput.css", "css/bigknow/bigknow.tags.input.css"]
    },
    typeahead: {
        js: ["js/vendor/bootstrap3-typeahead.min.js"]
    },
    locale: {
        js: ["js/bigknow/bigknow.locale.js"]
    },
    react: {
        js: ["js/vendor/react-with-addons.min.js"]
    },
    tinymce: {
        js: ['js/vendor/tinymce/jquery.tinymce.min.js', 'js/vendor/tinymce/tinymce.min.js']
    },
    commonPage: {
        js: ["js/user.js", "js/common.js", "js/tags.js"],
        css: ["css/common.css"]
    },
    listPage: {
        js: ["js/jsx_dist/list.js", "js/list.js"],
        css: ["css/list.css"]
    },
    detailPage: {
        js: ["js/detail.js"],
        css: ["css/detail.css"]
    },
    newPage: {
        js: ["js/new.js"],
        css: ["css/new.css"]
    },
    indexPage: {
        js: ["js/index.js"],
        css: ["css/index.css"]
    },
    resumePage: {
        js: ["js/resume.js"],
        css: ["css/resume.css"]
    }
};

var indexPageDependent = ['jquery', 'bootstrap', 'animate', 'arctext', 'indexPage'];
var listPageDependent = ['jquery', 'bootstrap', 'underscore', 'moment', 'jqueryUi', 'message', 'inputDialog',
    'hitch', 'ajax', 'syntax', 'animate', 'date', 'paging', 'arctext', 'util', 'react', 'commonPage', 'listPage'];
var detailPageDependent = ['jquery', 'bootstrap', 'underscore', 'jqueryUi', 'message', 'inputDialog',
    'hitch', 'ajax', 'syntax', 'animate', 'arctext', 'shareMedia', 'commonPage', 'detailPage'];
var newPageDependent = ['jquery', 'bootstrap', 'underscore', 'jqueryUi', 'message',
    'tagsinput', 'typeahead', 'inputDialog', 'hitch', 'ajax', 'upload', 'select', 'validate',
    'animate', 'arctext', 'tinymce', 'commonPage', 'newPage'];

var resumePageDependent = ['jquery', 'bootstrap', 'underscore', 'animate', 'arctext', 'ajax', 'hitch', 'message', 'resumePage', 'locale'];

//exports.indexPageItem = arrayutil.reduceOnePage(files, indexPageDependent);
//exports.resumePageItem = arrayutil.reduceOnePage(files, resumePageDependent);
//exports.listPageItem = arrayutil.reduceOnePage(files, listPageDependent);
//exports.detailPageItem = arrayutil.reduceOnePage(files, detailPageDependent);
//exports.newPageItem = arrayutil.reduceOnePage(files, newPageDependent);

exports.items = {index: arrayutil.reduceOnePage(files, indexPageDependent),
    resume: arrayutil.reduceOnePage(files, resumePageDependent),
    list: arrayutil.reduceOnePage(files, listPageDependent),
    detail: arrayutil.reduceOnePage(files, detailPageDependent),
    new: arrayutil.reduceOnePage(files, newPageDependent)};