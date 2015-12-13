/**
 * Created by Hunter on 3/26/2015.
 */

// exports is the object, when we use it.

function subtract(a, b) {
    return a - b;
}

exports.text = {
    task: "test exports"
};

exports.add = function(a, b){
    console.info("module info: ", module);
    return a*b;
};

exports.subtract = subtract;

