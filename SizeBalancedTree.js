/**
 * Created by yizeli on 6/10/15.
 */
function SizeBalancedTreeNode(key,size) {
    this.key = key;
    this.parent = null;
    this.size = size || 0;
    this.leftChild = null;
    this.rightChild = null;
}

function leftRotate(tree, x) {
    y = x.rightChild;
    x.rightChild = y.leftChild;
    y.leftChild = x;
    y.size = x.size;
    x.size = (x.leftChild === null ? 0:x.leftChild.size) + (x.rightChild === nullx.rightChild.size) + 1;
}

function rightRotate(tree, x) {
    y = x.leftChild;
    x.leftChild = y.rightChild;
    y.rightChild = x;
    y.size = x.size;
    x.size = (x.leftChild === null ? 0:x.leftChild.size) + (x.rightChild === null?0:x.rightChild.size) + 1;
}