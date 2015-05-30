/**
 * Created by yizeli on 3/23/15.
 */

function bestTimeToBuyAndSellStocks(arr,k) {


}

function editDistance() {

}

function waterTrap() {


}

function largestRectangle() {


}

function getLIS(arr) {

}

function getLCS(A, B) {

}

function twoSum() {

}

function threeSum() {

}

function longestPalindrome() {

}

function isValidBST() {

}

function medianOf2SortedArray() {

}

function validParenthesis() {

}

function removeDuplicatesFromSortedArray() {

}

function wildCardMatching(s, p) {
    var i = 0;
    var j = 0;
    var mark = -1;
    var star = -1;
    while (i < s.length) {
        if (j< p.length && (p.charAt(j)=='.' || p.charAt(j) == s.charAt(i))) {
            i++;
            j++;
        } else if (j < p.length && p.charAt(j) == '*') {
            star = j++;
            mark = i;

        } else if (star!=-1){
            j = star+1;
            i = ++mark;
        } else {
            return;
        }
        while (j< p.length && p.charAt(j) == '*') {
            j++;
        }
        return j == p.length;
    }

}

function mergeSort(arr) {
    if  (!Array.isArray(arr) || arr.length < 2) {
        return;
    }
    mergeSortHelper(arr, 0, arr.length-1,[]);

}

function mergeSortHelper(arr, left, right, helper) {
    if (left>=right) {
        return;
    }
    var mid = Math.floor((left+right)/2);
    mergeSortHelper(arr,left,mid,helper);
    mergeSortHelper(arr,mid+1,right,helper);
    for (var i = left ; i <=right; i++) {
        helper[i] = arr[i];
    }
    var index = left;
    var walker1 = left;
    var walker2 = mid+1;
    while (index<=right) {
        if (walker2>right || (walker1<mid+1 && helper[walker1]<=helper[walker2])) {
            arr[index++] = helper[walker1++];
        } else {
            arr[index++] = helper[walker2++];
        }
    }
}

function sortedArrayToBST(num) {
    if (!Array.isArray(num)) {
        return null;
    }
}

function stockWithTransactionFee(array, fee) {
    var stack = [];
    var candidateStart = [];
    var candidateEnd = [];
    for (var i=0; i<array.length; i++) {
        if (stack.length == 0 || array[i] >= array[i-1]) {
            stack.push(array[i]);
        } else {
            candidateStart.push(stack[0]);
            candidateEnd.push(stack[stack.length-1]);
            stack = [];
        }
    }
    if (stack.length>0) {
        candidateStart.push(stack[0]);
        candidateEnd.push(stack[stack.length-1]);
        stack = [];
    }
    var local = [];
    var bestCombo = -1;
    var bestPrevious = -1;
    var global = 0;
    for (var i =0 ; i < candidateStart.length; i++) {
        if (bestCombo == -1) {
            local[i] = candidateEnd[i]-candidateStart[i]-fee;
            bestCombo = i;
            if (local[i]>0) {
                bestPrevious = i;
            }
        } else {
            var bestSeparate = candidateEnd[i] - candidateStart[i] -fee + (bestPrevious==-1?0:local[bestPrevious]);
            var bestWithCombo = local[bestCombo]-candidateEnd[bestCombo] + candidateEnd[i];
            local[i] = Math.max(bestSeparate, bestWithCombo);
            if (local[i] - candidateEnd[i] > local[bestCombo] - candidateEnd[bestCombo]) {
                bestCombo = i;
            }
            if (local[i] >0 && (bestPrevious == -1 || local[i] > local[bestPrevious])) {
                bestPrevious = i;
            }
        }
        global = Math.max(global, local[i]);
    }
    return global;

}


function commonElementsBetweenTwoSortedArray(arr1,arr2) {
    var res = [];
    if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
        return res;
    }
    var index1 = 0;
    var index2 = 0;
    while (index1 < arr1.length && index2 < arr2.length) {
        if (arr1[index1] == arr2[index2] && (res.length == 0 || res[res.length-1] != arr1[index1])) {
            res.push(arr1[index1]);
            index1++;
            index2++;
        } else if (arr1[index1] < arr2[index2]){
            index1++;
        } else {
            index2++;
        }
    }
    return res;

}

function maxSubArrayWithSingleSwap(arr) {
    if (!Array.isArray(arr)|| arr.length == 0)
        return 0;
    var answer = maxSubArrayWithSingleSwapHelper(arr);
    arr.reverse();
    answer = Math.max(answer, maxSubArrayWithSingleSwapHelper(arr));
    return answer;
}

function maxSubArrayWithSingleSwapHelper(arr) {
    if (!Array.isArray(arr) || arr.length == 0)
        return 0;
    var g = [];
    var f = [];
    g[arr.length-1] = arr[arr.length-1];
    var answer = arr[arr.length-1];
    for (var i = arr.length-2; i >= 0; i--) {
        g[i] = Math.max(g[i+1],0)+arr[i];
        answer = Math.max(answer, g[i]);
    }
    f[0] = arr[0];
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        max = Math.max(max,arr[i]);
        f[i] = Math.max(f[i-1]+arr[i],max);
    }
    for (var i = 1; i < arr.length; i++) {
        answer = Math.max(answer, g[i]-arr[i]+f[i-1]);
    }
    return answer;
}

function maxSubArrayWithSingleAdjacentSwap(arr) {
    if (!Array.isArray(arr) || arr.length ==0) {
        return 0;
    }

}

function makeSequenceAscending(arr) {
    if (!Array.isArray(arr) || arr.length) {
        return 0;
    }
    
}

function BalancedParenthesis(arr) {
    if (!Array.isArray(arr) || arr.length == 0) {
        return {length:0,balanced:""};
    }
    var stack = [];
    var flag = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == '(') {
            stack.push(i);
        }
        else {
            if (stack.length != 0) {
                var index = stack.pop();
                flag[index] = true;
                flag[i] = true;
            }
        }
    }
    var res = [];
    for (var i = 0; i < arr.length; i++) {
        if (flag[i] == true)
            res.push(arr[i]);
    }
    return res;
}

function moveZerosToTail(arr) {
    if (!Array.isArray(arr) || arr.length == 0) {
        return arr;
    }
    var left = 0;
    var right = arr.length -1;
    while (left < right) {
        if (arr[right] == 0) {
            right--;
        } else {
            if (arr[left] == 0) {
                arr[left] = arr[right];
                arr[right] = 0;
                left++;
                right--;
            } else {
                left++;
            }
        }
    }
    return arr;
}

function romanToInteger(s) {
    var map = {};
    map['I'] = 1;
    map['V'] = 5;
    map['X'] = 10;
    map['L'] = 50;
    map['C'] = 100;
    map['D'] = 500;
    map['M'] = 1000;
    var pre = 0;
    var total = 0;
    for (var i = 0; i < s.length; i++) {
        var cur = map[s.charAt(i)];
        total += (cur > pre) ? (cur - 2 * pre):cur;
        pre = cur;
    }
    return total;
}

function integerToRoman() {

}

function manacherPalindrome(s) {

}

function findShortedCover(arr, dict) {

}

function missingRange(arr, start, end) {
    var ranges = [];

}

function largerString(s1,s2) {
    var count1 = [];
    var count2 = [];
    var zFlag1 = true;
    var zFlag2 = true;
    for (var i = 0; i < 10; i++) {
        count1[i] = 0;
        count2[i] = 0;
    }
    for (var i = 0; i < s1.length; i++) {
        var d = Number(s1.charAt(i));
        if (d > 0) {
            zFlag1 = false;
        }
        count1[Number(s1.charAt(i))]++;
    }
    for (var i = 0; i < s2.length; i++) {
        var d = Number(s2.charAt(i));
        if (d > 0) {
            zFlag2 = false;
        }
        count2[Number(s2.charAt(i))]++;
    }
    if (zFlag1) {
        return s1;
    }
    if (zFlag2) {
        return s2;
    }
    if (s1.length > s2.length) {
        return s1;
    }
    if (s2.length > s1.length) {
        return s2;
    }
    for (var i = 9; i>=0; i--) {
        if (count1[i] == count2[i]) {
            continue;
        }
        if (count1[i] > count2[i]) {
            return s1;
        } else {
            return s2;
        }
    }
    for (var i = 0; i < s1.length; i++ ) {
        if (Number(s1.charAt(i))>Number(s2.charAt(i))) {
            return s1;
        }
        if (Number(s1.charAt(i))<Number(s2.charAt(i))) {
            return s2;
        }
    }
    return s1;

}

function shuffleWithConstrain(arr) {
    if (!Array.isArray(arr) || arr.length < 4) {
        throw "Error";
    }
    for (var i = arr.length - 1; i > 3; i--) {
        var random = Math.floor((i+1)*Math.random());
        var temp = arr[i];
        arr[i] = arr[random];
        arr[random] = temp;
    }
    if (arr[3]<arr[2]) {
        var temp = arr[3];
        arr[3] = arr[2];
        arr[2] = temp;
    }
    if (arr[2] > arr[1]) {
        var temp = arr[1];
        arr[1] = arr[2];
        arr[2] = temp;
    }
    if (arr[1] < arr[0]) {
        var temp = arr[1];
        arr[1] = arr[0];
        arr[0] = temp;
    }

}

function arithmeticAvailable(arr, target) {
    if (!Array.isArray(arr) || arr.length == 0) {
        if (target == 0) {
            return true;
        } else {
            return false;
        }
    }
    var res = [];

    for (var i = 0; i < arr.length; i++) {

    }
}

function turnAroundSame(input) {
    if (input < 0) {
        input = - input;
    }
    var base = 1;
    while (input/base>=10) {
        base *= 10;
    }
    var map = {"1":"1","6":"9","0":"0","8":"8","9":"6"};

    while (input > 0) {
        var left = String(Math.floor(input / base));
        var right = String(input % 10);
        if (!map.hasOwnProperty(left)) {
            return false;
        } else if (right !== map[left]){
            return false;
        }
        input = Math.floor((input%base)/10);
        base = base / 100;
    }
    return true;
}

function countTurnAroundSame(n) {
    if (n < 1) {
        return 0;
    }
    if (n == 1) {
        return 3;
    }
    var m = Math.floor((n+1)/2);
    var res = 1;
    for (var i = 1; i < m; i++) {
        res *= 5;
    }
    res *= 4;
    return res;
}

function allTurnAroundSame(n) {
    if (n < 1) {
        return [];
    }
    if (n == 1) {
        return [0,1,8]
    }
}

function general24(arr, target) {
    if (!Array.isArray(arr) || arr.length == 0) {
        if (target == 0) {
            return true;
        } else {
            return false;
        }
    }

}

function generateReversePolishNotation(arr) {
    var flag = arr.map(function (element) {
        return false;
    });
    var operation = ['+','-','*','/'];
    var item = [];
    generateReversePolishNotationHelper(arr, flag, operation, item, 0,0);


}

function generateReversePolishNotationHelper(arr, flag, operation, item, operandLength, operationLength) {
    if (operandLength == arr.length && operationLength == arr.length-1) {
        console.log(item);
        evaluateExpression(item);
    }
    if (operationLength>operationLength) {
        return;
    }
    for (var i = 0; i < arr.length; i++) {
        if (!flag[i]) {
            item.push(arr[i]);
            flag[i] = true;
            generateReversePolishNotationHelper(arr,flag, operation, item, operandLength+1, operationLength);
            flag[i] = false;
            item.pop();
        }
    }
    if (operationLength < operandLength - 1) {
        for (var i = 0; i < operation.length; i++) {
            item.push(operation[i]);
            generateReversePolishNotationHelper(arr,flag,operation,item,operandLength,operationLength+1);
            item.pop();
        }
    }

}

function evaluateExpression(item) {
    //console.log("Under construction");
    var stack = [];
    for (var i = 0; i < item.length; i++) {
        if (item[i] == '+') {
            var val = Number(stack.pop()) + Number(stack.pop());
            stack.push(val);
        } else if (item[i] == '-') {
            var val = stack.pop() - stack.pop();
            stack.push(val);
        } else if (item[i] == '*') {
            var val = stack.pop() * stack.pop();
            stack.push(val);
        } else if (item[i] == '/') {
            var val = stack.pop() / stack.pop();
            stack.push(val)
        } else {
            stack.push(item[i]);
        }
    }
    console.log(stack.pop());
}


function extraParenthesis(s) {
    var stack = [];
    var preStart = -1;
    var preEnd = -1;
    for (var i = 0; i < s.length; i++) {
        if (s.charAt(i) == '(') {
            stack.push(i);
        } else if (s.charAt(i) == ')') {
            var curStart = stack.pop();
            var curEnd = i;
            if (curStart == preStart -1 && curEnd == preEnd +1) {
                return true;
            }
            preStart = curStart;
            preEnd = curEnd;
        }
    }
    return false;
}

function profiling(input) {

}

function unionFind() {

}

function polarNearest() {

}

function findMFWithNTrailingZeros() {

}

function findMinimalCoverWord(arr, dict) {

}



function bestMatch(string, trie) {

}



function findInMatrix(matrix, target) {

}

function isAlmostSorted(arr) {
    if (!Array.isArray(arr) || arr.length == 0) {
        return true;
    }


}

function moveSpaceToHeadRemainOrder(arr) {
    if (arr == null || arr.length == 0) {
        return arr;
    }
    var idx1 = arr.length - 1;
    var idx2 = arr.length - 2;
    while (true) {
        while (idx1>=0 && arr[idx1]!=' ') {
            idx1--;
        }
        if (idx1<0) {
            return arr;
        }
        //idx2 = idx1 -1;
        idx2 = Math.min(idx1-1, idx2);
        while (idx2>=0 && arr[idx2] == ' ') {
            idx2--;
        }
        if (idx2<0) {
            return arr;
        } else {
            arr[idx1] = arr[idx2];
            arr[idx2] = ' ';
        }
        idx1--;
        idx2--;

    }
    return arr;

}

function lastNonZeroDigit(n) {


}



var a = [9,8,7,1,2,3,4,5];
mergeSort(a);
console.log(a);

//console.log(commonElementsBetweenTwoSortedArray([1,2,3,4,5,6,7,8,9],[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]));
//console.log(BalancedParenthesis(['(','(',')']));
//console.log(moveZerosToTail([0,0,0,0,0,0,0,0,0,0,1]));
//console.log(romanToInteger("IV"));
//console.log(turnAroundSame(6));
//console.log(countTurnAroundSame(2));
//console.log(extraParenthesis("1+(2+3)"));
//generateReversePolishNotation([1,2,3,4]);
console.log(moveSpaceToHeadRemainOrder([' ',' ',' ','a','b','c',' ',' ']));

function multiplyStrings(s1, s2) {
    var len1 = s1.length;
    var len2 = s2.length;
    var res = [];
    var tempRes = 0;
    for (var i = len1+len2-1; i >= 0; i--) {

        for (var j = Math.min(i-1, len1-1); j >= 0 && j+s2.length >= i; j--) {
            tempRes += Number(s1.charAt(j)) * Number(s2.charAt(i-j-1));
        }
        res[i] = tempRes % 10;
        tempRes = Math.floor(tempRes/10);
    }

    if (res[0] == 0) {
        res.shift();
    }

    return res.join('');

}

function merge() {
    
}

console.log(multiplyStrings("125","25"));


