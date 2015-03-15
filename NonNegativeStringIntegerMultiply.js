/**
 * Created by yizeli on 3/13/15.
 */

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
            i = parseDecimal(s, i, buffers.buffer3);
        }

    } else if (ch == 'e' || ch == 'E') {
        i++;
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
        return false;
    }
    s = s.trim();
    if (s.length === 0)
        return false;
    var buffers = {
        buffer1:[],
        buffer2:[],
        buffer3:[],
        hexBuffer:[],
        octBuffer:[]
    };
    var buffer1 = buffers.buffer1;
    var buffer2 = buffers.buffer2;
    var buffer3 = buffers.buffer3;
    var hexBuffer = buffers.hexBuffer;
    var octBuffer = buffers.octBuffer;
    var i = 0;
    switch (s.charAt(i)) {
        case '+':
        case '-':
            buffers.buffer1.push(s.charAt(i));
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
                        buffers.buffer3.push(s.charAt(i));
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
                        buffers.buffer3.push(s.charAt(i));
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
                    buffers.buffer3.push(s.charAt(i));
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
                    buffers.buffer3.push(s.charAt(i));
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

console.log(stringIntegerMultiply("123","123"));
console.log(parseStringNumber("-011"));