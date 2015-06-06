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

function generateRMQMatrix(arr, start, blockSize) {
    var resMin = [];
    var resMax = [];
    for (var i = start; i < start + blockSize; i++) {
        resMin[i-start] = [];
        resMax[i-start] = [];
        resMin[i-start][i-start] = i - start;
        resMax[i-start][i-start] = i - start;
        for (var j = i+1; j < start + blockSize; j++) {
            if (j >= arr.length) {
                resMin[i-start][j-start] = resMin[i-start][j-start-1];
                resMax[i-start][j-start] = resMax[i-start][j-start-1];
            } else if (arr[j] < arr[resMin[i-start][j-start-1]]){
                resMin[i-start][j-start] = j -start;
                resMax[i-start][j-start] = resMax[i-start][j-start-1];
            } else if (arr[j] > arr[resMax[i-start][j-start-1]]) {
                resMin[i-start][j-start] = resMin[i-start][j-start-1];
                resMax[i-start][j-start] = j-start;
            } else {
                resMin[i-start][j-start] = resMin[i-start][j-start-1];
                resMax[i-start][j-start] = resMax[i-start][j-start-1];
            }
        }
    }
    return {Min: resMin, Max: resMax};
}

function cartesianTree(arr) {

}

function RestrictedRMQ (arr) {
    this.arr = arr;
    this.arrLen = arr.length;
    this.degenerate = false;
    this.patterns = [];
    this.patternMap = [];
    this.blockSize;
    if (arr.length >= 16) {
        var blockSize = Math.floor(Math.log(arr.length)/2);
        this.blockSize = blockSize;
        var A1 = [];
        var A2 = [];

        for (var i = 0; i < arr.length; i+= blockSize) {
            var min = arr[i];
            var max = arr[i];
            var bitIndex = 0;
            for (var j = 1; j < blockSize; j++) {
                min = Math.min(min, i+j < arr.length ? arr[i+j] : min);
                max = Math.max(max, i+j < arr.length ? arr[i+j] : max);
                if (i+j >= arr.length) {
                    bitIndex *= 2;
                } else if (arr[i+j] >  arr[i+j-1]) {
                    bitIndex *= 2;
                    bitIndex++;
                } else {
                    bitIndex *= 2;
                }
            }
            if (typeof this.patterns[bitIndex] !== "undefined") {
                this.patternMap[i] = this.patterns[bitIndex];
            } else {
                var pattern = generateRMQMatrix(arr, i, blockSize);
                this.patternMap[i]  = pattern;
                this.patterns[bitIndex] = pattern;
            }
            A1[i] = min;
            A2[i] = max;
        }

        this.blockRmq1 = new RMQ(A1);
        this.blockRmq2 = new RMQ(A2);
    } else {
        this.degenerate = true;
        this.rmq = new RMQ(this.arr);

    }


}

RestrictedRMQ.prototype.getMin = function (l,r) {
    if (this.degenerate) {
        return this.rmq.getMin(l,r);
    } else {
        var preSection = Math.floor(l/this.blockSize);
        var startBlock = Math.ceil(l/this.blockSize);
        var postSection = Math.floor(r/this.blockSize);
        var endBlock = (postSection+1) * this.blockSize - 1 == r ? postSection : postSection-1;
        var min = null;
        var min1 = endBlock >= startBlock?this.blockRmq1.getMin(startBlock, endBlock):null;
        min = min1;
        var min2, min3;
        if (preSection != startBlock) {
            min2 = this.arr[this.patternMap[preSection].Min[l%this.blockSize][this.blockSize-1] + (l- (l%this.blockSize))];
            min = min == null ? min2: Math.min(min, min2);
        }

        if (postSection != endBlock) {
            min3 = this.arr[this.patternMap[postSection].Min[0][r%this.blockSize] + (r - (r % this.blockSize))];
            min = min == null ? min3:Math.min(min, min3);
        }
        return min;

    }
};

RestrictedRMQ.prototype.getMax = function (l,r) {
    if (this.degenerate) {
        return this.rmq.getMax(l, r);
    } else {

    }
};


var r = new RMQ([1,2,3,4,5,6,7,8,9]);
console.log(r.maxMatrix);
console.log(r.getMin(3,6));
console.log(generateRMQMatrix([1,2,3,4,5,6,7,8,9],3,3));
var rmq = new RestrictedRMQ([1,2,3,4,-3,6,7,8,9,10,11,11,13,14,15,16,3]);
console.log(rmq.getMin(1,16));

