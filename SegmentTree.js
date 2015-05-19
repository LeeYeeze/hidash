/**
 * Created by yizeli on 3/7/15.
 */
'use strict';
;(function(global) {
    function SegmentTreeNode(left, right, reocrd) {
        this.left = left;
        this.right = right;
        this.leftChild = null;
        this.rightChild = null;
        this.cover = false;
        this.record = reocrd;
        this.coveredCount = 0;
    }

    function buildTree(l, r, num, segmentTree, arr) {
        var root = new SegmentTreeNode(l, r);
        if (l+1<r) {
            var mid = Math.floor((l+r)/2);
            root.leftChild = buildTree(l, mid, 2*num, segmentTree, arr);
            root.rightChild = buildTree(mid, r, 2*num+1, segmentTree, arr);
            root.record = root.leftChild.record + root.rightChild.record;
        } else {
            root.record = arr[root.left];
        }
        segmentTree.nodes[num] = root;
        return root;
    }

    function SegmentTree(arr, companionCallback) {
        this.nodes = [];
        this.array = arr;
        this.N = arr.length;
        buildTree(0, this.N, 1, this, this.array);
    }

    SegmentTree.prototype.getValue = function() {

    };

    SegmentTree.prototype.insert = function(l, r, num) {
        if (l+1>r)
            return;
        if (this.nodes[num].left == l && this.nodes[num].right == r) {
            this.nodes[num].cover = true;
            this.nodes[num].coveredCount++;
            return;
        }
        var mid = Math.floor((this.nodes[num].left+this.nodes[num].right)/2);
        if (r <= mid) {
            this.insert(l, r, 2*num);
        } else if (l >= mid) {
            this.insert(l,r, 2*num+1);
        } else {
            this.insert(l, mid, 2*num);
            this.insert(mid, r, 2*num+1);
        }
    };

    SegmentTree.prototype.countCoveredLength = function(root) {
        if (root.cover == true) {
            return root.right - root.left;
        } else if (root.right == root.left+1) {
            return 0;
        }
        return this.countCoveredLength(root.leftChild) + this.countCoveredLength(root.rightChild);
    };

    SegmentTree.prototype.numberOfLinesWithPoint = function(point, root) {
        if (root === null || point<root.left || point >= root.right) {
            return 0;
        } else {
            var next;
            if (point >= Math.floor((root.left+root.right)/2)) {
                next = root.rightChild;
            } else {
                next = root.leftChild;
            }
            return root.coveredCount + this.numberOfLinesWithPoint(point, next);
        }

    };

    SegmentTree.prototype.remove = function() {

    };

    SegmentTree.prototype.getSumUtil = function(start, end, index) {
        if (start <= this.nodes[index].left && end >= this.nodes[index].right)
            return this.nodes[index].record;
        if (start >= this.nodes[index].right || end <= this.nodes[index].left)
            return 0;
        //var mid = Math.floor((this.nodes[index].left+this.nodes[index].right)/2);
        return this.getSumUtil(start, end, 2*index) + this.getSumUtil(start, end, 2*index+1);

    };

    SegmentTree.prototype.getSum = function(start, end) {
        if (start < 0 || end > this.N || start >= end) {
            console.log("Invalid Input");
            return;
        }
        return this.getSumUtil(start, end, 1);

    };

    SegmentTree.prototype.updateValueUtil = function(left, right, index, diff, nodeIndex) {
        if (index < left || index >= right)
            return;
        this.nodes[nodeIndex].record += diff;
        if (left+1<right) {
            var mid = Math.floor((left+right)/2);
            this.updateValueUtil(left, mid, index, diff, 2*nodeIndex);
            this.updateValueUtil(mid, right, index, diff, 2*nodeIndex+1);
        }
    };

    SegmentTree.prototype.update = function(index, newValue) {
        if (index < 0 || index > this.N-1) {
            console.log("Invalid Input");
            return;
        }
        var diff = newValue - this.array[index];
        this.array[index] = newValue;
        this.updateValueUtil(0, this.N, index, diff, 1)

    };

    SegmentTree.prototype.rangeMax = function() {

    };

    SegmentTree.prototype.rangeMin = function() {

    };

    //global.SegmentTree = SegmentTree;
    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = SegmentTree;
    }
    //return SegmentTree;


})(this);

var SegmentTree = module.exports;

function DqueryNode() {

}

function SegmentTreeDquery () {


}

function countOnTree() {


}

function RMQNode(l,r) {
    this.add = 0;
}

function SegmentTreeRMQ(len) {

};

function SumNode (l,r) {
    this.add = 0;
    this.sum = 0;
    this.left = l;
    this.right = r;
    this.leftChild = null;
    this.rightChild = null;
    if (l+1 < r) {
        var mid = l + Math.floor((r-l)/2);
        this.leftChild = new SumNode(l, mid);
        this.rightChild = new SumNode(mid ,r);
    }
}

SumNode.prototype.rangeSum1 = function(l,r) {
    if (l >= this.right || r <= this.left) {
        return 0;
    }
    if (l <= this.left && r >= this.right) {
        return this.sum;
    }
    return this.leftChild.rangeSum1(l,r) + this.rightChild.rangeSum1(l,r);
};

SumNode.prototype.rangeSum2 = function(l , r) {
    if (l >= this.right || r <= this.left) {
        return 0;
    }

    if (l <= this.left && r >= this.right) {
        return this.getSum2();
    }

    return this.add*(Math.min(this.right,r) - Math.max(this.left,l)) + this.leftChild.rangeSum2(l, r) + this.rightChild.rangeSum2(l, r);

};

SumNode.prototype.singleUpdate1 = function(idx, delta) {
    if (this.left == idx && idx + 1 == this.right) {
        this.sum += delta;
    }
    if (idx<this.left || idx >= this.right) {
        return;
    }

    if (idx < this.leftChild.right) {
        this.leftChild.singleUpdate1(idx, delta);
    } else {
        this.rightChild.singleUpdate1(idx, delta);
    }

};

SumNode.prototype.rangeUpdate2 = function (l, r, delta) {
    if (l >= this.right || r <= this.left) {
        return;
    }

    if (l <= this.left && r >= this.right) {
        this.add += delta;
        return;
    }
    this.leftChild.rangeUpdate2(l, r, delta);
    this.rightChild.rangeUpdate2(l, r, delta);
    this.sum = this.leftChild.getSum2() + this.rightChild.getSum2();
};

SumNode.prototype.getSum2 = function () {
  return this.sum + this.add*(this.right- this.left);
};

SumNode.prototype.singleUpdate2 = function (idx, delta) {
    this.rangeUpdate2(idx, idx+1, delta);
};

SumNode.prototype.getAdd = function (pos) {
    if (this.left == pos && pos + 1 == this.right) {
        return this.add;
    }
    if (pos < this.left || pos >= this.right) {
        return 0;
    }
    return this.add + (pos < this.leftChild.right ? this.leftChild : this.rightChild).getAdd(pos);

};






function SegmentTreeSum(len) {
    this.root = new SumNode(0, len);

}

SegmentTreeSum.prototype.querySum = function(left, right) {
    return this.root.rangeSum2(left, right);
};

SegmentTreeSum.prototype.rangeUpdate = function(l, r, delta) {
    this.root.rangeUpdate2(l, r, delta);
};

SegmentTreeSum.prototype.singleUpdate = function(idx, delta) {
    this.root.rangeUpdate2(idx, idx+1, delta);
};

SegmentTreeSum.prototype.getValue = function (idx) {
    return this.root.getAdd(idx);
};





function BurgerNode(l, r) {
    this.l = l;
    this.r = r;
    this.left = null;
    this.right = null;
    this.add = 0;
    this.max = 0;
    if(r-l>1) {
        var mid = Math.floor((r+l)/2);
        this.left = new BurgerNode(l,mid);
        this.right = new BurgerNode(mid,r);
    }
};

BurgerNode.prototype.getMax = function () {
    return this.max + this.add;
};

BurgerNode.prototype.qMax = function (ql, qr) {
    if (this.l >= qr || ql >= this.r) {
        return null;
    }
    if (ql <= this.l && this.r <= qr) {
        return this.getMax();
    }
    var leftMax = this.left.qMax(ql,qr);
    var rightMax = this.right.qMax(ql,qr);
    if (leftMax == null) {
        return rightMax + this.add;
    }
    if (rightMax == null) {
        return leftMax + this.add;
    }

    return Math.max(leftMax,rightMax)+this.add;
};

BurgerNode.prototype.getBSum = function (pos) {
    if (this.l == pos && pos + 1 == this.r) {
        return this.add;
    }
    return this.add + (pos < this.left.r ? this.left : this.right).getBSum(pos);
};

BurgerNode.prototype.qAdd = function(ql, qr, delta) {
    if (this.l >= qr || ql >= this.r) {
        return;
    }
    if (ql <= this.l && this.r <= qr) {
        this.add += delta;
        return;
    }
    this.left.qAdd(ql,qr,delta);
    this.right.qAdd(ql,qr,delta);
    this.max = Math.max(this.left.getMax(),this.right.getMax());
};

function compressLocation(burgers) {
    var clone = [];
    for (var i = 0 ;  i < burgers.length; i++) {
        clone[i] = burgers[i];
    }
    clone.sort(function (a, b) {
        return a[0] - b[0];
    });
    //console.log("===========");
    //console.log(clone);
    for (var i = 0; i < clone.length; i++) {
        clone[i][0] = i;
    }
}

function processData(input) {
    //Enter your code here
    var inputArray = input.split("\n");
    var N = Number(inputArray[0]);
    var burgers = [];
    for (var i= 1; i <= N; i++) {
        burgers[i-1] = inputArray[i].split(" ").map(Number);
    }
    //console.log(burgers);
    compressLocation(burgers);
    //console.log(burgers);
    solve(burgers);

}

function solve(burgers) {
    var ans = 0;
    var pre = new BurgerNode(0,burgers.length);
    var suf = new BurgerNode(0,burgers.length);
    console.log("len is " + burgers.length);
    for(var i = 0; i < burgers.length; i++) {
        var pos = burgers[i][0];

        console.log("pos is "+ pos);
        console.log("A is " + burgers[i][1]);
        console.log("B is " + burgers[i][2]);
        var valL = suf.qMax(0,pos+1)-suf.getBSum(pos);
        var valR = pre.qMax(pos, burgers.length) - pre.getBSum(pos);
        console.log("L is "+ valL);
        console.log("R is "+ valR);
        var val = Math.max(valL,valR)+burgers[i][1];
        console.log("val is "+val);
        ans = Math.max(ans,val);
        console.log("ans is "+ans);
        pre.qAdd(pos, burgers.length, -burgers[i][2]);
        suf.qAdd(0,pos+1, -burgers[i][2]);
        pre.qAdd(pos,pos+1,val);
        suf.qAdd(pos,pos+1,val);
    }
    console.log(ans);

}

var dog = new SegmentTree([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
//dog.insert(0,1,1);
//dog.insert(2,4,1);
//dog.insert(3,5,1);
//dog.insert(0,4,1);
dog.insert(0,2,1);
dog.insert(0,2,1);
dog.insert(0,2,1);
dog.insert(2,3,1);

console.log(dog);
console.log(dog.countCoveredLength(dog.nodes[1]));
console.log(dog.numberOfLinesWithPoint(0, dog.nodes[1]));
console.log(dog.numberOfLinesWithPoint(2,dog.nodes[1]));
console.log(dog.numberOfLinesWithPoint(1, dog.nodes[1]));

var bur = [ [ 15, 245403, 461119 ],
    [ 6, 428646, 705622 ],
    [ 9, -351044, 365317 ],
    [ 2, -569708, 737198 ],
    [ 13, -83656, 762424 ],
    [ 17, -723601, 267719 ],
    [ 10, 183167, 770412 ],
    [ 0, 365349, 556078 ],
    [ 5, 504206, 813327 ],
    [ 16, 667265, 185062 ],
    [ 3, 632362, 523387 ],
    [ 7, -617786, 391708 ],
    [ 14, 868150, 596460 ],
    [ 12, 24885, 191676 ],
    [ 18, -807226, 999191 ],
    [ 19, 430640, 115816 ],
    [ 8, 686796, 295415 ],
    [ 1, -84160, 560294 ],
    [ 4, -88184, 131886 ],
    [ 11, 733688, 643864 ] ];
solve(bur);

function solveColoringTree(tree, treeColor, queryList) {


}

var sts = new SegmentTreeSum(5);
console.log(sts.rangeUpdate(0,5,1));
console.log(sts.querySum(1,2));
console.log(sts.rangeUpdate(0,2,2));
console.log(sts.querySum(0,3));
console.log(sts.querySum(1,4));











