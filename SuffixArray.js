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

function radixPass(a, b, arr, n, dictSize, offset) {
    var count = [];
    fillArray(count,dictSize+1,0);
    for (var i = 0; i < n; i++) {
        count[arr[a[i]+offset]]++;
    }
    for (var i = 1; i <= dictSize; i++) {
        count[i]+=count[i-1];
    }
    for (var i = n -1; i >=0; i--) {
        b[--count[arr[a[i]+offset]]] = a[i];
    }
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

function getArrayMax(arr) {
    var res = arr[0].length;
    for (var i = 0; i<arr.length; i++) {
        res = Math.max(res, arr[i].length);
    }
    return res;
}

function radixSortDigitArray(arr) {
    var max = getArrayMax(arr);
}

function fillArray(arr, size, val) {
    for (var i = 0; i < size; i++) {
        arr[i] = val;
    }
}

function lexOrder1(a1, a2, b1, b2) {
    return (a1 < b1 || a1 == b1 && a2 <= b2);
}

function lexOrder2(a1, a2, a3, b1, b2, b3) {
    return (a1<b1 || a1 == b1 && lexOrder1(a2,a3,b2,b3))
}

function toCharacterCodeArray(s) {
    var cc = [];
    for (var i = 0; i < s.length; i++) {
        cc[i] = s.charCodeAt(i);
    }
    return cc;
}

function constructSuffixArray(s,dictionarySize) {
    var charCodeArray = toCharacterCodeArray(s);
    var len = s.length;
    charCodeArray[len] = 0;
    charCodeArray[len+1] = 0;
    charCodeArray[len+2] = 0;
    var SA = [];
    getSuffixArray(charCodeArray, SA, len, dictionarySize);
    return SA;
}

function getSuffixArray(s, SA, len, dictionarySize) {
    var n0 = Math.floor((len+2)/3);
    var n1 = Math.floor((len+1)/3);
    var n2 = Math.floor(len/3);
    var n02 = n0+n2;
    var s12 = [];
    var SA12 = [];
    var s0 = [];
    var sA0 = [];
    fillArray(s12,n02+3,0);
    fillArray(SA12,n02+3,0);
    fillArray(s0,n0,0);
    fillArray(sA0,n0,0);
    for (var i = 0, j = 0; i < len + (n0-n1); i++) {
        if (i%3!==0) {
            s12[j++] = i;
        }
    }
    radixPass(s12,SA12,s,n02,dictionarySize,2);
    //console.log(SA12);
    radixPass(SA12,s12,s,n02,dictionarySize,1);
    radixPass(s12,SA12,s,n02,dictionarySize,0);
    var name = 0, c0 = -1, c1 = -1, c2 = -1;
    //console.log(SA12);
    for (var i = 0; i < n02; i++) {
        if (s[SA12[i]]!==c0 || s[SA12[i]+1]!==c1|| s[SA12[i]+2]!==c2) {
            name++;
            c0 = s[SA12[i]];
            c1 = s[SA12[i]+1];
            c2 = s[SA12[i]+2];
        }
        if (SA12[i]%3==1) {
            s12[Math.floor(SA12[i]/3)] = name;
        } else {
            s12[Math.floor(SA12[i]/3)+n0] = name;
        }
    }
    //console.log(s12);
    //s12 is rank array from now on
    if (name < n02) {
        getSuffixArray(s12, SA12, n02, name);
        for (var i = 0; i < n02; i++) {
            s12[SA12[i]] = i+1;
        }

    } else {
        for (var i = 0; i < n02; i++) {
            SA12[s12[i]-1] = i;
        }
    }

    for (var i = 0, j = 0; i < n02; i++ ) {
        if (SA12[i]<n0) {
            s0[j++] = 3*SA12[i];
        }
    }
    radixPass(s0,sA0,s,n0,dictionarySize,0);
    //console.log("========")
    //console.log(SA12);
    var SA12Real = [];
    for (var j = 0; j< n02; j++) {
        if (SA12[j]<n0) {
            SA12Real[j] = 1 + 3*SA12[j];
        } else {
            SA12Real[j] = 2 + 3*(SA12[j]-n0);
        }
    }

    for (var p = 0, t = n0 -n1, k = 0; k < len; k++) {
        var i = SA12Real[t];
        var j = sA0[p];
        var flag = SA12[t]<n0? lexOrder1(s[i], s12[SA12[t]+n0], s[j], s12[Math.floor(j/3)]):lexOrder2(s[i],s[i+1],s12[SA12[t]-n0+1], s[j],s[j+1], s12[Math.floor(j/3+n0)]);
        if (flag) {
            SA[k] = i;
            t++
            if (t == n02) {
                for (k++; p < n0; p++, k++) {
                    SA[k] = sA0[p];
                }
            }
        } else {
            SA[k] = j;
            p++;
            if (p == n0) {
                for (k++; t < n02; t++, k++) {
                    SA[k] = SA12Real[t];
                }
            }
        }
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

//console.log(radixSort([4,3,5,6,7]));

//console.log(String.fromCharCode(0))

console.log(constructSuffixArray("GACCCACCACC",255))
