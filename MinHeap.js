/**
 * Created by yizeli on 3/7/15.
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
}

MinHeap.prototype.removeMin = function() {
    var rootVal = this.heap[1];
    this.heap[1] = this.heap[this.size--];
    this.sink(1);
    return rootVal;
};

MinHeap.prototype.insert = function(x) {
    this.heap[++this.size] = x;
    this.swim(this.size);
}


