/**
 * Created by yizeli on 6/21/15.
 */
var query = function () {
    return new query.prototype.init();
};

query.prototype = {
    constructor: query,
    init: function () {
        //console.log(this);
        //return this;
    },
    map: function () {
        console.log("hahaha");
    }
};




query.prototype.init.prototype = query.prototype;

//console.log(query.prototype.init());
//console.log((new query()))
console.log(query());
console.log(query() === query.prototype.init());
(new query()).map();
var d = query();
console.log(d.init() === query);
console.log(query() === query());
