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

function radixPass() {

}

function getMax(arr) {
    var res = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > res)
            res = arr[i];
    }
    return res;
}

function countSort(arr, exp) {
    var res = [];
    var count = [];
    for (var i = 0; i < 10; i++) {
        count[i] = 0;
    }
    for (var i =0; i < arr.length; i++) {
        count[Math.floor(arr[i]/exp)%10]++
    }

    for (var i = 1; i < 10; i++) {
        count[i]+=count[i-1];
    }

    for (var i = arr.length -1; i >= 0; i--) {
        res[count[Math.floor(arr[i]/exp)%10]-1] = arr[i];
        count[Math.floor(arr[i]/exp)%10]--;
    }

    for (var i = 0; i<arr.length; i++) {
        arr[i] = res[i];
    }

}

function radixSort(arr) {
    var max = getMax(arr);
    for (var exp = 1; Math.floor(max/exp)>0; exp *=10) {
        countSort(arr, exp);
    }
    return arr;
}



function toCharacterCodeArray(s) {
    var cc = [];
    for (var i = 0; i < s.length; i++) {
        cc[i] = s.charCodeAt(i);
    }
}

function constructSuffixArray(s) {
    var charCodeArray = toCharacterCodeArray(s);
    var len = s.length;
    charCodeArray[len] = 0;
    charCodeArray[len+1] = 0;
    charCodeArray[len+2] = 0;
    var n1 = Math.floor((len+2)/3);
    var n2 = Math.floor((len+1)/3);
    var n0 = Math.floor(len/3);



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

console.log(radixSort([4,3,5,6,7]));
