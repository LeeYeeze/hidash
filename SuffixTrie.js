/**
 * Created by yizeli on 3/7/15.
 */
function SuffixTrieNode() {
    this.children = {};
    this.link = null;
}

SuffixTrieNode.prototype.insertString = function() {

}

SuffixTrieNode.prototype.search = function() {

}

SuffixTrieNode.prototype.addLink = function(c, v) {
    this.children[c] = v;
}

function SuffixTrie(s) {
    this.root = new SuffixTrieNode();
    this.remainder = 0;
    this.longest = this.root;
    for (var i = 0; i < s.length; i++) {
        var current = this.longest;
        var previous = null;
        var ch = s.charAt(i);
        while (current !== null &&  !current.children.hasOwnProperty(ch)) {
            var node = new SuffixTrieNode();
            current.addLink(ch, node);
            if (previous !== null) {
                previous.link = node;
            }
            previous = node;
            current = current.link;
        }
        if (current === null) {
            previous.link = this.root;
        } else {
            previous.link = current.children[ch];
        }
        this.longest = this.longest.children[ch];
    }
}

SuffixTrie.prototype.search = function(s) {
    var node = this.root;
    for (var i = 0; i < s.length; i++) {
        if (node.children.hasOwnProperty(s.charAt(i)))
            node = node.children[s.charAt(i)]
        else
            return false;
    }
    return true;

}

SuffixTrie.prototype.insert = function() {

}

var st = new SuffixTrie("abaaba");
var st1 = new SuffixTrie("aba")

console.log(st);
console.log(st.root.children["a"]);
console.log(st1.root.children["a"]);
console.log(st.search("abaaa"))