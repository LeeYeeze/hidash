/**
 * Created by yizeli on 3/7/15.
 */

function AVLTreeNode(val,left,right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
    this.height = 0;
}

function AVLTree(comparator) {
    this.comparator = comparator;
    this.root = null;
}

AVLTree.prototype.height = function(node) {
    if (typeof node === "undefined" || node === null)
        return -1;
    else
        return node.height;
};

AVLTree.prototype.singleRotateFromLeft = function(k2) {
    var k1 = k2.left;
    k2.left = k1.right;
    k1.right = k2;
    k2.height = Math.max(this.height(k2.left), this.height(k2.right))+1;
    k1.height = Math.max(this.height(k1.left), k2.height)+1;
    return k1;

};

AVLTree.prototype.singletRotateFromRight = function(k1) {
    var k2 = k1.right;
    k1.right = k2.left;
    k2.left = k1;
    k1.height = Math.max(this.height(k1.left), this.height(k1.right))+1;
    k2.height = Math.max();
    return k2;
};

AVLTree.prototype.doubleRotateFromLeft = function(k3) {
    k3.left = this.singletRotateFromRight(k3.left);
    return this.singleRotateFromLeft(k3);
};

AVLTree.prototype.doubleRotateFromRight = function(k1) {
    k1.right = this.singleRotateFromLeft(k1.right);
    return this.singletRotateFromRight(k1);
};

AVLTree.prototype.findMin2 = function(node) {
    if (typeof node === "undefined" || node ===null)
        return null;
    else if (typeof node.left === "undefined" || node.left === null) {
        return node;
    }
    return this.findMin2(node.left);
};

AVLTree.prototype.findMin = function(node) {
    if (typeof node !== "undefined" && node !== null) {
        while (typeof node.left !== "undefined" && node.left !== null) {
            node = node.left;
        }
    }
    return node;
};

AVLTree.prototype.findMax = function(node) {
    if (typeof node !== "undefined" && node !== null) {
        while (typeof node.right !== "undefined" && node.right !== null) {
            node = node.right;
        }
    }
    return node;
};

AVLTree.prototype.nodeRemove = function(x, node) {
    if (typeof node === "undefined" || node === null)
        return node;
    var compareResult = this.comparator(x, node.val);
    if (compareResult < 0) {
        node.left = this.nodeRemove(x, node.left);
    } else if (compareResult>0){
        node.right = this.nodeRemove(x, node.right);
    } else if (node.left !== null && node.right!=null) {
        node.val = this.findMin(node.right).val;
        node.right = this.nodeRemove(node.val, node.right);
    } else {
        node = (node.left !== null) ? node.left: node.right;
    }
    return this.balance(node);
};

AVLTree.prototype.balance = function(node) {
    if (typeof node === "undefined" || node === null)
        return node;
    var diff = this.height(node.left)-this.height(node.right);
    if (diff > 1) {
        if (this.height(node.left.left) >= this.height(node.left.right)) {
            node = this.singleRotateFromLeft(node);
        } else {
            node = this.doubleRotateFromLeft(node);
        }
    } else if (diff < -1) {
        if (this.height(node.right.right) >= this.height(node.right.left)) {
            node = this.singletRotateFromRight(node);
        } else {
            node = this.doubleRotateFromRight(node);
        }
    }
    node.height = Math.max(this.height(node.left), this.height(node.right))+1;
    return node;
};

AVLTree.prototype.nodeInsert = function(x, node) {
    if (typeof node === "undefined" || node === null)
        return new AVLTreeNode(x);
    var compareResult = this.comparator(x, node.val);
    if (compareResult<0) {
        node.left = this.nodeInsert(x, node.left);
    } else if (compareResult>0) {
        node.right = this.nodeInsert(x, node.right);
    }
    return this.balance(node);
};

AVLTree.prototype.search = function(x) {
    var cur = this.root;
    while (typeof cur !== "undefined" && cur !== null ) {
        var compareResult = this.comparator(x, cur.val);
        if (compareResult < 0) {
            cur = cur.left;
        } else if (compareResult > 0){
            cur = cur.right;
        } else
            return true;

    }
    return false;
};

AVLTree.prototype.insert = function(x) {
    this.root = this.nodeInsert(x,this.root);
};

AVLTree.prototype.remove = function(x) {
    this.root = this.nodeRemove(x, this.root);
};


