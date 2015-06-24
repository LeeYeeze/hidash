/**
 * Created by yizeli on 6/22/15.
 */
function Vector(array, checkFlag) {
    this.vector = array;
    if (checkFlag !== true) {
        this.justify();
    }
}

Vector.prototype.len = function() {
    return this.vector.length;
};

Vector.prototype.vAdd = function(v2) {
    if (!(v2 instanceof Vector)) {
        throw "Invalid Vector";
    } else if (this.len() !== v2.len()) {
        throw "Vectors with Different Dimension";
    } else {
        var v = this.vector.map(function (o,i) {
            return o + v2.vector[i];
        });
        return new Vector(v,true);
    }
};

Vector.prototype.vectorMultiply = function(v2) {
    if (!(v2 instanceof Vector)) {
        throw "Invalid Vector";
    } else if (this.len() !== v2.len()) {
        throw "Vectors with Different Dimension";
    } else {
        var v = this.vector.map(function (o,i) {
            return o * v2.vector[i];
        });
        return new Vector(v, true);
    }
};

Vector.prototype.scalarMultiply = function(num) {
    var n = Number(num);
    if (n !== n) {
        throw "Invalid Number";
    }
    var v = this.vector.map(function (o,i) {
        return n*o;
    });

    return new Vector(v, true);
};

Vector.prototype.justify = function() {
    this.vector = this.vector.map(Number);
    for (var i = 0 ; i < this.vector.length; i++) {
        if (this.vector[i] !== this.vector[i]) {
            throw "Invalid Number in Vector";
        }
    }
};

Vector.prototype.sumUp = function() {

};






function SparseMatrix(array) {
    this.sparseMatrix = array;
};

SparseMatrix.prototype.justify = function() {

};



function Matrix(array, checkFlag) {
    this.matrix = array;
    if (checkFlag !== true) {
        this.justify();
    }
};

Matrix.prototype.mAdd = function() {

};

Matrix.prototype.eachAdd = function() {

};



Matrix.prototype.complete = function() {

};

Matrix.prototype.justify = function() {

};

Matrix.prototype.shape = function() {

};

Matrix.prototype.reshape = function() {

};

Matrix.prototype.transpose = function() {

};

Matrix.prototype.matrixMultiply = function() {

};

Matrix.prototype.scalarMultiply = function() {

};

Matrix.prototype.power = function() {

};



function DataLib() {

};

DataLib.countByKey = DataLib.prototype.countByKey = function() {

};

DataLib.sortByKey = DataLib.prototype.sortByKey = function() {

};

DataLib.prototype.listByKey = function() {

};

DataLib.prototype.logisticRegression = function() {

};

function InfoEntropy() {


}

function InfoMationGain() {

}

function DecisionTree() {

}

function LogisticRegression() {

}


