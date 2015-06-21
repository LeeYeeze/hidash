/**
 * Created by yizeli on 3/7/15.
 */
function MinHeap() {
    this.heap = [];
    this.size = 0;
    this.compare = compare;
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

MinHeap.prototype.heapifyArray = function (arr) {
    this.size = arr.length;
    for (var i = 0 ; i < this.size; i++) {
        this.heap[i+1] = arr[i];
    }
    for (var i = (this.size)>>2;i > 0; i--) {
        this.sink(i);
    }

};

function MaxHeap(compare, externalIndex) {
    this.heap = [];
    this.size = 0;
    this.compare = compare;
    this.externalIndex = externalIndex;
}

MaxHeap.prototype.sink = function(position) {
    var childIndex = position*2;
    var rearrange = this.heap[position];
    while (childIndex <= this.size) {
        if(childIndex<this.size && /*this.heap[childIndex+1]>this.heap[childIndex]*/ this.compare(this.heap[childIndex+1],this.heap[childIndex]) > 0)
            childIndex++;
        if (/*this.heap[childIndex]<=rearrange*/this.compare(rearrange,this.heap[childIndex]) >= 0)
            break;
        this.heap[position] = this.heap[childIndex];
        this.externalIndex[this.heap[position].blockIndex] = position;
        position = childIndex;
        childIndex = position*2;
    }
    this.heap[position] = rearrange;
    this.externalIndex[rearrange.blockIndex] = position;
};

MaxHeap.prototype.removeMax = function() {
    var rootVal = this.heap[1];
    this.heap[1] = this.heap[this.size--];
    this.sink(1);
    return rootVal;
};

MaxHeap.prototype.swim = function(position) {
    var parentIndex = Math.floor(position/2);
    var insertVal = this.heap[position];
    while (parentIndex>0 && /*insertVal>this.heap[parentIndex]*/ this.compare(insertVal, this.heap[parentIndex]) > 0) {
        this.heap[position] = this.heap[parentIndex];
        this.externalIndex[this.heap[position].blockIndex] = position;
        position = parentIndex;
        parentIndex = Math.floor(position/2);
    }
    this.heap[position] = insertVal;
    this.externalIndex[insertVal.blockIndex] = position;
};

MaxHeap.prototype.insert = function(x) {
    this.heap[++this.size] = x;
    this.swim(this.size);
};

MaxHeap.prototype.delete = function (index) {
    if (index === 1) {
        this.removeMax();
    } else {
        this.heap[index] = this.heap[this.size--];
        console.log(index);
        this.sink(index);
        this.swim(index);
    }
    this.externalIndex[this.heap[index].blockIndex] = -1;
};

MaxHeap.prototype.peek = function() {
    return this.heap[1];
};

MaxHeap.prototype.next = function(index) {
    var child = 2 * index;
    if (child > this.size) {
        return null;
    }
    if (child + 1 <= this.size && this.compare(this.heap[child+1], this.heap[child]) > 0) {
        child++;
    }
    return this.heap[child];
};

MaxHeap.prototype.previous = function() {
    // not easy
};

function Point(type,blockIndex, height, x) {
    // 0 as left, 1 as right
    this.type = type;
    this.blockIndex = blockIndex;
    this.height = height;
    this.x = x;
}

function skyline(buildings) {
    var pointArray = [];
    for(var i = 0; i < buildings.length; i++) {
        pointArray.push(new Point(0,i,buildings[i].y,buildings[i].left));
        pointArray.push(new Point(1,i,buildings[i].y,buildings[i].right));
    }

    pointArray.sort(function(a,b) {
        if (a.x !== b.x) {
            return a.x - b.x;
        } else {
            if (a.type == 0 && b.type == 0) {
                return b.height - a.height;
            } else if (a.type == 1 && b.type == 1) {
                return a.height - b.height;
            } else {
                return b.type - a.type;
            }
        }
    });
    console.log(pointArray);

    var compare = function (a,b) {
        return a.height - b.height;
    };
    var externalIndex = [];
    var maxHeap = new MaxHeap(compare, externalIndex);

    for (var i = 0; i < pointArray.length; i++) {
        if (pointArray[i].type === 1) {
            maxHeap.delete(externalIndex[pointArray[i].blockIndex]);
        } else {
            maxHeap.insert(pointArray[i]);
        }
        console.log("external");
        console.log(externalIndex);
    }

}

skyline([{left:0,right:2,y:1},{left:1,right:3,y:2}]);


