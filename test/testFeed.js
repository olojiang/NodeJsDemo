/**
 * Created by Hunter on 4/17/2015.
 */
var Feed = require('feed');
var feed = new Feed({
    title:        'Ji Wei Feed Title',
    description:  'This is my personal blog feed!',
    link:         'http://example.com/',
    image:        'http://example.com/logo.png',
    copyright:    'Copyright © 2015 Ji Wei. All rights reserved',

    author: {
        name:     'John Doe',
        email:    'john.doe@example.com',
        link:     'https://example.com/john-doe'
    }
});

var articles = [
    {
        title: "title1",
        url: "http://olojiang.com/yunjiali",
        description: "description1",
        date: new Date
    },
    {
        title: "title2",
        url: "http://olojiang.com/jiwei",
        description: "description2",
        date: new Date
    }
];

for(var key in articles) {
    var article = articles[key];
    feed.addItem({
        title:          article.title,
        link:           article.url,
        description:    article.description,
        date:           article.date
    });
}

console.log('rss-2.0', feed.render('rss-2.0'));
console.log('atom-1.0', feed.render('atom-1.0'));