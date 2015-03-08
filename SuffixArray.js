/**
 * Created by yizeli on 3/7/15.
 */
function lcp(s, t) {
    var N = Math.min(s.length, t.length);
    for (var i = 0; i < N; i++) {
        if (s.charAt(i) != t.charAt(i)) {
            return i;
        }
    }
    return N;
}

function quick3WaySort(arr) {

}

function radixSort(arr) {

}

function constructSuffixArray(s) {
    var T = [];
    for (var i = 0; i*3 < s.length; i++) {
        if (i+1< s.length)
            T.push(s.substring(i+1, i+4));
    }
    

}

function SuffixArray(s) {
    this.suffixes = [];
    //An O(n*n*log(n)) implementation
    for (var i =0; i < s.length; i++) {
        this.suffixes[i] = s.substring(i);
    }
    this.suffixes.sort();


}

SuffixArray.prototype.select = function(i) {
    return this.suffixes[i];
};

SuffixArray.prototype.rank = function(key) {
    var l = 0, r = this.suffixes.length - 1;
    while (l <= r) {
        var mid = Math.floor((l+r)/2);
        var cmp = key.localeCompare(this.suffixes[mid]);
        if (cmp<0) r = mid - 1;
        else if (cmp>0) l = mid + 1;
        else
            return mid;
    }
    return l;
};

SuffixArray.prototype.lcp = function(i) {
    return lcp(this.suffixes[i], this.suffixes[i-1]);
};

SuffixArray.prototype.index = function(i) {
    return this.suffixes.length - this.suffixes[i].length;
};
