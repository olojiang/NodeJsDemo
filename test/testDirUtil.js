/**
 * Created by Hunter on 3/27/2015.
 */
var dirUtil = require('../js/file/dirUtil');

dirUtil.eachFiles('d:/eclipse/workspace/nodejsdemo', function(item){
    console.info(item);
});