/**
 * Created by yizeli on 3/10/15.
 */
function fillArray(arr, size, val) {
    for (var i = 0; i < size; i++) {
        arr[i] = val;
    }
}

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

function treePruning(tree, N, K) {

}

