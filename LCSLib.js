/**
 * Created by yizeli on 3/23/15.
 */
function longestCommonSubString(A,B) {
    var res = [[0]];
    var max = 0;
    var end = -1;

    for (var i = 1; i <= A.length; i++) {
        res.push([0]);
        for (var j = 1; j <= B.length; j++) {
            if (A[i-1] == B[j-1]) {
                res[i][j] = res[i-1][j-1]+1
            } else {
                res[i][j] = 0;
            }
            if (res[i][j]>max) {
                max = res[i][j];
                end = i;
            }

        }
    }
    return {max:max, end:end};
}

function longestCommonSubStringWithRolling(A,B) {
    var shorter = A.length<= B.length? A:B;
    var longer = A.length<= B.length?B:A;
    var res = [];
    var end = -1;
    var max = 0;
    for (var k = 0; k <= shorter.length; k++) {
        res[k] = 0;
    }
    for (var i = 1; i<=longer.length; i++) {
        for (var j = shorter.length; j >= 1; j--) {
            if (longer[i-1] == shorter[j-1]) {
                res[j] = res[j-1]+1;
            } else {
                res[j] = 0;
            }
            if (res[j]>max) {
                max = res[j];
                end = j;
            }
        }
    }
    return {max:max, sub: shorter.slice(end-max,end)};
}

function longestCommonSubStringWithBinarySearch() {

    
}

function longestCommonSubStringWithSuffixArray() {

}

console.log(longestCommonSubString(['a','b','a','b','c','a','b'],['a','b','c','d']));
console.log(longestCommonSubStringWithRolling(['a','b','a','b','c','a','b'],['a','b','c','d']));