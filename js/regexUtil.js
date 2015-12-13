/**
 * Created by Hunter on 5/15/2015.
 */
"use strict";

/**
 * Parse picture time and name
 * @param input
 */
exports.parsePicName = function(input){
    var regex = /^(2\d{3})_?(\d{2})_?(\d{2})_?(.*)$/;
    var regex2 = /^(2\d{3})_(\d{2})_?([^_0-9].*)$/;
    var regex4 = /^(2\d{3})(\d{2})(.*)$/;

    var regex3 = /^(\d{2})(\d{2})(\d{2})_?(.*)$/;

    var arr, key, obj;
    arr = regex2.exec(input);
    if(arr) {
        key = (arr[1].length===4?arr[1]:"20"+arr[1])+'_'+arr[2];
        obj = {};
        obj[key] = arr[3];
        return obj;
    } else {

        arr = regex.exec(input);
        //console.info("arr=", arr);

        if(arr) {
            key = (arr[1].length===4?arr[1]:"20"+arr[1])+'_'+arr[2]+'_'+arr[3];
            obj = {};
            obj[key] = arr[4];
            return obj;
        } else {
            arr = regex4.exec(input);
            if(arr) {
                key = arr[1]+'_'+arr[2];
                obj = {};
                obj[key] = arr[3];
                return obj;
            } else {
                arr = regex3.exec(input);
                if(arr) {
                    key = (arr[1].length===4?arr[1]:"20"+arr[1])+'_'+arr[2]+'_'+arr[3];
                    obj = {};
                    obj[key] = arr[4];
                    return obj;
                } else {
                    return '';
                }
            }
        }
    }
};