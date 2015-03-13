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
        if (this.nodes[num].left == l && this.nodes[num] == r) {
            this.nodes[num].cover = true;
            return;
        }
        var mid = Math.floor((this.nodes[num].left+this.nodes[num].right)/2);
        if (r < mid) {
            this.insert(l, r, 2*num);
        } else if (l >= mid) {
            this.insert(l,r, 2*num+1);
        } else {
            this.insert(l, mid, 2*num);
            this.insert(mid, r, 2*num+1);
        }
    };

    SegmentTree.prototype.remove = function () {

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
    //global.SegmentTree = SegmentTree;
    if ( typeof module != 'undefined' && module.exports ) {
        module.exports = SegmentTree;
    }
    //return SegmentTree;


})(this);












