/**
 * Created by yizeli on 4/12/15.
 */

// Perfect shuffle with O(n) time complexity and O(1) space
function perfectShuffle(arr) {
    var nextAIndex = 0;
    var nextBIndex = arr.length/2;
    var count = 0;
    var left = 0;
    var right = arr.length/2 - 1;
    while (left<right) {
        var mid = Math.floor((left+right)/2);
        console.log(mid);
        nextAIndex = 2*left;
        var pivot = nextBIndex;
        while (count <= mid) {
            var temp = arr[nextAIndex];
            arr[nextAIndex] = arr[2*count];
            arr[2*count] = temp;
            temp = arr[nextBIndex];
            console.log("swap " + arr[nextAIndex] +" "+ arr[2*count]);
            arr[nextBIndex] = arr[2*count+1];
            arr[2*count+1] = temp;
            console.log("swap " + arr[nextBIndex] +" "+ arr[2*count+1]);
            nextBIndex++;
            nextAIndex = pivot;
            count++;
        }
        console.log(count);
        left = count;
        break;
    }

    return arr;
}

function cycle_replace(arr, from, mod, start) {
    var last = arr[start+from-1];
    for (var i = from * 2 % mod; i != from; i = i*2 %mod) {
        var t = arr[start+i-1];
        arr[start+i-1] = last;
        last = t;
    }
    arr[start+from-1] = last;
}

function reverse(arr, from, to) {
    var t;
    for (;from < to; ++from, --to) {
        t = arr[from];
        arr[from] = arr[to];
        arr[to] = t;
    }
}

function rightRotate(arr, shiftLength, left ,right) {
    reverse(arr, left, right);
    reverse(arr, left, left+shiftLength-1);
    reverse(arr, left+shiftLength, right);
}

function perfect_shuffle(arr, start) {
    var n = arr.length/2 - start;
    var m;
    var k;
    while (n > 1) {
        var n2 = n * 2;
        for (k = 0, m = 1; m * 3 <= n2; k++) {
            m*=3;
        }
        m = (m-1)/2;

        rightRotate(arr, m, start + m, start + n+m-1);
        console.log(arr);
        var t= 1;
        for (var i = 0; i < k; i++){
            cycle_replace(arr, t, m*2+1, start);
            t*=3;
        }

        start += m*2;
        n-=m;
    }

    var t = arr[start];
    arr[start] = arr[start+1];
    arr[start+1] = t;
    return arr;
}


var test1 = [1,3,5,7,9,11,12,2,6,10,14,18,22,24];
var test2 = [1,3,5,7,9,11,2,6,10,14,18,22];
console.log(perfectShuffle(test2));
console.log(perfect_shuffle(test1,0));