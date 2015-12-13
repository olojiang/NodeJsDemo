/**
 * Created by Hunter on 3/13/2015.
 */
var entries = [
    {"id": 1, "title":"Title 1", body: "body 1", createDate: "2015/03/13", updateDate: "2015/03/13"},
    {"id": 2, "title":"Title 2", body: "body 2", createDate: "2015/03/13", updateDate: "2015/03/13"},
    {"id": 3, "title":"Title 3", body: "body 3", createDate: "2015/03/13", updateDate: "2015/03/13"},
    {"id": 4, "title":"Title 4", body: "body 4", createDate: "2015/03/13", updateDate: "2015/03/13"},
    {"id": 5, "title":"Title 5", body: "body 5", createDate: "2015/03/13", updateDate: "2015/03/13"}
];

/**
 * Get all entries
 * @returns {{id: number, title: string, body: string, createDate: string, updateDate: string}[]}
 */
exports.getBlogEntries = function() {
    return entries;
};

/**
 * return a single entry
 * @param id
 * @returns {*|{id: number, title: string, body: string, createDate: string, updateDate: string}}
 */
exports.getBlogEntry = function(id) {
    for(var i = 0, len = entries.length; i<len; i++) {
        var item = entries[i];
        if(item.id == id) {
            return item;
        }
    }
};