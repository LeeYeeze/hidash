/**
 * Created by yizeli on 3/9/15.
 */

function RedBlackTreeNode(key,color) {
    this.key = key;
    this.parent = null;
    // take 0 as red, 1 as black
    this.color = color;
    this.leftChild = null;
    this.rightChild = null;

}
RedBlackTreeNode.prototype.leftRotate = function() {

};

RedBlackTreeNode.prototype.rightRotate = function() {

};

//var nil = new RedBlackTreeNode(1);
function RedBlackTree() {
    this.nil = new RedBlackTreeNode(1,1);
    this.root = this.nil;
}

RedBlackTree.prototype.insert = function(node) {
    var y = this.nil;
    var x = this.root;
    while (x !== this.nil) {
        y = x;
        if (node.key < x.key) {
            x = x.leftChild;
        } else {
            x = x.rightChild;
        }
    }
    node.parent = y;
    if (y === this.nil) {
        this.root = node;
    } else if (node.key < y.key) {
        y.leftChild = node;
    } else {
        y.rightChild = node;
    }
    node.leftChild = this.nil;
    node.rightChild = this.nil;
    node.color = 0;
    insertionFixUp(this, node);
};

RedBlackTree.prototype.leftRotate = function() {

};

RedBlackTree.prototype.rightRotate = function() {

};

RedBlackTree.prototype.delete = function(node) {
    var move = node;
    var moveOriginalColor = move.color;
    var x;
    if (node.leftChild === this.nil) {
        x = node.rightChild;
        transplant(this, node, node.rightChild);
    } else if (node.rightChild === this.nil) {
        x = node.leftChild;
        transplant(this, node, node.leftChild)
    } else {
        move = this.minimum(node.rightChild);
        moveOriginalColor = move.color;
        x = move.rightChild;
        if (move.parent !== node) {
            transplant(this, move, x);
            move.rightChild = node.rightChild;
            move.rightChild.parent = move;
        }
        transplant(this,node, move);
        move.leftChild = node.leftChild;
        move.leftChild.parent = move;
        move.color = node.color;

    }
    if (moveOriginalColor === 1) {
        deleteFixup(this, x);
    }
};

RedBlackTree.prototype.predecessor = function() {

};

RedBlackTree.prototype.successor = function() {

};

RedBlackTree.prototype.minimum = function(node) {
    while (node.leftChild !== this.nil) {
        node = node.leftChild;
    }
    return node;
};

RedBlackTree.prototype.maximum = function() {

};

function transplant(tree, u, v) {
    if (u.parent === tree.nil) {
        tree.root = v;
    } else if (u === u.parent.leftChild) {
        u.parent.leftChild = v;
    } else {
        u.parent.rightChild = v;
    }
    v.parent = u.parent;
}

function leftRotate(tree, x) {
    y = x.rightChild;
    x.rightChild = y.leftChild;
    if (y.leftChild !== tree.nil) {
        y.leftChild.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === tree.nil) {
        tree.root = y;
    } else if (x === x.parent.leftChild) {
        x.parent.leftChild = y;
    } else  {
        x.parent.rightChild = y;
    }
    y.leftChild = x;
    x.parent = y;
}

function rightRotate(tree, x) {
    y = x.leftChild;
    x.leftChild = y.rightChild;
    if (y.rightChild!== tree.nil) {
        y.rightChild.parent = x;
    }
    y.parent = x.parent;
    if (x.parent === tree.nil) {
        tree.root = y;
    } else if (x === x.parent.leftChild) {
        x.parent.leftChild = y;
    } else  {
        x.parent.rightChild = y;
    }
    y.rightChild = x;
    x.parent = y;
}

function insertionFixUp (tree, node) {
    while (node.parent.color === 0) {
        if (node.parent === node.parent.parent.leftChild) {
            var uncle = node.parent.parent.rightChild;
            if (uncle.color === 0) {
                // case one, only recoloring is needed
                node.parent.color = 1;
                uncle.color = 1;
                node.parent.parent.color = 0;
                node = node.parent.parent;
            } else {
                if (node === node.parent.rightChild) {
                    // case two, node is a right child and its uncle is black;
                    node = node.parent;
                    leftRotate(tree, node);
                } else {
                    // case three
                    node.parent.color = 1;
                    node.parent.parent.color = 0;
                    rightRotate(tree, node.parent.parent);
                }

            }
        } else {
            var uncle = node.parent.parent.leftChild;
            if (uncle.color === 0) {
                // case one
                node.parent.color = 1;
                uncle.color = 1;
                node.parent.parent.color = 0;
                node = node.parent.parent;
            } else if(node === node.parent.leftChild) {
                // case two, node is a left child and its uncle is black;
                node = node.parent;
                rightRotate(tree, node);
            } else {
                node.parent.color = 1;
                node.parent.parent.color = 0;
                leftRotate(tree, node.parent.parent);
            }
        }
    }
    tree.root.color = 1;
}

function deleteFixUp(tree, node) {

}

var RBTree = new RedBlackTree();
RBTree.insert(new RedBlackTreeNode(6));
RBTree.insert(new RedBlackTreeNode(5));
RBTree.insert(new RedBlackTreeNode(4));
RBTree.insert(new RedBlackTreeNode(3));
RBTree.insert(new RedBlackTreeNode(12));
RBTree.insert(new RedBlackTreeNode(15));
RBTree.insert(new RedBlackTreeNode(8));
RBTree.insert(new RedBlackTreeNode(7));
RBTree.insert(new RedBlackTreeNode(12));
RBTree.insert(new RedBlackTreeNode(10));
RBTree.insert(new RedBlackTreeNode(11));
RBTree.insert(new RedBlackTreeNode(9));
RBTree.insert(new RedBlackTreeNode(2));
RBTree.insert(new RedBlackTreeNode(14));
RBTree.insert(new RedBlackTreeNode(1));

console.log(RBTree.root);


