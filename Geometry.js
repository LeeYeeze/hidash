/**
 * Created by yizeli on 6/24/15.
 */
function Polygon(pointArray) {

}

function Point2D(x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

function Line2D(end1, end2) {
    this.end1 = end1;
    this.end2 = end2;
}

function orientation(p,q,r) {
    var val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val == 0) {
        return 0;
    }
    return (val > 0) ? 1:2;
}

function onSegment(p,q,r) {
    if (r.x <= Math.max(p.x, q.x) && r.x >= Math.min(p.x, q.x) && r.y <= Math.max(p.y, q.y) && r.y >= Math.min(p.y, q.y)) {
        return true;
    }
    return false;
}

function intersect(p1, q1, p2, q2) {
    var o1 = orientation(p1,q1,p2);
    var o2 = orientation(p1,q1,q2);
    var o3 = orientation(p2,q2,p2);
    var o4 = orientation(p2,q2,p1);
    if (o1 !== o2 && o3 !== o4) {
        return true;
    } else if (o1 === 0 && o2 === 0 && o3 === 0 && o4 === 0) {
        if (onSegment(p1,q1,p2) || onSegment(p1,q1,q2)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function lineIntersect(line1, line2) {
    return intersect(line1.end1, line1.end2, line2.end1, line2.end2);
};

var p1 = new Point2D(1,1),
    p2 = new Point2D(1.5,1.5),
    p3 = new Point2D(2,2),
    p4 = new Point2D(4,4);

console.log(intersect(p1,p2,p3,p4));

