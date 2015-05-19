/**
 * Created by yizeli on 4/28/15.
 */
var fs = require('fs');

function BITTree(original,flag) {
    this.original = original;

    //this.arr = Array.apply(null, new Array(original.length+1)).map(Number.prototype.valueOf, 0);
    this.arr = [];
    for (var i = 0; i <= original.length; i++) {
        this.arr[i] = 0;
    }
    for (var i = 0; i < this.original.length && flag; i++) {
        this.updateRangeMaximum(i+1,this.original[i]);
    }

}

BITTree.prototype.readRangeSum = function(idx) {
    var sum = 0;
    if (idx >= this.arr.length) {
        idx = this.arr.length-1;
    }
    while (idx > 0) {
        sum += this.arr[idx];
        idx -= (idx & -idx);
    }
    return sum;
};

BITTree.prototype.updateRangeSum = function(idx, val) {
    while (idx < this.arr.length) {
        this.arr[idx] += val;
        idx += (idx & -idx);
    }
};

BITTree.prototype.updateRangeMinimum = function(idx, val) {
    while (idx < this.arr.length) {
        this.arr[idx] = Math.min(val, this.arr[idx]);
        idx += (idx & -idx);
    }
};

BITTree.prototype.readRangeMinimum = function(idx) {

};

BITTree.prototype.readRangeMaximum = function(idx) {
    if (idx == 0) {
        return 0;
    }
    var res = this.original[idx-1];
    while (idx > 0) {
        res = Math.max(this.arr[idx], res);
        idx -= (idx & -idx);
    }
    return res;
};

BITTree.prototype.updateRangeMaximum = function(idx,val) {
    this.original[idx-1] = val;
    while (idx < this.arr.length) {
        this.arr[idx] = Math.max(val, this.arr[idx]);
        idx += (idx & -idx);
    }
};

BITTree.prototype.updateRangeMaximum2 = function(idx,val) {
    this.original[idx-1] = val;
    while (idx < this.arr.length) {
        if (this.arr[idx] === null) {
            this.arr[idx] = val;
        } else {
            this.arr[idx] = Math.max(val, this.arr[idx]);
        }
        idx += (idx & -idx);
    }
};

BITTree.prototype.readRangeMaximum2 = function(idx) {
    if (idx == 0) {
        return 0;
    }
    var res = this.original[idx-1];
    while (idx > 0) {
        if (this.arr[idx] !== null) {
            res = Math.max(this.arr[idx], res);
        }
        idx -= (idx & -idx);
    }
    return res;
};

BITTree.prototype.readRangeProduct = function (idx) {
    var product = 1;
    if (idx >= this.arr.length) {
        idx = this.arr.length-1;
    }
    while (idx > 0) {
        product *= this.arr[idx];
        idx -= (idx & -idx);
    }
    return product;
};

BITTree.prototype.updateRangeProduct = function (idx,val) {
    if (idx < 1) {
        return;
    }
    var pre = this.original[idx-1];
    this.original[idx-1] = val;
    while (idx < this.arr.length) {
        if (pre !== 0) {
            this.arr[idx] /= pre;
        }
        this.arr[idx] *= val;
        idx += (idx & -idx);
    }
};

function RangeProductCalculator (len) {
    this.arr = [];
    for (var i = 0; i < len; i++) {
        this.arr[i] = 1;
    }
    this.productBIT = new BITTree(this.arr.slice(0));
    for (var i = 1; i <= len; i++) {
        this.productBIT.arr[i] = 1;
    }
    this.zeroFlag = [];
    for (var i = 0; i < len; i++) {
        this.zeroFlag[i] = 0;
    }
    this.zeroBIT = new BITTree(this.zeroFlag);
}

RangeProductCalculator.prototype.readRangeProduct = function (idx) {
    if (this.zeroBIT.readRangeSum(idx) > 0) {
        return 0;
    } else {
        return this.productBIT.readRangeProduct(idx);
    }
};

RangeProductCalculator.prototype.readRangeProductFromTo = function (left, right) {
    var zeros = this.zeroBIT.readRangeSum(right) - this.zeroBIT.readRangeSum(left - 1);
    if (zeros > 0) {
        return 0;
    } else {
        return this.productBIT.readRangeProduct(right)/this.productBIT.readRangeProduct(left - 1);
    }
};

RangeProductCalculator.prototype.updateRangeProduct = function (idx, val) {
    if (this.arr[idx-1] == 0) {
        if (val !== 0) {
            this.zeroBIT.updateRangeSum(idx,-1);
            this.productBIT.updateRangeProduct(idx,val);
        }
    } else {
        if (val !== 0) {
            this.productBIT.updateRangeProduct(idx,val);
        } else {
            this.zeroBIT.updateRangeSum(idx,1);
            this.productBIT.updateRangeProduct(idx, 1);
        }
    }
    this.arr[idx-1] = val;
};




function Pair(index, a, w) {
    this.index = index;
    this.a = a;
    this.w = w;
}

function maxSequenceWeighting(a, w) {
    var pairs = [];
    for (var i = 0; i < a.length; i++) {
        pairs[i] = new Pair(i,a[i],w[i]);
    }
    pairs.sort(function (first, second) {
        if (first.a == second.a) {
            return second.index-first.index;
        } else {
            return first.a - second.a;
        }

    });

    var bit = new BITTree(Array.apply(null, new Array(a.length+1)).map(Number.prototype.valueOf,0));
    var ans = 0;
    for (var i = 0; i < pairs.length; i++) {
        var temp = bit.readRangeMaximum(pairs[i].index) + pairs[i].w;
        ans = Math.max(ans, temp);
        bit.updateRangeMaximum(pairs[i].index+1, temp);
    }
    return ans;

}
var bt = new BITTree([1,2,1,2,3,2,3,4,3,5,6,5,1,2,1,6,7,6],true);
console.log(bt);
//bt.updateRangeMaximum(1,8);
console.log(bt);
console.log(bt.readRangeMaximum(6));

console.log(maxSequenceWeighting([1,2,3,3],[10,20,30,30]));

function increasingSubsequences(arr,k) {

    return 0;
}

function indexedNode(index, val) {
    this.index = index;
    this.val = val;
}

function countingInversions(arr){
    if (!Array.isArray(arr) || arr.length == 0) {
        return 0;
    }
    var helperArray = [];
    for (var i = 0; i < arr.length; i++) {
        helperArray[i] = new indexedNode(i,arr[i]);
    }
    helperArray.sort(function (a,b) {
        return b.val- a.val == 0 ? b.index - a.index: b.val- a.val;
    });

    var bit = new BITTree(helperArray);
    var res = 0;
    for (var i = 0; i < helperArray.length; i++) {
        var delta = bit.readRangeSum(helperArray[i].index);
        res += delta;
        bit.updateRangeSum(helperArray[i].index+1,1);
    }
    return res;
}

function largestSurpasserCount(arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
        return 0;
    }
    var left = 0;
    var right = arr.length -1;
    while (left < right) {
        var temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
    var helperArray = [];
    for (var i = 0; i < arr.length; i++) {
        helperArray[i] = new indexedNode(i,arr[i]);
    }
    helperArray.sort(function (a,b) {
        return b.val == a.val ? b.index - a.index: b.val - a.val;
    });
    var bit = new BITTree(arr);
    var ans = 0;
    for (var i = 0; i < helperArray.length; i++) {
        ans = Math.max(ans, bit.readRangeSum(helperArray[i].index));
        bit.updateRangeSum(helperArray[i].index+1,1);
    }
    return ans;
}

function countAlmostSortedInterval(arr) {
    if (!Array.isArray(arr) || arr.length ==0) {
        return 0;
    }
    var left = [];
    var right = [];
    var stack = [];
    left[0] = -1;
    stack[0] = 0;
    for (var i = 1; i < arr.length; i++) {
        while (stack.length > 0 && arr[i] >= arr[stack[stack.length-1]]) {
            stack.pop();
        }
        if (stack.length == 0) {
            left[i] = -1;
        } else {
            left[i] = stack[stack.length-1];
        }
        stack.push(i);
    }
    stack = [];
    right[arr.length-1] = arr.length;
    stack[0] = arr.length -1;
    for (var i = arr.length-2; i>=0; i--) {
        while (stack.length > 0 && arr[i] <= arr[stack[stack.length-1]]) {
            stack.pop();
        }
        if (stack.length == 0) {
            right[i] = arr.length;
        } else {
            right[i] = stack[stack.length-1];
        }
        stack.push(i);
    }
    var bit = new BITTree(arr);
    var res = 0;
    var record = [];
    for (var i = 0; i < arr.length; i++) {
        record[i] = [];
    }
    for (var l = arr.length -1; l >= 0; l--) {
        var rightSmaller = right[l];
        var leftLarger = left[l];
        if (leftLarger >=0) {
            record[leftLarger].push(l);
        }
        bit.updateRangeSum(l+1,1);
        for (var j = 0; j < record[l].length; j++) {
            bit.updateRangeSum(record[l][j]+1, -1);
        }
        res += bit.readRangeSum(rightSmaller);
    }
    return res;
}

function countAlmostSortedInterval2(arr) {
    if (!Array.isArray(arr) || arr.length ==0) {
        return 0;
    }
    var left = [];
    var right = [];
    var stack = [];
    left[0] = -1;
    stack[0] = 0;
    for (var i = 1; i < arr.length; i++) {
        while (stack.length > 0 && arr[i] >= arr[stack[stack.length-1]]) {
            stack.pop();
        }
        if (stack.length == 0) {
            left[i] = -1;
        } else {
            left[i] = stack[stack.length-1];
        }
        stack.push(i);
    }
    stack = [];
    right[arr.length-1] = arr.length;
    stack[0] = arr.length -1;
    for (var i = arr.length-2; i>=0; i--) {
        while (stack.length > 0 && arr[i] <= arr[stack[stack.length-1]]) {
            stack.pop();
        }
        if (stack.length == 0) {
            right[i] = arr.length;
        } else {
            right[i] = stack[stack.length-1];
        }
        stack.push(i);
    }
    var bit = new BITTree(arr);
    var res = 0;
    var record = [];
    for (var i = 0; i < arr.length; i++) {
        record[i] = [];
    }
    for (var l = arr.length -1; l >= 0; l--) {
        var rightSmaller = right[l];
        var leftLarger = left[l];
        if (leftLarger >=0) {
            record[leftLarger].push(l);
        }
        bit.updateRangeSum(l+1,1);
        for (var j = 0; j < record[l].length; j++) {
            bit.updateRangeSum(record[l][j]+1, -1);
        }
        res += bit.readRangeSum(rightSmaller);
    }
    var ans = 0;
    var leftBar = arr.length;
    for (var l = arr.length -1; l >= 0; l--) {
        var rightSmaller = right[l];
        var leftLarger = left[l];
        if (l > leftBar) {

        }
    }
    return res;
}

function largestRectangleInHistogram(arr) {

}

function solveBurgerHappiness(burgers) {
    compressLocation(burgers);
    var bit1 = new BITTree(burgers);
    var bit3 = new BITTree(burgers);
    var N = burgers.length;
    var combine1 = [];
    var combine2 = [];
    for (var i = 0; i < N; i++) {
        combine1[i] = null;
        combine2[i] = null;
    }
    var bit2 = new BITTree(combine1);
    var bit4 = new BITTree(combine2);
    var F = [];
    for (var i = 0; i < burgers.length; i++) {
        bit1.updateRangeSum(burgers[i].location, burgers[i].B);
        var max1 = bit2.readRangeMaximum2();
        var max2 = bit4.readRangeMaximum2();
        F[burgers[i].location] = burgers[i].A - bit1.readRangeSum(burgers[i].location-1) + Math.max(max1, max2);
        F[burgers[i].location] = Math.max(F[burgers[i].location], burgers[i].A);
    }
}

function compressLocation(burgers) {
    var clone = [];
    for (var i = 0 ;  i < burgers.length; i++) {
        clone[i] = burgers[i];
    }
    clone.sort(function (a, b) {
        return a.location - b.location;
    });
    for (var i = 0; i < clone.length; i++) {
        clone[i].location = i;
    }
}


function processData(input) {
    //Enter your code here
    var inputArray = input.split("\n");
    var arr = inputArray[1].split(" ").map(Number);
    console.log(countAlmostSortedInterval(arr));
}

function DQuery(arr) {
    var bit1 = new BITTree(arr);
    var bit2 = new BITTree(arr);
    var map1 = {};
    var map2 = {};

    for (var i = 0; i < arr.length; i++) {

    }

    for (var i = arr.length - 1; i>0; i--) {

    }


}

DQuery.prototype.rangeDistinct = function () {

};



//countAlmostSortedInterval([1,0,3,8,5,6,7,4,9,2]);
//console.log(countingInversions([3,2,1,4,5,6],false));
console.log("======================");
console.log(countAlmostSortedInterval([1,2,3,1]));
console.log(largestSurpasserCount([1,1,1,1,4,5,6,7]));
var pt = new RangeProductCalculator(3);
console.log(pt.readRangeProduct(1));
pt.updateRangeProduct(1,0);
console.log(pt.readRangeProduct(1));
pt.updateRangeProduct(1,2);
console.log(pt.readRangeProduct(1));
pt.updateRangeProduct(2,0);
console.log(pt.readRangeProduct(2));
console.log(pt.readRangeProduct(3));
pt.updateRangeProduct(3,5);
pt.updateRangeProduct(2,3);
pt.updateRangeProduct(3,0);
console.log(pt.readRangeProduct(3));
console.log(pt.readRangeProduct(2));




/*
fs.readFile('input10.txt',"utf8",function(err, data){
    if (err)
        return;
    processData(data);
});
*/



