/**
 * Created by yizeli on 3/10/15.
 */
var fs = require("fs");
Array.matrix = function(numrows, numcols, initial){
    var arr = [];
    for (var i = 0; i < numrows; ++i){
        var columns = [];
        for (var j = 0; j < numcols; ++j){
            columns[j] = initial;
        }
        arr[i] = columns;
    }
    return arr;
};

function fillArray(arr, size, val) {
    for (var i = 0; i < size; i++) {
        arr[i] = val;
    }
}
/*
function binarySearch (array, target, start, end) {
    var l = start || 0;
    var r = end || array.length - 1;
    while (l<=r) {
        var mid = Math.floor((l+r)/2);
        if (array[mid]==target) {
            return mid;
        } else if (array[mid]>target) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return r;
}
*/

function binarySearch (array, target, start, end) {
    var l = start || 0;
    var r = end || array.length - 1;
    while (l<=r) {
        var mid = Math.floor((l+r)/2);
        if (array[mid]>target) {
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    return r;
}

function weightedIntervalScheduling(taskArray) {
    taskArray.sort(function (a,b) {
        return a.end - b.end ==0 ? a.start - b.start: a.end - b.end;
    });
    //console.log(taskArray);
    var endArray = taskArray.map(function (obj) {
        return obj.end;
    });
    //console.log(endArray);
    var pArray = [-1];
    for (var i = 1; i<taskArray.length; i++) {
        var idx = binarySearch(endArray,taskArray[i].start,0,i-1);
        pArray[i] = idx;
    }
    //console.log(pArray);
    var res = [];
    res[0] = taskArray[0].weight;
    for (var i= 1; i<taskArray.length; i++) {
        if (pArray[i]>-1) {
            res[i] = res[pArray[i]]+taskArray[i].weight;
        } else {
            res[i] = taskArray[i].weight;
        }
        res[i] = Math.max(res[i], res[i-1]);
    }
    return res[res.length-1];
}

function weightedIntervalSchedulingWithNumberConstrain(taskArray, limit) {
    taskArray.sort(function (a,b) {
        return a.end - b.end ==0 ? a.start - b.start: a.end - b.end;
    });
    var endArray = taskArray.map(function (obj) {
        return obj.end;
    });
    var pArray = [-1];
    for (var i = 1; i<taskArray.length; i++) {
        var idx = binarySearch(endArray,taskArray[i].start,0,i-1);
        pArray[i] = idx;
    }
    var res = [];
    res[0] = [];
    fillArray(res[0],taskArray.length, 0);

    for (var i= 1; i<=limit; i++) {
        res[i] = [];
        fillArray(res[i], taskArray.length, 0);
        res[i][0] = taskArray[0].weight;
        for (var j = 1; j < taskArray.length; j++) {
            if (pArray[j]>-1) {
                res[i][j] = res[i-1][pArray[j]]+taskArray[j].weight;
            } else {
                res[i][j] = taskArray[j].weight;
            }
            res[i][j] = Math.max(res[i][j], res[i][j-1]);
        }

    }
    return res[limit][taskArray.length-1];
}


console.log(weightedIntervalScheduling([{start:0, end:5, weight:2},{start:1, end:2, weight:1},{start:2,end:3,weight:1},{start:3, end:4, weight:1}]));
console.log(weightedIntervalSchedulingWithNumberConstrain([{start:0, end:5, weight:2},{start:1, end:2, weight:1},{start:2,end:3,weight:1},{start:3, end:4, weight:1}],3));



function IntervalScheduling() {


}

function processData(input) {
    //Enter your code here
    var inputArray = input.split("\n");
    var params = inputArray[0].split(" ").map(Number);
    var N = params[0];
    var K = params[1];
    var weights = inputArray[1].split(" ").map(Number);
    var sum = 0;
    for (var i = 0; i < N; i++) {
        sum += weights[i];
    }
    //console.log(weights);
    var tree = {};
    var res = 0;
    for (var i = 2; i<2+N-1; i++) {
        var edge = inputArray[i].split(" ").map(Number);
        if (tree.hasOwnProperty(edge[0]))
            tree[edge[0]].push(edge[1]);
        else {
            var children = [];
            children[0] = edge[1];
            tree[edge[0]] = children;
        }
        if (tree.hasOwnProperty(edge[1])) {
            tree[edge[1]].push(edge[0]);
        } else {
            var children = [];
            children[0] = edge[0];
            tree[edge[1]] = children;
        }
    }
    //console.log("hi");
    //console.log(tree);
    console.log(treePruning(tree, N, K, sum, weights));
}


function treePruning(tree, N, K, sum, weights) {
    var A = [];
    var W = [];
    var S = [];
    //var visited = {};
    fillArray(A,N,0);
    fillArray(W,N,0);
    fillArray(S,N,0);
    dfsTraversal(1, A, W, S, 0, weights, tree, [0]);
    var res = Array.matrix(K+1,N,0);
    //fillArray(res[0],N,0);
    for (var i = 1; i <= K; i++) {
        //res[i] =[];
        //fillArray(res[i],N,0);
        for (var j = N -1; j>=0; j--) {
            if (W[j]<0) {
                if (j+S[j]>=N) {
                    res[i][j] = W[j];
                } else {
                    res[i][j] = W[j]+res[i-1][j+S[j]];
                }
            } else {
                res[i][j] = j==N-1?0:res[i][j+1];
            }
            res[i][j] = Math.min(res[i][j],j==N-1?0:res[i][j+1]);
        }
    }
    console.log(res[K]);
    return sum-res[K][0];

}

function treePruning2(tree, N, K, sum, weights) {
    var A = [];
    var W = [];
    var S = [];
    //var visited = {};
    fillArray(A,N,0);
    fillArray(W,N,0);
    fillArray(S,N,0);
    dfsTraversal(1, A, W, S, 0, weights, tree, [0]);
    var res = Array.matrix(1,N,0)[0];
    var back = Array.matrix(1,N,0)[0];
    //fillArray(res[0],N,0);
    for (var i = 1; i <= K; i++) {
        //res[i] =[];
        //fillArray(res[i],N,0);
        for (var j = N -1; j>=0; j--) {
            if (W[j]<0) {
                if (j+S[j]>=N) {
                    res[j] = W[j];
                } else {
                    res[j] = W[j]+back[j+S[j]];
                }
            } else {
                res[j] = j==N-1?0:res[j+1];
            }
            res[j] = Math.min(res[j],j==N-1?0:res[j+1]);
        }
        var old = back;
        back = res;

        res = old;
    }
    console.log(back);
    return sum-back[0];

}

function dfsTraversal (node, A, W, S, visited, weights, tree, idx) {
    //visited[node] = true;
    var index = idx[0]++;
    A[index] = node;
    var len = 1;
    var totalWeight = weights[node - 1];
    for (var i = 0; i < tree[node].length; i++) {
        if (tree[node][i]==visited)
            continue;
        var info = dfsTraversal(tree[node][i], A, W, S, node, weights, tree, idx);
        len += info.len;
        totalWeight += info.subtreeWeight;
    }
    W[index] = totalWeight;
    S[index] = len;
    return {len: len, subtreeWeight: totalWeight};
}

var input = "5 2\n1 1 -1 -1 -1\n1 2\n2 3\n4 1\n4 5\n";
fs.readFile('input09.txt',"utf8",function(err, data){
   if (err)
        return;
    processData(data);
});
//processData(input);





