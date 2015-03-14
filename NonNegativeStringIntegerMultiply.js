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

function isValidNumber(s) {
    if (s==null)
        return false;
    s = s.trim();
    if (s.length == 0)
        return false;
    var dotFlag = false;
    var eFlag = false;
    for (var i = 0; i < s.length; i++) {
        switch (s.charAt(i)) {
            case '.':
                if (dotFlag || eFlag || ((i==0||!(s.charAt(i-1)>='0'&& s.charAt(i-1)<='9')) && (i== s.length-1))) {
                    return false;
                }
                dotFlag = true;
                break;
            case '+':
            case '-':
                break;
            case 'E':
            case 'e':
                if (eFlag || i== s.length -1 || i == 0 ) {
                    return false;
                }
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                break;
            default:
                return false;
        }
    }
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
    parseStringInteger(s, i ,buffer);
}

function parseOctal() {

}

function parseHexDecimal() {

}


function parseStringNumber(s) {
    if (s == null) {
        return false;
    }
    s = s.trim();
    if (s.length === 0)
        return false;
    var buffer1 = [];
    var buffer2 = [];
    var buffer3 = [];
    var buffer4 = [];
    var i = 0;
    switch (s.charAt(i)) {
        case '+':
        case '-':
            buffer1.push(s.charAt(i));
            i++;
            if (i >= s.length)
                throw "Invalid Number";
            var ch = s.charAt(i);
            if (ch =='0') {

            } else if (isDigit(ch)) {
                while (i < s.length && isDigit(s.charAt(i))) {
                    buffer1.push(s.charAt(i));
                    i++;
                }
                if (i < s.length && s.charAt(i) == '.') {
                    i++;
                    while (i < s.length && isDigit(s.charAt(i))) {
                        buffer2.push(s.charAt(i));
                        i++;
                    }
                    if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                        i++;
                        if (i < s.length && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                            buffer3.push(s.charAt(i));
                            i++;
                        }
                        if (i >= s.length || !isDigit(s.charAt(i))) {
                            throw "Digits expected in exponent part ";
                        }
                        while (i < s.length && isDigit(s.charAt(i))) {
                            buffer3.push(s.charAt(i));
                            i++;
                        }
                    }
                }
            } else if (ch == '.') {
                i++;
                if (i >= s.length || !isDigit(s.charAt(i))) {
                    i--;
                    break;
                }
                while (i < s.length && isDigit(s.charAt(i))) {
                    buffer2.push(s.charAt(i));
                    i++;
                }
                if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                    i++;
                    if (i < s.length && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                        buffer3.push(s.charAt(i));
                        i++;
                    }
                    if (i >= s.length || !isDigit(s.charAt(i))) {
                        throw "Digits expected in exponent part ";
                    }
                    while (i < s.length && isDigit(s.charAt(i))) {
                        buffer3.push(s.charAt(i));
                        i++;
                    }
                }
            } else {
                break;
            }
            break;


            break;
        case '.':
            i++;
            if (i >= s.length || !isDigit(s.charAt(i))) {
                i--;
                break;
            }
            while (i < s.length && isDigit(s.charAt(i))) {
                buffer2.push(s.charAt(i));
                i++;
            }
            if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                i++;
                if (i < s.length && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                    buffer3.push(s.charAt(i));
                    i++;
                }
                if (i >= s.length || !isDigit(s.charAt(i))) {
                    throw "Digits expected in exponent part ";
                }
                while (i < s.length && isDigit(s.charAt(i))) {
                    buffer3.push(s.charAt(i));
                    i++;
                }
            }
            break;
        case '0':
            buffer1[0] = '0';
            i++;
            if (i >= s.length) {
                break;
            } else if (s.charAt(i) == '.') {
                if (i < s.length && s.charAt(i) == '.') {
                    i++;
                    while (i < s.length && isDigit(s.charAt(i))) {
                        buffer2.push(s.charAt(i));
                        i++;
                    }
                    if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                        i++;
                        if (i < s.length && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                            buffer3.push(s.charAt(i));
                            i++;
                        }
                        if (i >= s.length || !isDigit(s.charAt(i))) {
                            throw "Digits expected in exponent part ";
                        }
                        while (i < s.length && isDigit(s.charAt(i))) {
                            buffer3.push(s.charAt(i));
                            i++;
                        }
                    }
                }
                break;
            } else if (s.charAt(i) == 'e' || s.charAt(i) == 'E') {

            } else if (s.charAt(i) == 'x') {

            } else if (isOctDigit(s.charAt(i))) {

            } else if (isDigit(s.charAt(i))) {

            } else {
                break;
            }

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
                buffer1.push(s.charAt(i));
                i++;
            }
            if (i < s.length && s.charAt(i) == '.') {
                i++;
                while (i < s.length && isDigit(s.charAt(i))) {
                    buffer2.push(s.charAt(i));
                    i++;
                }
                if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E')) {
                    i++;
                    if (i < s.length && (s.charAt(i) == '+' || s.charAt(i) == '-')) {
                        buffer3.push(s.charAt(i));
                        i++;
                    }
                    if (i >= s.length || !isDigit(s.charAt(i))) {
                        throw "Digits expected in exponent part ";
                    }
                    while (i < s.length && isDigit(s.charAt(i))) {
                        buffer3.push(s.charAt(i));
                        i++;
                    }
                }
            }
            break;

        default:
            throw "Invalid Number";
    }
    if (i < s.length)
        throw  "Invalid Number";
    else {
        return {buffer1: buffer1, buffer2: buffer2, buffer3: buffer3};


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
console.log(parseStringNumber("1."));