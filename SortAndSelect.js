/**
 * Created by yizeli on 3/25/15.
 */

function MinHeap() {
    this.heap = [];
    this.size = 0;
}

MinHeap.prototype.sink = function(position){
    var childIndex = position*2;
    var rearrange = this.heap[position];
    while (childIndex <= this.size) {
        if(childIndex<this.size && this.heap[childIndex+1]<this.heap[childIndex])
            childIndex++;
        if (this.heap[childIndex]>=rearrange)
            break;
        this.heap[position] = this.heap[childIndex];
        position = childIndex;
        childIndex = position*2;
    }
    this.heap[position] = rearrange;
};

MinHeap.prototype.swim = function(position) {
    var parentIndex = Math.floor(position/2);
    var insertVal = this.heap[position];
    while (parentIndex>0 && insertVal<this.heap[parentIndex]) {
        this.heap[position] = this.heap[parentIndex];
        position = parentIndex;
        parentIndex = Math.floor(position/2);
    }
    this.heap[position] = insertVal;
};

MinHeap.prototype.removeMin = function() {
    var rootVal = this.heap[1];
    this.heap[1] = this.heap[this.size--];
    this.sink(1);
    return rootVal;
};

MinHeap.prototype.insert = function(x) {
    this.heap[++this.size] = x;
    this.swim(this.size);
};

function partition(arr, left, right, pivot) {
    var temp = arr[pivot];
    arr[pivot] = arr[right];
    arr[right] = temp;
    var track = left;
    for (var i = left; i < right; i++) {
         if (arr[i]<arr[right]) {
            var t = arr[i];
            arr[i] = arr[track];
            arr[track] = t;
            track++;
        }
    }
    temp = arr[track];
    arr[track] = arr[right];
    arr[right] = temp;
    return track;
}

var arr = [9,8,7,6,5,4,3,2,1];

console.log(partition(arr, 0, 8, 3));
console.log(quickSelect(arr, 0));
console.log(topK(arr, 5));


function countSort(arr) {

}



function quickSelect(arr, k) {
    var left = 0;
    var right = arr.length-1;

    while (true) {
        var pivotIndex = Math.floor(Math.random()*(right-left+1))+left;
        pivotIndex = partition(arr, left, right, pivotIndex);
        if (pivotIndex == k)
            return arr[k];
        else if (pivotIndex<k) {
            left = pivotIndex + 1;
        } else {
            right =  pivotIndex - 1;
        }
    }
}

function topK(arr, k) {
    k--;
    var left = 0;
    var right = arr.length-1;
    while (true) {
        var pivotIndex = Math.floor(Math.random()*(right-left+1))+left;
        pivotIndex = partition(arr, left, right, pivotIndex);
        if (pivotIndex == k)
            return arr.slice(0, k+1);
        else if (pivotIndex<k) {
            left = pivotIndex + 1;
        } else {
            right =  pivotIndex - 1;
        }
    }
}

function quickSort(arr,left,right) {
    if (left >= right)
        return;
    var pivotIndex = Math.floor(Math.random()*(right-left+1))+left;
    pivotIndex = partition(arr, left, right, pivotIndex);
    quickSort(arr, left, pivotIndex-1);
    quickSort(arr, pivotIndex+1, right);

}
var b = [6,5,2,7,9,1,0];
quickSort(b, 0, b.length-1);

console.log(b);

function heapSort() {


}

function mergeSort(arr) {


}

function merge2SortedArray(A, B) {
    var l1 = A.length;
    var l2 = B.length;
    var l3 = l1+l2;
    l1--;
    l2--;
    l3--;
    while (l2>=0) {
        if (A[l1]>B[l2]) {
            A[l3--] = A[l1--];
        } else {
            A[l3--] = B[l2--];
        }
    }
    return A;
}

console.log(merge2SortedArray([2,4,6],[1,3,5]));

function mergeKSortedArray(arrOfArray) {


}

function getMax(array) {
    var res = array[0];
    for (var i = 1; i < res.length; i++) {
        Math.max(res, array[i]);
    }
    return res;
}

function radixSort(array) {
    var max = getMax(array);
}

function bucketSort() {

}

function findKthFromTwoSortedArray1(A, B, k) {

}

function findKthFromTwoSortedArray2(A, B, k) {

}

function findMinimumInRotatedSortedArray(array) {

}

function medianOfMedian() {


}



