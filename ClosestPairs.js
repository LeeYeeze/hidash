/**
 * Created by yizeli on 4/11/15.
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

function closestPairs(pairArray) {
    if (!Array.isArray(pairArray) || pairArray.length < 2) {
        return;
    }
    pairArray.sort(function (a ,b) {
        a.x - b.x;
    });
    return helper(pairArray, 0, pairArray.length - 1);

}

function helper(pairArray, left, right) {
    if (left == right) {
        return null;
    }
    if (left + 1 == right) {
        return {one: pairArray[left], two: pairArray[right], distance: distance(pairArray[left], pairArray[right])};
    }
    // divide the plane by half
    var mid = left + Math.floor((right-left)/2);
    var odd = (right - left + 1) %2 == 1;
    var xDivide = (pairArray[mid].x + (odd?pairArray[mid].x:pairArray[mid+1].x))/2;
    // closest pairs from left half
    var pair1 = helper(pairArray, left , mid);
    // closest pairs from right half
    var pair2 = helper(pairArray, mid+1, right);
    // the closer distance of the two pairs
    var min = Math.min(pair1 == null ? pair2.distance:pair1.distance, pair2 == null ? pair1.distance:pair2.distance);
    // window containing points within min to the x median
    var window = [];
    for (var i = left; i <= right; i++) {
        if ((pairArray[i].x-xDivide)*(pairArray[i].x-xDivide) <= min) {
            window.push(pairArray[i]);
        }
    }
    // Sort the points in the window by y-coordinate
    window.sort(function (a,b) {
        a.y - b.y;
    });

    var res = null;
    for (var i = 0; i < window.length; i++) {
        for (var j = 1; j < 16 && i+j < window.length; j++) {
            var d = distance(window[i],window[i+j]);
            if (d< min) {
                if (res == null) {
                    res = {one: window[i], two: window[i+j], distance:d};
                } else if (d < res.distance) {
                    res = {one: window[i], two: window[i+j], distance:d};
                }
            }
        }
    }

    if (res === null) {
        if (pair1 !== null && pair1.distance == min) {
            return pair1;
        } else {
            return pair2;
        }
    }

    return res;

}

function distance(p1,p2) {
    return (p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y);

}

var arr= [new Point(1,1),new Point(1,2),new Point(1,3), new Point(1,0.8)];

console.log(closestPairs(arr));