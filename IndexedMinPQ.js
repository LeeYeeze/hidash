/**
 * Created by yizeli on 4/2/15.
 */
function IndexedMinPQ(NMAX) {
    this.NMAX = NMAX;
    this.N = 0;
    this.pq = [];
    this.qp = [];
    this.keys = [];
    for (var i = 0; i <= NMAX; i++) {
        this.qp[i] = -1;
    }
}
IndexedMinPQ.prototype.contains = function(i) {
    if (i < 0 || i >= this.NMAX) throw "Index Out of Bounds";
    return this.qp[i] != -1;
};

IndexedMinPQ.prototype.isEmpty = function() {
    return this.N == 0;
};

IndexedMinPQ.prototype.size = function() {
    return this.N;
};

IndexedMinPQ.prototype.swim = function(k) {
    while (k > 1 && this.greater(Math.floor(k/2),k)) {
        this.exchange(k, Math.floor(k/2));
        k = Math.floor(k/2);
    }
};

IndexedMinPQ.prototype.sink = function(k) {

};

IndexedMinPQ.prototype.insert = function(i, key) {
    if (i<0 || i >= this.NMAX) throw "Index Out of Bounds";
    if (this.contains(i)) throw "Index is already in the priority queue";
    this.N++;
    this.qp[i] = this.N;
    this.pq[this.N] = i;
    this.keys[i] = key;
    this.swim(this.N);
};

IndexedMinPQ.prototype.minIndex = function() {
    if (this.N==0) throw "Underflow";
    return this.pq[1];
};

IndexedMinPQ.prototype.minKey = function() {
    if (this.N == 0) throw "Underflow";
    return this.keys[this.pq[1]];
};

IndexedMinPQ.prototype.delMin = function() {
    if (this.N == 0) throw "Underflow";
    var min = this.pq[1];
    this.exchange(1,this.N--);
    this.sink(1);
    this.qp[min] = -1;
    this.keys[this.pq[this.N+1]] = null;
    this.pq[this.N+1] = -1;
    return min;
};

IndexedMinPQ.prototype.keyOf = function(i) {
    if (i<0 || i >= this.NMAX) throw "Index Out Of Bounds";
    if (!this.contains(i)) throw "Not in the priority queue";
    else {
        return this.key[i];
    }
};

IndexedMinPQ.prototype.changeKey = function(i, key) {
    if (i<0 || i >= this.NMAX) throw "Index Out Of Bounds";
    if (!this.contains(i)) throw "Not in the priority queue";
    this.keys[i] = key;
    this.swim(this.qp[i]);
    this.sink(this.qp[i]);
};

IndexedMinPQ.prototype.decreaseKey = function(i,key) {
    if (i<0 || i >= this.NMAX) throw "Index Out Of Bounds";
    if (!this.contains(i)) throw "Not in the priority queue";
    if (this.comparator(this.keys[i], key) <=0) throw "Illegal Arguments";
    this.keys[i] = key;
    this.swim(this.qp[i]);

};

IndexedMinPQ.prototype.increaseKey = function(i,key) {
    if (i<0 || i >= this.NMAX) throw "Index Out Of Bounds";
    if (!this.contains(i)) throw "Not in the priority queue";
    if (this.comparator(this.keys[i], key) >=0) throw "Illegal Arguments";
    this.keys[i] = key;
    this.sink(this.qp[i]);

};

IndexedMinPQ.prototype.delete = function(i) {
    if (i<0 || i >= this.NMAX) throw "Index Out Of Bounds";
    if (!this.contains(i)) throw "Not in the priority queue";
    var index = this.qp[i];
    this.exchange(index, this.N--);
    this.swim(index);
    this.sink(index);
    this.keys[i] = null;
    this.qp[i] = -1;
};

IndexedMinPQ.prototype.greater = function(i , j) {
    return this.comparator(this.keys[this.pq[i]], this.keys[this.pq[j]]);

};

IndexedMinPQ.prototype.exchange = function(i , j) {
    var temp = this.pq[i];
    this.pq[i] = this.pq[j];
    this.pq[j] = temp;
    this.qp[this.pq[i]]  = i;
    this.qp[this.pq[j]] = j;
};




