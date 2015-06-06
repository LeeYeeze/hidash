/**
 * Created by yizeli on 6/3/15.
 */

function SeparateTreeNode(left, right, level, sumMatrix) {
    this.left = left;
    this.right = right;
    this.level = level;
    this.leftChild = null;
    this.rightChild = null;
    this.mid = null;
    this.item = [];
    this.sum = [];
    this.count = 0;
    if (left < right) {
        var mid = this.left + Math.floor((this.right - this.left)/2);
        this.mid = mid;
        this.leftChild = new SeparateTreeNode(this.left, mid, level+1, sumMatrix);
        this.rightChild = new SeparateTreeNode(mid+1, this.right, level+1 ,sumMatrix);
    }
}

SeparateTreeNode.prototype.insert = function (obj, sumMatrix) {
    this.item.push(obj);
    if (this.mid !== null) {
        if ( obj.order <= this.mid) {
            this.count++;
            this.sum[obj.index] = this.count;
            if (typeof sumMatrix[this.level] === "undefined") {
                sumMatrix[this.level] = [];
            }
            sumMatrix[this.level][obj.index] = this.count;
            this.leftChild.insert(obj, sumMatrix);
        } else {
            if (typeof sumMatrix[this.level] === "undefined") {
                sumMatrix[this.level] = [];
            }
            sumMatrix[this.level][obj.index] = this.count;
            this.rightChild.insert(obj, sumMatrix);
        }
    }
};

SeparateTreeNode.prototype.get = function (l, r, k, sumMatrix) {
    if (this.left  == this.right) {
            console.log(k);
            return this.item[0];
    }else {
        console.log(k);
        console.log(l);
        console.log(r);
        console.log(this.level);
        if (sumMatrix[this.level][r] - (l <= this.left ? 0:sumMatrix[this.level][l-1]) >= k) {
            console.log("left");
            return this.leftChild.get(this.left + (l <= this.left ? 0:sumMatrix[this.level][l-1]), this.left + sumMatrix[this.level][r]-1, k ,sumMatrix);
        } else {
            console.log("right");
            return this.rightChild.get(this.mid + 1 + l - (l <= this.left ? 0:sumMatrix[this.level][l-1]) - this.left, this.mid + 1 + r -sumMatrix[this.level][r]-this.left, k - sumMatrix[this.level][r]+(l <= this.left ? 0:sumMatrix[this.level][l-1]),sumMatrix);
        }
    }
};




function SeparateTree(arr) {
    if (!Array.isArray(arr)) {
        return;
    }
    this.arr = arr.map(function (num,i) {
        return {val : num, index: i};
    });
    this.arr.sort(function (a,b) {
       return a.val - b.val;
    });
    this.originalOrder = [];
    for (var i = 0 ; i < this.arr.length; i++) {
        this.arr[i].order = i;
        this.originalOrder[this.arr[i].index] = this.arr[i];
    }
    this.sumMatrix = [];
    this.root = new SeparateTreeNode(0, this.arr.length-1, 0,this.sumMatrix);

    for (var i = 0; i < this.arr.length; i++) {
        this.root.insert(this.arr[i], this.sumMatrix);
    }
    console.log(this.sumMatrix);

}

SeparateTree.prototype.get = function(l,r,k) {
    return this.root.get(l,r,k,this.sumMatrix);
};

var a = new SeparateTree([1,2,3,4,5,6,7,8]);
//console.log(a);
console.log(a.get(0,7,5));
