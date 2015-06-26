/**
 * Created by yizeli on 6/4/15.
 */

function ACNode() {
    this.code = null;
    this.children = [];
    this.parent = null;
    this.pre = null;
    this.isWord = false;
    this.level = 0;
    this.count = 0;
}

ACNode.prototype.setPre = function(root) {

    if (this.parent === null) {
        return;
    } else {
        var candidate  = this.parent.pre;
        while (candidate !== null) {
            if (typeof candidate.children[this.code] !== "undefined") {
                this.pre = candidate.children[this.code];
                break;
            } else {
                candidate = candidate.pre;
            }
        }
        if (this.pre === null) {
            this.pre = root;
        }
    }
};

ACNode.prototype.findPre = function() {
    return this.pre;
};


function ACAutomata(arrayOfStrings) {
    this.root = new ACNode();
    this.init(arrayOfStrings);
}

ACAutomata.prototype.init = function(arrayOfStrings) {
    var current;
    for (var i = 0; i < arrayOfStrings.length; i++) {
        current = this.root;
        for (var j = 0; j < arrayOfStrings[i].length; j++) {
            if (typeof current.children[arrayOfStrings[i].charCodeAt(j)] === "undefined") {
                current.children[arrayOfStrings[i].charCodeAt(j)] = new ACNode();
                current.children[arrayOfStrings[i].charCodeAt(j)].parent = current;
                current.children[arrayOfStrings[i].charCodeAt(j)].code = arrayOfStrings[i].charCodeAt(j);
                current.children[arrayOfStrings[i].charCodeAt(j)].level = current.level + 1;
                //current.children[arrayOfStrings[i].charCodeAt(j)].count = current.count;
            }
            current = current.children[arrayOfStrings[i].charCodeAt(j)];
            if (j === arrayOfStrings[i].length - 1) {
                current.isWord = true;
                current.count = 1;
            }
        }
    }
    var stack = [this.root];
    var newStack = [];
    var level = 0;
    while (stack.length > 0) {
        var node = stack.pop();

        if (level == 1) {
            node.pre = this.root;
        } else if (level > 1) {
            node.setPre(this.root);
        }

        if (node !== this.root) {
            node.count  = node.pre.count + (node.isWord? 1: 0);
        }

        for (var i = 0 ; i < node.children.length; i++) {
            if(typeof node.children[i] !== "undefined") {
                newStack.push(node.children[i]);
            }
        }

        if (stack.length === 0) {
            level++;
            var temp = stack;
            stack = newStack;
            newStack = temp;
        }
    }
};

ACAutomata.prototype.searchWithDup = function(text) {
    var current = this.root;
    var res = 0;
    for (var i = 0; i < text.length; i++) {
        while (current !== this.root && typeof current.children[text.charCodeAt(i)] === "undefined") {
            current = current.pre;
        }
        current = current.children[text.charCodeAt(i)];
        if (typeof current === "undefined") {
            current = this.root;
        }
        /*
        var temp = current;
        while (temp !== this.root) {
            res += temp.isWord? 1: 0;
            temp = temp.pre;
        }
        */

        res += current.count;

    }
    return res;
};

ACAutomata.prototype.searchWithoutDup = function() {

};

var ac = new ACAutomata(["apple","pear","insomnia","app","p"]);
console.log(ac.root);
console.log(ac.searchWithDup("apppear"));
