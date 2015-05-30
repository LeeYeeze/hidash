/**
 * Created by yizeli on 5/27/15.
 */
function RMQ (arr) {
    var j = 0;
    var k = 1;
    while (k <= arr.length) {
        j++;
        k*=2;
    }
    var k = 1;
    this.minMatrix = [];
    this.maxMatrix = [];
    this.minMatrix[0] = arr;
    this.maxMatrix[0] = arr;
    for (var i = 1; i <= j; i++) {
        this.minMatrix[i] = [];
        this.maxMatrix[i] = [];
        for (var m = 0; m < arr.length; m++) {
            this.minMatrix[i][m] = Math.min(this.minMatrix[i-1][m], m+k < arr.length ? this.minMatrix[i-1][m+k] : this.minMatrix[i-1][m]);
            this.maxMatrix[i][m] = Math.max(this.maxMatrix[i-1][m], m+k < arr.length ? this.maxMatrix[i-1][m+k] : this.maxMatrix[i-1][m]);
        }
        k*=2;
    }
}

RMQ.prototype.getMin = function(l, r){
    var range = Math.floor(Math.log(r-l+1));
    var realRange = Math.pow(2, range);
    var part1 = this.minMatrix[range][l];
    var part2 = this.minMatrix[range][r - realRange + 1];
    return Math.min(part1, part2);
};

RMQ.prototype.getMax = function(l, r) {
    var range = Math.floor(Math.log(r-l+1));
    var realRange = Math.pow(2, range);
    console.log(range);
    console.log(realRange);
    console.log("ha");
    var part1 = this.maxMatrix[range][l];
    var part2 = this.maxMatrix[range][r - realRange + 1];
    console.log(part1);
    console.log(part2);
    return Math.max(part1, part2);
};

var r = new RMQ([1,2,3,4,5,6,7,8,9]);
console.log(r.maxMatrix);
console.log(r.getMin(3,6));

