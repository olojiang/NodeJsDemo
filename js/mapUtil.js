/**
 * Created by Hunter on 3/28/2015.
 */
"use strict";

var _ = require('underscore');

exports.countNumber = function(list, firstField, secondField){

    var mapNumber = _.reduce(list, function(memo, item){
        var firstKey = item[firstField];
        var obj = _.extend({}, memo);

        var itemNumberMap = memo[firstKey]||{};
        var itemArray = item[secondField];

        var itemMap = _.reduce(itemArray, function(m, item2){
            var obj = _.extend({}, m);

            var number = obj[item2]||0;
            obj[item2] = number+1;

            return obj;
        }, {});

        _.each(itemMap, function(num, key) {
            var vl = itemNumberMap[key]||0;
            itemNumberMap[key] = vl + num;
        });

        obj[firstKey] = itemNumberMap;

        return obj;
    }, {});

    return mapNumber;
};

exports.countUnique = function(list, firstField, secondField){
    // Find the second field(Array) for each item
    var map = _.reduce(list, function(memo, item){
        var val = item[firstField];
        var obj = _.extend({}, memo);
        var itemArray = item[secondField];
        obj[val] = _.union(memo[val], itemArray);

        return obj;
    }, {});

    return map;
};