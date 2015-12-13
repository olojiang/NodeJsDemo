/**
 * Created by Hunter on 3/26/2015.
 */

/**
 Replace the exports object
 - use module.exports = {}
 */

module.exports = {
    go: "go",
    to: "to",
    school: "school",
    say: function(){
        console.info(this.go, this.to, this.school);
    }
};