/**
 * Created by yizeli on 2/24/15.
 */
function binarySearch (array, target) {
    var l = 0;
    var r = array.length - 1;
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
    return l;
}

function lengthOfLIS (arr) {
    var record = [];
    record.push(arr[0]);
    for (var i = 1; i < arr.length; i++) {
        if (arr[i]>record[record.length-1]) {
            record.push(arr[i]);
        } else {
            var index = binarySearch(record, arr[i]);
            record[index] = arr[i];
        }
    }
    return record.length;

}

function getLIS (arr) {
    var res = [];
    if (!Array.isArray(arr) || arr.length === 0) {
        return res;
    }
    var record = [];
    var recordIndices = [];
    var preIndices = [];
    record.push(arr[0]);
    recordIndices.push(0);
    preIndices.push(-1);
    for (var i = 1; i < arr.length; i++) {
        var index = 0;
        if (arr[i]>record[record.length-1])
            index = record.length;
        else if (arr[i]<record[0]) {
            index = 0;
        } else
            index = binarySearch(record, arr[i]);

        record[index] = arr[i];
        recordIndices[index] = i;
        preIndices[index] = index == 0? -1 : recordIndices[index-1];

    }
    var tail = recordIndices[recordIndices.length-1];
    while (tail!=-1) {
        res.push(arr[tail]);
        tail = preIndices[tail];
    }
    return res;

}

function kthOfProductOfPrimes (primeArray, k) {
    var val = 0;
    primeArray.sort(function (a,b) {
       return a - b;
    });
    for (var i =0; i <= k; i++) {

    }
    return val;


}

function LinkedList (val) {
    this.val = val;
    this.next = null;
}

//console.log(lengthOfLIS([1,2,3,4,5,1111111111,1111111111111111,11111111111111111,11111111111111111111,6,7,8]));

function permutation (array) {
    var res = [];
    if (typeof array === "undefined" || array === null || !Array.isArray(array) || array.length === 0) {
        return res;
    }
    array.sort(function (a,b) {
        return a - b;
    });

    var item = [];
    var used = [];
    permutationHelper(array,res,item,used);
    return res;
}

function permutationHelper(array, res, item, used) {
    if (item.length === array.length) {
        var entry = item.slice(0);
        res.push(entry);
    }
    for (var i = 0; i < array.length; i++) {
        if (used[i]!==true && (i=== array.length -1 || array[i] !== array[i+1] || used[i+1]===true)) {
            used[i] = true;
            item.push(array[i]);
            permutationHelper(array, res, item, used);
            used[i] = false;
            item.pop();
        }
    }

}



function makeChanges(amount, moneyArray) {
    moneyArray.sort(function (a,b) {
        return a - b;
    });
    var res = [];
    var row = [];
    for (var i =0; i <= amount; i++) {
        row.push(0);
    }
    row[0] = 1;
    res.push(row);

    for (var i = 0; i < moneyArray.length; i++) {
        row = [1];
        for (var j = 1; j <= amount; j++) {
            row[j] = res[i][j]+ ((j-moneyArray[i])>=0? row[j-moneyArray[i]] : 0);
        }
        res.push(row);
    }
    return res[moneyArray.length][amount];

}

//console.log(permutation([9,1,1,1,1,1,1,2]));

//console.log(makeChanges(7,[1,2,5]));

function checkQueens(row, columnForRow) {
    for (var i = 0; i<row; i++) {
        if (columnForRow[row] == columnForRow[i] || Math.abs(columnForRow[row]-columnForRow[i])==row-i) {
            return false;
        }
    }
    return true;
}

function solveNQueensHelper(n, row, columnForRow, res) {
    if (row === n) {
        var entry = columnForRow.slice(0);
        res.push(entry);
        return;
    }
    for (var i = 0; i < n; i++) {
        columnForRow[row] = i;
        if (checkQueens(row, columnForRow)) {
            solveNQueensHelper(n,row+1,columnForRow,res);
        }
    }
}

function solveNQueens(n) {
    var res = [];
    var columnForRow = [];
    solveNQueensHelper(n, 0, columnForRow, res);
    return res;
}

function isValidBST(root) {
    return isValidBSTHelper(root, null, null);
}

function isValidBSTHelper(root, min, max) {


}

function tallestStack(boxes) {
    if (!Array.isArray(boxes) || boxes.length === 0) {
        return 0;
    }
    boxes.sort(function (a,b) {
        return -(a.h * a.w * a.d - b.h * b.w * b.d);
    });
    var res = [boxes[0].h];
    var global = res[0];
    for (var i = 1; i < boxes.length; i++) {
        res[i] = boxes[i].h;
        for (var j = 0; j < i; j++) {
            if (boxes[i].h<boxes[j].h && boxes[i].w<boxes[j].w && boxes[i].d<boxes[j].d) {
                res[i] = Math.max(res[i], res[j]+boxes[i].h);
            }
        }
        global = Math.max(res[i], global);
    }
    return global;
}

function tallestStackSolution(boxes) {
    var res = [];
    if (!Array.isArray(boxes) || boxes.length === 0)
        return res;
    boxes.sort(function (a,b) {
        return -(a.h * a.w * a.d - b.h * b.w * b.d);
    });
    var res = [[boxes[0]]];
    var maxHeights = [boxes[0].h];
    var global = maxHeights[0];
    var globalIndex = 0;
    for (var i = 1; i < boxes.length; i++) {
        maxHeights[i] = boxes[i].h;
        res[i] = [boxes[i]];
        var pre = i;
        for (var j = 0; j < i; j++) {
            if (boxes[i].h<boxes[j].h && boxes[i].w<boxes[j].w && boxes[i].d<boxes[j].d) {
                //res[i] = Math.max(res[i], res[j]+boxes[i].h);
                if (maxHeights[j]+boxes[i].h>maxHeights[i]) {
                    pre = j;
                    maxHeights[i] = maxHeights[j]+boxes[i].h;
                }
            }
        }
        if (maxHeights[i] > global) {
            global = maxHeights[i];
            globalIndex = i;
        }
        if (pre < i) {
            //console.log(res[pre]);
            for (var k = 0; k < res[pre].length; k++) {
                res[i][k] = res[pre][k];
            }
            res[i].push(boxes[i]);
        }
    }
    return res[globalIndex];

    //boxes

}

//console.log(tallestStack([{w:1,d:999,h:1},{w:2,d:2,h:2},{w:3,d:3,h:3},{w:4,d:4,h:4},{w:4,d:4,h:4}]));
//console.log(tallestStackSolution([{w:1,d:999,h:1},{w:2,d:1000,h:3},{w:3,d:3,h:0},{w:4,d:4,h:0},{w:4,d:4,h:0}]));


//console.log(solveNQueens(5));

function parenthesisEval(exp, result) {
    if (!Array.isArray(exp)||exp.length === 0) {
        return 0;
    }
    var operandsLength = (exp.length + 1)/2;
    var dpForTrue = [];
    var dpForFalse = [];
    var firstDpForTrue = [];
    var firstDpForFalse = [];
    for (var i = 0; i<operandsLength; i++) {
        firstDpForTrue[i] = exp[2*i]==1?1:0;
        firstDpForFalse[i] = exp[2*i]==0?1:0;
    }
    dpForTrue.push(firstDpForTrue);
    dpForFalse.push(firstDpForFalse);
    //console.log(dpForTrue);
    for (var i = 1; i < operandsLength; i++) {
        //console.log(i);
        var currentDpForTrue = [];
        var currentDpForFalse = [];
        for (var j = i; j < operandsLength; j++) {
            currentDpForFalse[j] = 0;
            currentDpForTrue[j] = 0;
            for (var k = 1; k<=i; k++) {
                var ch = exp[2*(j-k)+1];
                if  (ch == '&') {
                    //currentDpForTrue[j]+=dpForTrue[j][k-1]*dpForTrue[j-k][(i-k)];
                    //currentDpForFalse+= dpForTrue[j][k-1]*dpForFalse[j-k][(i-k)]+dpForFalse[j][k-1]*dpForTrue[j-k][(i-k)]+dpForFalse[j][k-1]*dpForFalse[j-k][(i-k)];
                    currentDpForTrue[j]+=dpForTrue[k-1][j]*dpForTrue[i-k][j-k];
                    currentDpForFalse[j]+= dpForTrue[k-1][j]*dpForFalse[i-k][j-k]+dpForFalse[k-1][j]*dpForTrue[i-k][j-k]+dpForFalse[k-1][j]*dpForFalse[i-k][j-k];
                } else if (ch == '|') {
                    //currentDpForTrue[j]+=dpForTrue[j][k-1]*dpForTrue[j-k][(i-k)]+dpForTrue[j][k-1]*dpForFalse[j-k][(i-k)]+dpForFalse[j][k-1]*dpForTrue[j-k][(i-k)];
                    //currentDpForFalse+= dpForFalse[j][k-1]*dpForFalse[j-k][(i-k)];
                    currentDpForTrue[j]+=dpForTrue[k-1][j]*dpForTrue[i-k][j-k]+dpForTrue[k-1][j]*dpForFalse[i-k][j-k]+dpForFalse[k-1][j]*dpForTrue[i-k][j-k];
                    currentDpForFalse[j]+= dpForFalse[k-1][j]*dpForFalse[i-k][j-k];

                } else {
                    //currentDpForTrue[j]+=dpForTrue[j][k-1]*dpForFalse[j-k][(i-k)]+dpForFalse[j][k-1]*dpForTrue[j-k][(i-k)];
                    //currentDpForFalse+= dpForTrue[j][k-1]*dpForTrue[j-k][(i-k)]+dpForFalse[j][k-1]*dpForFalse[j-k][(i-k)];
                    currentDpForTrue[j]+=dpForTrue[k-1][j]*dpForFalse[i-k][j-k]+dpForFalse[k-1][j]*dpForTrue[i-k][j-k];
                    currentDpForFalse[j]+=dpForTrue[k-1][j]*dpForTrue[i-k][j-k]+dpForFalse[k-1][j]*dpForFalse[i-k][j-k];
                }
            }
        }
        dpForFalse.push(currentDpForFalse);
        dpForTrue.push(currentDpForTrue);
    }
    console.log(dpForTrue);
    console.log(dpForFalse);
    return result?dpForTrue[operandsLength-1][operandsLength-1]:dpForFalse[operandsLength-1][operandsLength-1];
}


function getLISOfPairs (seq) {
    seq.sort(function (a,b) {
        if (a.w == b.w)
            return -(a.h- b.h);
        else
            return a.w - b.w;
    });
    var res = [];
    var record = [];
    res.push([seq[0]]);
    record.push(seq[0].h);
    for (var i = 1; i < seq.length; i++) {
        if (seq[i].h>record[record.length-1]) {
            record.push(seq[i].h);
            var list = [];
            for (var j = 0; j < res[res.length-1].length; j++) {
                list[j] = res[res.length-1][j];
            }
            list.push(seq[i]);
            res.push(list);
        } else {
            var index = binarySearch(record,seq[i].h);
            record[index] = seq[i].h;
            if (index ==0)
                res[index] = [seq[i]];
            else {
                res[index] = [];
                for (var k = 0; k < res[index-1].length; k++) {
                    res[index][k] = res[index-1][k];
                }
                res[index].push(seq[i]);
            }
        }
    }
    return res;
}

function getLISOfPairs2(seq) {
    seq.sort(function (a,b) {
        if (a.w == b.w)
            return -(a.h- b.h);
        else
            return a.w - b.w;
    });
    var res = [];
    var record = [];
    var preIndices = [];
    var recordIndex = [];
    record.push(seq[0].h);
    recordIndex.push(0);
    preIndices.push(-1);
    for (var i = 0; i < seq.length; i++) {
        var index = binarySearch(record, seq[i].h);
        record[index] = seq[i].h;
        recordIndex[index] = i;
        preIndices[i] = index == 0 ? -1: recordIndex[index-1];
    }
    var tail = recordIndex[recordIndex.length-1];
    while (tail>=0) {
        res.push(seq[tail]);
        tail = preIndices[tail];
    }
    return res;

}

function getLISOfPairs2(seq) {
    seq.sort(function (a,b) {
        if (a.w == b.w)
            return -(a.h- b.h);
        else
            return a.w - b.w;
    });
    var res = [];
    var record = [];
    var preIndices = [];
    var recordIndex = [];
    record.push(seq[0].h);
    recordIndex.push(0);
    preIndices.push(-1);
    for (var i = 0; i < seq.length; i++) {
        var index = binarySearch(record, seq[i].h);
        record[index] = seq[i].h;
        recordIndex[index] = i;
        preIndices[i] = index == 0 ? -1: recordIndex[index-1];
    }
    var tail = recordIndex[recordIndex.length-1];
    while (tail>=0) {
        res.push(seq[tail]);
        tail = preIndices[tail];
    }
    return res;

}

//console.log(parenthesisEval([0,'&',1,'|',1,'|',1], false));

function getLIS (arr) {
    var res = [];
    if (!Array.isArray(arr) || arr.length === 0) {
        return res;
    }
    var record = [];
    var recordIndices = [];
    var preIndices = [];
    record.push(arr[0]);
    recordIndices.push(0);
    preIndices.push(-1);
    for (var i = 1; i < arr.length; i++) {
        var index = 0;
        if (arr[i]>record[record.length-1])
            index = record.length;
        else if (arr[i]<record[0]) {
            index = 0;
        } else
            index = binarySearch(record, arr[i]);

        record[index] = arr[i];
        recordIndices[index] = i;
        preIndices[i] = index == 0? -1 : recordIndices[index-1];

    }
    console.log(recordIndices);
    console.log(preIndices);
    var tail = recordIndices[recordIndices.length-1];
    while (tail!=-1) {
        res.push(arr[tail]);
        tail = preIndices[tail];
    }
    return res;

}

//console.log(getLISOfPairs([{w:9,h:1},{w:2,h:222},{w:3,h:223},{w:10,h:2},{w:11,h:3},{w:4,h:224},{w:5,h:225}]));
//console.log(getLISOfPairs2([{w:10,h:2},{w:11,h:3},{w:4,h:224},{w:5,h:225},{w:9,h:1},{w:2,h:222},{w:3,h:223}]));
console.log(getLIS([5,4,3,7,8,9]));

function findUnsortedSequence(arr) {
    var leftEnd;
    var rightStart;
    var i = 1;
    for (; i < arr.length; i++) {
        if (arr[i] < arr[i-1]) {
            leftEnd = i -1;
            break;
        }
    }
    if (i == arr.length)
        leftEnd = arr.length -1;
    for (i = arr.length - 2; i >=0; i--) {
        if (arr[i] > arr[i+1])
            rightStart = i+1;
    }
    if (i == -1)
        return 0;
    var minIndex = leftEnd + 1;
    if (minIndex >= arr.length)
        return "Already Sorted";
    var maxIndex = rightStart - 1;

    for (var j = leftEnd; j <= rightStart; j++) {
        if (arr[j] < arr[minIndex]) minIndex = j;
        if (arr[j] > arr[maxIndex]) maxIndex = j;
    }
    var unsortedStart = 0;
    for (i = leftEnd; i >= 0; i--) {
        if (arr[i] <= arr[minIndex]) {
            unsortedStart = i+1;
            break;
        }
    }

    var unsortedEnd = arr.length - 1;
    for (i = rightStart; i<arr.length; i++) {
        if (arr[i] >= arr[maxIndex]) {
            unsortedEnd = i;
            break;
        }
    }

    return {start: unsortedStart, end: unsortedEnd};

}

function inorderTraversal (root) {
    var res = [];
    if (root === null || root === undefined)
        return res;
    var stack = [];
    while ((root!==null && root!==undefined) || stack.length>0) {
        if (root!== null && root!==undefined) {
            stack.push(root);
            root = root.left;
        } else {
            root = stack.pop();
            res.push(root.val);
            root = root.right;
        }
    }
    return res;
}


function sortedListHelper(list, l, r) {
    if (l>r)
        return null;
    var m = Math.floor((l+r+1)/2);
    var left = helper(list, l, m -1);
    var root = {"val":list[0].val};
    console.log("root is "+ root.val)
    root.left = left;
    list[0] = list[0].next;
    root.right = sortedListHelper(list, m+1, r);
    return root;
}

function sortedListToBST(head) {
    if (head===null || head ===undefined)
        return null;
    var cur = head;
    var count = 0;
    while ((cur !== null) && (cur !== undefined)) {
        cur = cur.next;
        count++;
    }
    console.log("count is "+ count)
    var list = [];
    list.push(head);
    return sortedListHelper(list, 0, count-1);
}
