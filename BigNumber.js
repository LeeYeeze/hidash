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

function BigIntegerMultiply(num1, num2) {
    var buffer = [];
    if (num1 == null || num2 == null || num1.length == 0 || num2.length == 0) {
        return;
    }
    var num = 0;
    //var zero = '0'.charCodeAt(0);
    for (var i = num1.length+num2.length; i>0; i--) {
        for (var j = Math.min(i-1, num1.length); j>0; j--) {
            if (i-j<=num2.length) {
                var operand1 = typeof num1 == "string"? num1.charAt(j-1) - 0: parseInt(num1[j-1]);
                var operand2 = typeof num2 == "string"? num2.charAt(i-j-1) - 0: parseInt(num2[i-j-1]);
                num+= operand1 * operand2;
            }
        }
        if (i!=1 || num>0) {
            buffer.push(num%10);
        }
        num = Math.floor(num/10);

    }
    return buffer.reverse().join('');
}

function addBigInteger(num1, num2) {
    var buffer = [];
    if (num1 == null || num2 == null || num1.length == 0 || num2.length == 0)
        return null;
    var index1 = num1.length -1;
    var index2 = num2.length -1;
    var carry = 0;
    while (index1 >= 0 && index2 >= 0) {
        var operand1 = typeof num1 == "string"?num1.charAt(index1)-0:parseInt(num1[index1]);
        var operand2 = typeof num2 == "string"?num2.charAt(index2)-0:parseInt(num2[index2]);
        var res = (operand1 + operand2 + carry)%10;
        carry = Math.floor((operand1 + operand2 + carry)/10);
        buffer.push(String(res));
        index1--;
        index2--;
    }
    while (index1>=0) {
        var operand1 = typeof num1 == "string"?num1.charAt(index1)-0:parseInt(num1[index1]);
        var res = (operand1 + carry)%10;
        carry = Math.floor((operand1 + carry)/10);
        buffer.push(String(res));
        index1--;
    }
    while (index2>=0) {
        var operand2 = typeof num2 == "string"?num2.charAt(index2)-0:parseInt(num2[index2]);
        var res = (operand2 + carry)%10;
        carry = Math.floor((operand2 + carry)/10);
        buffer.push(String(res));
        index2--;
    }
    if (carry > 0)
        buffer.push(String(carry));
    return buffer.reverse().join('');
}

function BigIntegerAddReturnLastCarry() {

}

function addBigNumberDecimalFractionWithCarry(num1, num2) {

}

function isOctDigit(ch) {
    return (ch >= '0' && ch <= '7');
}

function isDigit(ch) {
    return (ch >= '0' && ch <= '9');
}

function isHexDigit(ch) {
    return (ch >= '0' && ch <= '9') || (ch >= 'a'&& ch <= 'f') || (ch >='A' && ch <= 'F');
}
function parseStringInteger(s, i, buffer) {
    while (i < s.length && isDigit(s.charAt(i))) {
        buffer.push(s.charAt(i));
        i++;
    }
    return i;
}
function parseDecimalFraction(s,i,buffer) {
    i++;
    //parseStringInteger(s, i ,buffer);
}

function parseOctal(s, i , buffer) {
    while (i < s.length && isOctDigit(s.charAt(i))) {
        buffer.push(s.charAt(i));
        i++;
    }
    return i;
}

function parseHexDecimal(s, i, buffer) {
    while (i < s.length && isHexDigit(s.charAt(i))) {
        buffer.push(s.charAt(i));
        i++;
    }
    return i;
}

function parseDecimal(s, i , buffer) {
    while (i < s.length && isDigit(s.charAt(i))) {
        buffer.push(s.charAt(i));
        i++;
    }
    return i;
}

function parseStartWithZero(s, i, buffers) {
    i++;
    buffers.buffer1.push('0');
    if (i>= s.length)
        return i;
    var ch = s.charAt(i);
    if (ch == '.') {
        i++;
        i = parseDecimal(s, i, buffers.buffer2);
        if (i >= s.length)
            return i;
        ch = s.charAt(i);
        if (ch == 'e' || ch == 'E') {
            i++;
            if (i >= s.length)
                return --i;
            if (s.charAt(i) == '-' || s.charAt(i) == '+') {
                if (s.charAt(i) == '-')
                    buffers.eNegative = true;
                i++;
            }
            if (i >= s.length)
                return --i;
            i = parseDecimal(s, i, buffers.buffer3);
        }

    } else if (ch == 'e' || ch == 'E') {
        i++;
        if (i >= s.length)
            return --i;
        if (s.charAt(i) == '-' || s.charAt(i) == '+') {
            if (s.charAt(i) == '-')
                buffers.eNegative = true;
            i++;
        }
        if (i >= s.length)
            return --i;
        i = parseDecimal(s, i, buffers.buffer3);
    } else if (ch == 'x' || ch == 'X') {
        i++;
        if (i >= s.length)
            return --i;
        i = parseHexDecimal(s, i, buffers.hexBuffer);
    } else if (isOctDigit(ch)) {
        buffers.octBuffer = buffers.buffer1;
        i = parseOctal(s, i, buffers.octBuffer);
        if (i < s.length && isDigit(s.charAt(i))) {
            //buffer1 = buffer1.concat(octBuffer);
            buffers.octBuffer = [];
            i = parseDecimal(s, i , buffers.buffer1);
        } else {
            //octBuffer = buffer1.concat(octBuffer);
            buffers.buffer1 = [];
        }
    } else if (isDigit(ch)) {
        i = parseDecimal(s, i , buffers.buffer1);
    }
    return i;

}


function parseStringNumber(s) {
    if (s == null) {
        throw "Invalid Number";
    }
    s = s.trim();
    if (s.length === 0)
        throw "Invalid Number";
    var buffers = {
        buffer1:[],
        buffer2:[],
        buffer3:[],
        hexBuffer:[],
        octBuffer:[],
        negative: false,
        eNegative: false
    };
    var buffer1 = buffers.buffer1;
    var buffer2 = buffers.buffer2;
    var buffer3 = buffers.buffer3;
    var hexBuffer = buffers.hexBuffer;
    var octBuffer = buffers.octBuffer;
    var i = 0;
    switch (s.charAt(i)) {
        case '-':
            buffers.negative = true;
        case '+':
            //buffers.buffer1.push(s.charAt(i));
            i++;
            if (i >= s.length)
                throw "Invalid Number";
            var ch = s.charAt(i);
            if (ch =='0') {
                i = parseStartWithZero(s, i , buffers);
            } else if (isDigit(ch)) {
                while (i < s.length && isDigit(s.charAt(i))) {
                    buffers.buffer1.push(s.charAt(i));
                    i++;
                }
                if (i < s.length && s.charAt(i) == '.') {
                    i++;
                    while (i < s.length && isDigit(s.charAt(i))) {
                        buffers.buffer2.push(s.charAt(i));
                        i++;
                    }
                }
                if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                    i++;
                    if (i < s.length && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                        //buffers.buffer3.push(s.charAt(i));
                        if (s.charAt(i) == '-')
                            buffers.eNegative = true;
                        i++;
                    }
                    if (i >= s.length || !isDigit(s.charAt(i))) {
                        throw "Digits expected in exponent part ";
                    }
                    while (i < s.length && isDigit(s.charAt(i))) {
                        buffers.buffer3.push(s.charAt(i));
                        i++;
                    }
                }

            } else if (ch == '.') {
                buffers.buffer1[0] = '0';
                i++;
                if (i >= s.length || !isDigit(s.charAt(i))) {
                    i--;
                    break;
                }
                while (i < s.length && isDigit(s.charAt(i))) {
                    buffers.buffer2.push(s.charAt(i));
                    i++;
                }
                if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                    i++;
                    if (i < s.length && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                        if (s.charAt(i) == '-')
                            buffers.eNegative = true;
                        i++;
                    }
                    if (i >= s.length || !isDigit(s.charAt(i))) {
                        throw "Digits expected in exponent part ";
                    }
                    while (i < s.length && isDigit(s.charAt(i))) {
                        buffers.buffer3.push(s.charAt(i));
                        i++;
                    }
                }
            } else {
                break;
            }
            break;

        case '.':
            buffers.buffer1[0] = '0';
            i++;
            if (i >= s.length || !isDigit(s.charAt(i))) {
                i--;
                break;
            }
            while (i < s.length && isDigit(s.charAt(i))) {
                buffers.buffer2.push(s.charAt(i));
                i++;
            }
            if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                i++;
                if (i < s.length && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                    if (s.charAt(i) == '-')
                        buffers.eNegative = true;
                    i++;
                }
                if (i >= s.length || !isDigit(s.charAt(i))) {
                    throw "Digits expected in exponent part ";
                }
                while (i < s.length && isDigit(s.charAt(i))) {
                    buffers.buffer3.push(s.charAt(i));
                    i++;
                }
            }
            break;
        case '0':
            i = parseStartWithZero(s,i,buffers);
            break;

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            while (i < s.length && isDigit(s.charAt(i))) {
                buffers.buffer1.push(s.charAt(i));
                i++;
            }
            if (i < s.length && s.charAt(i) == '.') {
                i++;
            }
            while (i < s.length && isDigit(s.charAt(i))) {
                buffers.buffer2.push(s.charAt(i));
                i++;
            }
            if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                i++;
                if (i < s.length && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                    if (s.charAt(i) == '-')
                        buffers.eNegative = true;
                    i++;
                }
                if (i >= s.length || !isDigit(s.charAt(i))) {
                    throw "Digits expected in exponent part ";
                }
                while (i < s.length && isDigit(s.charAt(i))) {
                    buffers.buffer3.push(s.charAt(i));
                    i++;
                }
            }

            break;

        default:
            throw "Invalid Number";
    }
    if (i < s.length)
        throw  "Invalid Number";
    else {

        return buffers;


    }
}

function isWhitespace(ch) {
    switch (ch) {
        case ' ':
        case '\t':
        case '\n':
        case '\f':
            return true;
    }
    return false;
}

function BigNumber(s) {
    this.numString = s.trim();
    this.buffers = parseStringNumber(s);

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

var dog = new BigNumber("-.1");
console.log(dog);
//console.log(stringIntegerMultiply(['1','2','3'],"000001"));
//console.log(parseStringNumber(".5e-335"));

console.log(addBigInteger("11","999"));








