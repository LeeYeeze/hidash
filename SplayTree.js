/**
 * Created by yizeli on 3/10/15.
 */

function Node (key, value) {
    this.key = key;
    this.value = value;
    this.left = null;
    this.right = null;
}

function splay(node, key, compare) {
    if (typeof node === "undefined" || node === null) {
        return null;
    }
    var cmp1 = compare(key, node.key);
    if (cmp1 < 0) {
        if (node.left === null) {
            return node;
        }
        var cmp2 = compare(key,node.left.key);
        if (cmp2 < 0) {
            node.left.left = splay(node.left.left, key, compare);
            node = rotateRight(node);
        } else if (cmp2 > 0) {
            node.left.right = splay(node.left.right, key, compare);
            if (node.left.right !== null) {
                node.left = rotateLeft(node.left);
            }
        }
        if (node.left == null) {
            return node;
        } else {
            return rotateRight(node);
        }
    } else if (cmp1 > 0) {
        if (node.right === null) {
            return node;
        }
        var cmp2 = compare(key,node.right.key);
        if (cmp2 < 0) {
            node.right.left = splay(node.right.left,key, compare);
            if (node.right.left !== null) {
                node.right = rotateRight(node.right);
            }
        } else if (cmp2 > 0) {
            node.right.right = splay(node.right.right, key, compare);
            node = rotateLeft(node);
        }
        if (node.right === null) {
            return node;
        } else {
            return rotateLeft(node);
        }
    } else {
        return node;
    }
}

function rotateRight(node) {
    var x = node.left;
    node.left = x.right;
    x.right = node;
    return x;
}

function rotateLeft(node) {
    var x = node.right;
    node.right = x.left;
    x.left = node;
    return x;
}

function SplayTree(comparator) {
    this.root = null;
    this.comparator = comparator;
}

SplayTree.prototype.put =  function(key, value) {
    if (this.root === null) {
        this.root = new Node(key, value);
        return;
    }
    this.root = splay(this.root, key, this.comparator);
    var cmp = this.comparator(key, this.root.key);

    if (cmp > 0) {
        var n = new Node (key, value);
        n.right = this.root.right;
        n.left = this.root;
        this.root.right = null;
        this.root = n;

    } else if (cmp < 0) {
        var n = new Node (key, value);
        n.left = this.root.left;
        n.right = this.root;
        this.root.left = null;
        this.root = n;

    } else {
        this.root.value = value;
    }
};

SplayTree.prototype.remove = function(key) {
    if (this.root == null) {
        return;
    }
    this.root = splay(this.root, key, this.comparator);
    var cmp = this.comparator(key, this.root.key);

    if (cmp == 0) {
        if (this.root.left == null) {
            this.root = this.root.right;
        } else {
            var x = this.right;
            this.root = this.root.left;
            splay(this.root, key, this.comparator);
            this.root.right = x;
        }
    }
};

SplayTree.prototype.get = function(key) {
    this.root = splay(this.root, key, this.comparator);
    var cmp = this.comparator(key, this.root.key);
    //console.log(this.root);
    //console.log("==================")
    if (cmp === 0) {
        return this.root.value;
    } else {
        return null;
    }
};

SplayTree.prototype.contains = function(key) {
    this.root = splay(this.root, key, this.comparator);
    var cmp = this.comparator(key, this.root.key);
    //console.log(this.root);
    //console.log("+++++++++++++")
    if (cmp === 0) {
        return true;
    } else {
        return false;
    }
};

SplayTree.prototype.size = function() {

};



var st = new SplayTree(function (a,b) {
    return a - b;
});

st.put(1,1);
st.put(2,2);
st.put(3,3);
st.put(4,4);
st.put(5,5);
st.put(1,5);

//console.log(st.root);
console.log(st.get(1));
console.log(st.contains(1));
console.log(st.contains(3));
console.log(st.remove(1));
console.log(st.root);
//console.log(st.root);





