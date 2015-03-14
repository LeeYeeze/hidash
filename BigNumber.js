/**
 * Created by yizeli on 3/12/15.
 */

function StringBuilder() {
    this.buffer = [];
}

StringBuilder.prototype.append = function() {

}

StringBuilder.prototype.reverse = function() {

};

StringBuilder.prototype.toString = function() {

};



function stringIntegerMultiply(num1, num2) {
    var buffer = [];
    if (num1 == null || num2 == null || num1.length == 0 || num2.length == 0) {
        return;
    }
    var num = 0;
    var zero = '0'.charCodeAt(0);
    for (var i = num1.length+num2.length; i>0; i--) {
        for (var j = Math.min(i-1, num1.length); j>0; j--) {
            if (i-j<=num2.length) {
                num+= (num1.charCodeAt(j-1)-zero)*(num2.charCodeAt(i-j-1)-zero);
            }
        }
        if (i!=1 || num>0) {
            buffer.push(num%10);
        }
        num = Math.floor(num/10);

    }
    return buffer.reverse().join('');
}

function BigNumber(s) {
    this.numString = s;
}
BigNumber.prototype.isValidNumber = function() {

};

BigNumber.prototype.add= function(big) {

};

BigNumber.prototype.multiply = function(big) {

};

BigNumber.prototype.divide = function(big) {

};

BigNumber.prototype.sqrt = function(big) {

};

BigNumber.prototype.toFixed = function() {

};






