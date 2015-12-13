/**
 * Created by Hunter on 3/29/2015.
 */
var url = require('url');

/*
  Test parse()
  - URL string -> Parameters
  - partial of the url will be parsed too
 */
var result = url.parse('http://user:pass@olojiang.com:8086/p/a/t/h/page.html?sport=true&dev=true#goon');
console.info("url.parse() 1:", result);

result = url.parse('/p/a/t/h/page.html?sport=true&dev=true#goon');
console.info("url.parse() 2:", result);

/*
  Test format()
  - Parameters -> URL string
 */
var urlString = url.format({ protocol: 'http:',
    slashes: true,
    auth: 'user:pass',
    host: 'olojiang.com:8086',
    port: '8086',
    hostname: 'olojiang.com',
    hash: '#goon',
    search: '?sport=true&dev=true',
    query: 'sport=true&dev=true',
    pathname: '/p/a/t/h/page.html',
    path: '/p/a/t/h/page.html?sport=true&dev=true',
    href: 'http://user:pass@olojiang.com:8086/p/a/t/h/page.html?sport=true&dev=true#goon' });
console.info("urlString:", urlString);

/*
  Test resolve()
  - For the relative path
 */
var resolvedUrl = url.resolve('/p/a/t/h/page.html?sport=true&dev=true#goon', '../../abc/def/newurl.html');
console.info("resolvedUrl:", resolvedUrl);