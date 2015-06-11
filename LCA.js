/**
 * Created by yizeli on 5/28/15.
 */
function TreeNode(id) {
    this.id = id;
    this.children = [];

}

function BinaryTreeNode() {
    this.id = null;
    this.left = null;
    this.right = null;

}

function UnionFind(n) {
    this.parent = [];
    this.size = [];
    this.count = n;
    for (var i = 0; i < n; i++) {
        this.parent[i] = i;
        this.size[i] = i;
    }

}

UnionFind.prototype.find = function(x) {
    if (x < 0 || x >= this.parent.length) {
        return;
    }
    while (x != this.parent[x]) {
        x = this.parent[x];
    }
    return x;
};

UnionFind.prototype.union = function(x,y) {
    if (x <0 || x >= this.parent.length || y < 0 || y >= this.parent.length) {
        return;
    }


    x = this.find(x);
    y = this.find(y);
    if (x == y) {
        return;
    }
    if (this.size[x] >= this.size[y]) {
        this.parent[y] = x;
        this.size[x] += this.size[y];
    } else {
        this.parent[x] = y;
        this.size[y] += this.size[x];
    }

    this.count--
};


// assume p and q are on the tree
function findLCA(root, p, q, info) {
    if (root == null) {
        return;
    } else if (root == p) {
        info.foundP = true;
        if (!info.foundQ) {
            findLCA(root.left, p , q, info);
            if (info.foundQ) {
                info.lca = root;
                return;
            }
            findLCA(root.right, p , q, info);
            if (info.foundQ) {
                info.lca = root;
                return;
            }
        }
    } else if (root == q) {
        info.foundQ = true;
        if (!info.foundP) {
            findLCA(root.left, p , q, info);
            if (info.foundP) {
                info.lca = root;
                return;
            }
            findLCA(root.right, p , q, info);
            if (info.foundP) {
                info.lca = root;
                return;
            }
        }
    } else {
        var fP = info.foundP;
        var fQ = info.foundQ;
        var f = false;
        findLCA(root.left, p , q, info);
        if (info.lca != null) {
            return;
        }
        if (info.foundP!= fP || info.foundQ != fQ) {
            f = true;
        }
        findLCA(root.right, p , q, info);
        if (info.lca == null && info.foundP && info.foundQ && f) {
            info.lca = root;
        }

    }
    return info;
}


function LCA(root, p , q) {
    var info = {lca: null, foundP: false, foundQ: false};
    if (p == q) {
        info.lca = p;
        info.foundP = true;
        info.foundQ = true;
        return info;
    }
    findLCA(root, p, q, info);
    //console.log(info);
    return info;

}

function LCATarjan(root, queryPair, nodesArray) {
    var ancestor = [];
    var visited = [];
    var union = new UnionFind(nodesArray.length);
    Tarjan(root, queryPair, nodesArray, union, ancestor, visited);
}

function Tarjan(x, queryPair, nodesArray, union, ancestor,visited) {
    console.log(x);
    for (var i = 0; i < nodesArray[x].children.length; i++) {
        Tarjan(nodesArray[x].children[i], queryPair, nodesArray, union, ancestor, visited);
        union.union(x, nodesArray[x].children[i]);
        ancestor[union.find(x)] = x;

    }
    visited[x] = true;
    for (var i = 0; queryPair[x] != undefined && i < queryPair[x].length; i++) {
        if (visited[queryPair[x][i]]) {
            console.log("LCA of " + x + " and " + queryPair[x][i] + " is " + ancestor[union.find(queryPair[x][i])]);
        }
    }


}


function LCARMQ() {


}

function eulerTour() {

}


var a = {left : null, right : null, val : "a"};
var b = {left: null, right: null, val : "b"};
var p = {left : null, right : a, val:1};
var q = {left : null, right : b, val:2};
var root = {left: p, right: q, val:3};
var ids  = [0,1,2,3,4,5,6,7,8,9];

var tree = ids.map(function (num) {
    return new TreeNode(num);
});
for (var i = 0; i < tree.length -1 ; i++) {
    tree[i].children.push(i+1);
}
var ten = new TreeNode(10);
tree[1].children.push(10);
tree.push(ten);

var queryPair = [[1,2],[0,2],[0,1,10],[],[],[],[],[],[],[10],[2,9]];

LCATarjan(0,queryPair,tree);





//console.log(LCA(root, a, b));

