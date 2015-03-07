/**
 * Created by yizeli on 3/7/15.
 */
function SuffixTreeNode(start, end) {
    this.edges = {};
    this.link = null;
    this.start = start;
    this.end = end;
}

SuffixTreeNode.prototype.getEdgeLength = function (position) {
    if (this.end == "#")
        return position+1- this.start;
    else
        return this.end - this.start;
}

SuffixTreeNode.prototype.insert = function(x) {

}

function SuffixTreeEdge(start, end, startChar) {
    this.start = start;
    this.end = end;
    this.startChar = startChar;
}

function SuffixTreeActivePoint(activeNode, activeEdge, activeLength) {
    this.activeNode = activeNode;
    this.activeEdge = activeEdge;
    this.activeLength = activeLength;
}

function SuffixTree(s) {
    this.text = s;
    this.root = new SuffixTreeNode();
    this.remainder = 0;
    this.position = -1;
    this.nodes = [];
    this.needSuffixNode = null;

    this.activePoint = new SuffixTreeActivePoint(this.root, null, 0);
    for (var i = 0; i < s.length; i++) {
        var prefix = s.substring(0,i+1);
        var ch = s.charAt(i);
        this.position++;
        this.remainder++;
        this.needSuffixLinkNode = null;
        while (this.remainder>0) {
            if (this.activePoint.activeLength === 0)
                this.activePoint.activeEdge = this.position;
            if (!this.nodes[this.activePoint.activeNode].edges.hasOwnProperty(this.text.charAt(this.activePoint.activeEdge))) {
                var leaf = new SuffixTreeNode(this.position,"#");
                this.activePoint.activeNode.edges[this.text.charAt(this.activePoint.activeEdge)] = leaf;
                this.addSuffixLink(this.activePoint.activeNode);
            } else {
                var next = this.activePoint.activeNode.edges[this.text.charAt(this.activePoint.activeEdge)];
                if (this.findNode(next))
                    continue;
                if (this.text.charAt(next.start+this.activePoint.activeLength) == ch) {
                    this.activePoint.activeLength++;
                    this.addSuffixLink(this.activePoint.activeNode);
                    break;
                }
                var split = new SuffixTreeNode(next.start, next.start+this.activePoint.activeLength);
                this.activePoint.activeNode.edges[this.text.charAt(this.activePoint.activeEdge)] = split;
                var leaf = new SuffixTreeNode(this.position, "#");
                split.edges[ch] = leaf;
                next.start += this.activePoint.activeLength;
                split.edges[this.text.charAt(next.start)] = next;
                this.addSuffixLink(split);

            }
            this.remainder--;
            if (this.activePoint.activeNode === this.root && this.activePoint.activeLength > 0) {
                this.activePoint.activeLength--;
                this.activePoint.activeEdge = this.position - this.remainder + 1;

            } else {
                this.activePoint.activeNode = this.activePoint.activeNode.link == null?this.root:this.activePoint.activeNode.link;
            }

        }

    }
}

SuffixTree.prototype.findNode = function(next) {
    if (this.activePoint.activeLength>=next.getEdgeLength(this.position)) {
        this.activePoint.activeEdge += next.getEdgeLength(this.position);
        this.activePoint.activeLength -= next.getEdgeLength(this.position);
        this.activePoint.activeNode = next;
        return true;
    }
    // need not to jump to another node
    return false;
}

SuffixTree.prototype.addSuffixLink = function(node) {
    if (this.needSuffixLinkNode != null) {
        this.needSuffixLinkNode.link = node;
    }
    this.needSuffixLinkNode = node;
}

SuffixTree.prototype.insert = function(x) {

}

SuffixTree.prototype.search = function(x) {

}

SuffixTree.prototype.printTree = function() {

}

