/**
 * Created by yizeli on 4/19/15.
 */

function buildTable(W) {
    var table = [];
    var table2 = [];
    if (W.length == 0) {
        return table;
    }
    table[0] = -1;
    table2[0] = -1;
    if (W.length == 1) {
        return table;
    }

    table[1] = 0;
    if (W.length == 2) {
        return table;
    }
    var candidate = 0;
    var i = 2;
    while (i < W.length) {
        if (W.charAt(i-1) == W.charAt(candidate)) {
            candidate++;
            table[i] = candidate;
            i++;
        } else if (candidate > 0){
            candidate = table[candidate];
        } else {
            table[i] = 0;
            i++;
        }
    }
    return table;

}



function buildTable2(W) {
    var table = [];
    if (W.length == 0) {
        return table;
    }
    table[0] = -1;
    var i = 1;
    var candidate = 0;
    while (i < W.length) {
        if (W.charAt(candidate) == W.charAt(i)) {
            table[i++] = candidate++;
        } else if (candidate >= 0) {
            candidate = table[candidate];
        } else {
            table[i] = -1;
            i++;
        }
    }

}

function buildTable3(W) {
    var table = [];
    if (W.length == 0) {
        return table;
    }
    table[0] = -1;
    var i = 1;
    var ancestor = -1;
    while (i < W.length) {
        if (typeof table[i] === "undefined") {
            ancestor = table[i-1];
            table[i] = ancestor+1;
        } else if (W.charAt(table[i]) !== W.charAt(i)){
            if (ancestor === -1) {
                table[i] = -1;
                i++;
            } else {
                ancestor = table[ancestor];
                table[i] = ancestor+1;
            }
        } else {
            i++;
        }
    }
    return table;
}

function KMPMatch(S,W) {
    var table = buildTable(W);
    var m = 0;
    var i = 0;
    while (m+i < S.length) {
        if (W.charAt(i) == S.charAt(m+i)) {
            if (i == W.length -1) {
                return m;
            } else {
                i++;
            }
        } else {
            if (table[i] > -1) {
                m = m+i-table[i];
                i = table[i];
            } else {
                i = 0;
                m++;
            }
        }
    }
    return -1;

}

function KMPMatch3(S,W) {
    var table = buildTable3(W);
    var m = 0;
    var i = 0;
    var res = [];
    while (m+i < S.length) {
        if (W.charAt(i) === S.charAt(m+i)) {
            if (i === W.length - 1) {
                res.push(m);
                m = m + i - (table[i-1]+1);
                i = table[i-1]+1;
                //return m;
            } else {
                i++;
            }
        } else {
            if (i > 0 && table[i-1] > -1) {
                m = m + i - (table[i-1]+1);
                i = table[i-1]+1;
            } else {
                i = 0 ;
                m++;
            }

        }
    }
    return res;
}


function KMPAutomaton(P){


}

function wildCardMatch(s,p) {
    if (s == null || p == null) {
        return false;
    }
    var i = 0;
    var j = 0;
    var star = -1;
    var mark = -1;
    while (i < s.length) {
        if (j < p.length && (p.charAt(j) == '?' || p.charAt(j) == s.charAt(i))) {
            i++;
            j++;
        } else if (j < p.length && p.charAt(j) == '*'){
            star = j++;
            i = mark;
        } else if (star != -1) {
            j = star + 1;
            i = ++mark;
        } else {
            return false;
        }
    }
    while (j < p.length && p.charAt(j)=='*') {
        j++;
    }

    return j === p.length;
}

//console.log(KMPMatch("abcd","s"));
console.log(buildTable("aaabaaabaaab"));
//console.log(buildTable("ababcababcaaabb"));
//console.log(buildTable("aaaaaaaaaaaaaaa"));
//console.log(buildTable("abcababcabbacabbacabcacb"));
//console.log(wildCardMatch("","*"));
console.log(buildTable3("aabbccaa"));

console.log(KMPMatch3("bavbaavbaav","baav"));