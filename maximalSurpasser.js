/**
 * Created by yizeli on 4/8/15.
 */
function mergeHelper(arr, left, right, map, indexArr) {
    if (left >= right) {
        return;
    }
    var mid = left + Math.floor((right-left)/2);
    mergeHelper(arr, left, mid, map, indexArr);
    mergeHelper(arr, mid+1, right, map, indexArr);
    var buffer = [];
    var idx1 = left;
    var idx2 = mid + 1;

    while (idx1 <= mid && idx2 <= right) {
        if (arr[indexArr[idx1]] < arr[indexArr[idx2]]) {
            buffer.push(indexArr[idx1]);
            if (!map.hasOwnProperty(indexArr[idx1])) {
                map[indexArr[idx1]] = right - idx2 + 1;
            } else {
                map[indexArr[idx1]] += right - idx2 + 1;
            }
            idx1++;
        } else {
            buffer.push(indexArr[idx2++]);
        }
    }

    while (idx1 <= mid) {
        buffer.push(indexArr[idx1++]);
    }
    while (idx2 <= right) {
        buffer.push(indexArr[idx2++]);
    }

    for (var i = left; i <= right; i++) {
        indexArr[i] = buffer[i-left];
    }
}

function maximalSurpasserCount(arr) {
    if (!Array.isArray(arr) || arr.length ==0) {
        return 0;
    }
    var indexArr = [];
    for (var i = 0; i < arr.length; i++) {
        indexArr[i] = i;
    }
    var left = 0;
    var right = indexArr.length - 1;
    var map = {};
    mergeHelper(arr, left, right, map, indexArr);
    var max = 0;

    console.log(map);

    for (var i = 0; i < indexArr.length; i++) {
        max = Math.max(max, map[indexArr[i]] || 0);
    }
    return max;
}

console.log(maximalSurpasserCount([1,2,3,4,5,6,6,6,6,6,6,6,6,6,6,6,6]));