/**
 * Created by Hunter on 3/27/2015.
 */
var path = require('path');

// normalize
var finalPath = path.normalize('777/abc/../eee/../ccc/ddd/../..');
console.info("finalPath:", finalPath);

// join
var joinedPath = path.join('777/235', '../abc', '885/../oiu');
console.info("joinedPath:", joinedPath);

// extname
console.info("path.extname('/abc/def/ggg.txt'):", path.extname('/abc/def/ggg.txt'));

// basename
console.info("path.basename('/abc/def/ggg.txt'):", path.basename('/abc/def/ggg.txt'));
console.info("path.basename('/abc/def/ggg.txt', '.txt'):", path.basename('/abc/def/ggg.txt', '.txt'));

// dirname
console.info("path.dirname('/abc/def/ggg.txt'):", path.dirname('/abc/def/ggg.txt'));