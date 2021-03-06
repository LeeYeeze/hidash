/**
 * Created by yizeli on 3/23/15.
 */

function State(val) {
    this.val = val;
    this.parent = null;
    this.nextStates = [];
}

function SuffixAutomaton(arr) {

    this.root = new State(0);

    var last = this.root;
    for (var i = 0; i < arr.length; i++) {
        var p = last;
        var newState = new State(last.val+1);
        while (p !== null && typeof p.nextStates[arr.charCodeAt(i)] === "undefined") {
            p.nextStates[arr.charCodeAt(i)] = newState;
            p = p.parent;
        }
        if (p === null) {
            newState.parent = this.root;
        } else {
            var q = p.nextStates[arr.charCodeAt(i)];
            if (p.val + 1 === q.val) {
                newState.parent = q;
            } else {
                var nq = new State(p.val+1);
                nq.nextStates = q.nextStates.slice(0);
                nq.parent = q.parent;
                q.parent = nq;
                newState.parent = nq;
                while (p !== null && p.nextStates[arr.charCodeAt(i)] === q) {
                    p.nextStates[arr.charCodeAt(i)] = nq;
                    p = p.parent;
                }
            }

        }
        last = newState;
    }

}

var sam = new SuffixAutomaton("bbaabbbaab");
console.log(sam.root);

var current  = sam.root;
for (var i = 0; i < 5; i++) {
    console.log(i);
    for (var j = 'a'.charCodeAt(0); j <= 'z'.charCodeAt(0);j++) {
        if (current.nextStates[j] !== undefined) {
            console.log(String.fromCharCode(j));
            current = current.nextStates[j];
            break;
        }
    }
}

function LongestCommonSubstring(str1, str2) {

    var sam = new SuffixAutomaton(str1);
    var current = sam.root;
    var temp = 0;
    var res = {max:0,end:-1};
    for (var i = 0; i < str2.length; i++) {
        if (current === null) {
            current = sam.root;
            temp = 0;
            continue;
        }
        if (typeof current.nextStates[str2.charCodeAt(i)] !== "undefined") {
            temp++;
            if (temp > res.max) {
                res.max = temp;
                res.end = i;
            }
            current = current.nextStates[str2.charCodeAt(i)];
        } else {
            current = current.parent;
            temp = current === null ? 0:current.val;
            i--;
        }
    }
    return res;

}

console.log(LongestCommonSubstring("bbaa","camaa"));




//console.log(sam.root.nextStates[sam.root.nextStates.length-1]);


