/**
 * Created by yizeli on 3/12/15.
 */

function StringBuilder() {
    this.buffer = [];
}

StringBuilder.prototype.append = function() {

};

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
            buffer.push(String(num%10));
        }
        num = Math.floor(num/10);

    }
    return buffer.reverse();
}

function fractionMultiply() {


}

function fractionDivide() {

}

function fractionAdd() {

}

function fractionSubtract() {

}

function addBigPositiveInteger(num1, num2, startCarry) {
    var buffer = [];
    if (num1 == null || num2 == null)
        return null;
    var index1 = num1.length -1;
    var index2 = num2.length -1;
    var carry = startCarry || 0;
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
    return buffer.reverse();
}

function BigIntegerAddReturnLastCarry() {

}

function addBigNumberDecimalFractionWithCarry(num1, num2) {
    var res = [];
    var carry = 0;
    if (!(num1 == null || num1.length == 0) || !(num2 == null || num2.length == 0)) {
        var index1 = num1 == null ? -1:num1.length -1;
        var index2 = num2 == null ? -1:num2.length -1;
        for (var index = Math.max(index1, index2); index >= 0; index--) {
            var operand1 = index > index1? 0: typeof num1 == "string"? Number(num1.charAt(index)): Number(num1[index]);
            var operand2 = index > index2? 0: typeof num2 == "string"? Number(num2.charAt(index)): Number(num2[index]);
            var add = (operand1 + operand2 + carry)%10;
            carry = Math.floor((operand1 + operand2 + carry)/10);
            res[index] = String(add);
        }
    }
    return {carry: carry, res: res};
}

function addBigNumberDecimalFractionWithDifferentSign(num1, num2) {
    //num1 is positive, num2 is negative
    var res = [];
    var carry = 0;
    if (!(num1 == null || num1.length == 0) || !(num2 == null || num2.length == 0)) {
        var index1 = num1 == null ? -1:num1.length -1;
        var index2 = num2 == null ? -1:num2.length -1;
        for (var index = Math.max(index1, index2); index >= 0; index--) {
            var operand1 = index > index1? 0 : typeof num1 == "string"? Number(num1.charAt(index)): Number(num1[index]);
            var operand2 = index > index2? 0 : typeof num2 == "string"? Number(num2.charAt(index)): Number(num2[index]);
            var temp = operand1 - operand2 + carry;
            var digit = temp<0 ? 10+temp: temp;
            carry = temp<0? -1 : 0;
            res[index] = String(digit);
        }
    }
    return {carry: carry, res: res};
}

function addBigNumberDecimalFractionWithSign (num1, num2, negFlag1, negFlag2) {
    var res;
   if (!negFlag1 && !negFlag2) {
        res = addBigNumberDecimalFractionWithCarry(num1, num2);
   } else if (negFlag1 && negFlag2) {
        res = addBigNumberDecimalFractionWithCarry(num1, num2);
   } else if (!negFlag1 && negFlag2) {
        res = addBigNumberDecimalFractionWithDifferentSign(num1, num2);
   } else {
        res = addBigNumberDecimalFractionWithDifferentSign(num2, num1);
   }
    return res;
}

function addBigIntegerWithSign(num1, num2, negFlag1, negFlag2, startCarry) {
    //var negFlagOfResult = false;
    var res = {};
    if (negFlag1 && negFlag2) {
        res.abs = addBigPositiveInteger(num1, num2, startCarry);
        res.negFlag = true;
    } else if (!negFlag1 && !negFlag2) {
        res.abs = addBigPositiveInteger(num1, num2, startCarry);
        res.negFlag = false;
    } else if (!negFlag1 && negFlag2) {
        res = addBigPositiveAndNegativeInteger(num1, num2, startCarry);
    } else {
        res = addBigPositiveAndNegativeInteger(num2, num1, startCarry);
    }
    return res;

}

function addBigIntegerWithSignWithoutCarryFromDecimalPart(num1, num2, negFlag1, negFlag2) {
    var res = {};
    if (negFlag1 && negFlag2) {
        res.abs = addBigPositiveInteger(num1, num2, 0);
        res.negFlag = true;
    } else if (!negFlag1 && !negFlag2) {
        res.abs = addBigPositiveInteger(num1, num2, 0);
        res.negFlag = false;
    } else if (!negFlag1 && negFlag2) {
        res = addBigPositiveAndNegativeInteger(num1, num2, 0);
        if (res.negFlag == true) {
            res = addBigPositiveAndNegativeInteger(num2, num1, 0);
            res.negFlag = true;
        }
    } else {
        res = addBigPositiveAndNegativeInteger(num2, num1, 0);
        if (res.negFlag == true) {
            res = addBigPositiveAndNegativeInteger(num1, num2, 0);
            res.negFlag = true;
        }
    }
    return res;
}

function trimPrefixZeros(arr) {
    if (arr == null || arr.length == 0 || arr[0]!=0)
        return;
    var i = 0;
    while (arr[i] == 0) {
        i++;
    }
    arr.splice(0,i);
    if (arr.length == 0) {
        arr[0] = 0;
    }
    return arr;

}

function trimSuffixZeros(arr) {
    if (arr == null || arr.length == 0 || arr[arr.length -1] !=0)
        return;
    var i = arr.length - 1;
    while (arr[i] == 0) {
        i--;
    }
    i++;
    arr.splice(i, arr.length - i);
    return arr;
}

function addBigPositiveAndNegativeInteger(num1, num2, startCarry) {
    // num1 is positive, num2 is negative
    var negFlagOfResult = false;
    var buffer = [];
    if (num1 == null || num2 == null)
        return null;
    var index1 = num1.length -1;
    var index2 = num2.length -1;
    var carry = startCarry || 0;
    var startCarry = carry;
    while (index1 >= 0 && index2 >= 0) {
        var operand1 = typeof num1 == "string"?num1.charAt(index1)-0:parseInt(num1[index1]);
        var operand2 = typeof num2 == "string"?num2.charAt(index2)-0:parseInt(num2[index2]);
        var temp = operand1 - operand2 + carry;

        var res = temp < 0 ? 10 + temp : temp;
        carry = temp < 0 ? -1 : 0;
        buffer.push(String(res));
        index1--;
        index2--;
    }
    while (index1>=0) {
        var operand1 = typeof num1 == "string"?num1.charAt(index1)-0:parseInt(num1[index1]);
        var temp = operand1 + carry;
        var res = temp < 0 ? 10 + temp: temp;
        carry = temp < 0 ? -1 : 0;
        buffer.push(String(res));
        index1--;
    }
    while (index2>=0) {
        var operand2 = typeof num2 == "string"?num2.charAt(index2)-0:parseInt(num2[index2]);
        var temp = -operand2 + carry;
        var res = temp < 0 ? 10 + temp: temp;
        carry = temp < 0 ? -1 : 0;
        buffer.push(String(res));
        index2--;
    }
    if (carry < 0) {
        negFlagOfResult = true;

    }
    buffer.reverse();
    trimPrefixZeros(buffer);
    return {abs:buffer, negFlag: negFlagOfResult};


    //for () {

    //}

}

function addBigPositiveAndNegativeBinary(num1, num2, startCarry) {
    // num1 is positive, num2 is negative
    var negFlagOfResult = false;
    var buffer = [];
    if (num1 == null || num2 == null)
        return null;
    var index1 = num1.length -1;
    var index2 = num2.length -1;
    var carry = startCarry || 0;
    var startCarry = carry;
    while (index1 >= 0 && index2 >= 0) {
        var operand1 = typeof num1 == "string"?num1.charAt(index1)-0:parseInt(num1[index1]);
        var operand2 = typeof num2 == "string"?num2.charAt(index2)-0:parseInt(num2[index2]);
        var temp = operand1 - operand2 + carry;

        var res = temp < 0 ? 2 + temp : temp;
        carry = temp < 0 ? -1 : 0;
        buffer.push(String(res));
        index1--;
        index2--;
    }
    while (index1>=0) {
        var operand1 = typeof num1 == "string"?num1.charAt(index1)-0:parseInt(num1[index1]);
        var temp = operand1 + carry;
        var res = temp < 0 ? 2 + temp: temp;
        carry = temp < 0 ? -1 : 0;
        buffer.push(String(res));
        index1--;
    }
    while (index2>=0) {
        var operand2 = typeof num2 == "string"?num2.charAt(index2)-0:parseInt(num2[index2]);
        var temp = -operand2 + carry;
        var res = temp < 0 ? 2 + temp: temp;
        carry = temp < 0 ? -1 : 0;
        buffer.push(String(res));
        index2--;
    }
    if (carry < 0) {
        negFlagOfResult = true;

    }
    buffer.reverse();
    trimPrefixZeros(buffer);
    return {abs:buffer, negFlag: negFlagOfResult};


    //for () {

    //}

}

function minusBigIntegerWithSign() {

}

function addBigDecimalNumberWithoutExponentPart(big1, big2) {
    var decimalFractionResult= addBigNumberDecimalFractionWithSign(big1.buffers.buffer2, big2.buffers.buffer2, big1.buffers.negative, big2.buffers.negative);
    var integerPart = addBigIntegerWithSign(big1.buffers.buffer1, big2.buffers.buffer1, big1.buffers.negative, big2.buffers.negative, decimalFractionResult.carry);
    if (integerPart.negFlag && big1.buffers.negative != big2.buffers.negative) {
        console.log("reverse");
        decimalFractionResult= addBigNumberDecimalFractionWithSign(big1.buffers.buffer2, big2.buffers.buffer2, !big1.buffers.negative, !big2.buffers.negative);
        integerPart = addBigIntegerWithSign(big1.buffers.buffer1, big2.buffers.buffer1, !big1.buffers.negative, !big2.buffers.negative, decimalFractionResult.carry);
        integerPart.negFlag = true;
    }
    return {integerPart: integerPart.abs, decimalPart: decimalFractionResult.res, negative:integerPart.negFlag};
}

function multiplyBigDecimalNumberWithExponentPart(big1, big2) {
    var negFlag = false;
    if (big1.buffers.negative != big2.buffers.negative) {
        negFlag = true;
    }
    var total1 = big1.buffers.buffer1.concat(big1.buffers.buffer2);
    var total2 = big2.buffers.buffer1.concat(big2.buffers.buffer2);
    var lenDecimalPart1 = big1.buffers.buffer2.length;
    var lenDecimalPart2 = big2.buffers.buffer2.length;
    var lenDecimalPart = lenDecimalPart1 + lenDecimalPart2;
    var total3 = BigIntegerMultiply(total1, total2);
    var len = total3.length;
    var decimalStart = len - lenDecimalPart;
    var decimalPart = total3.slice(decimalStart, len);
    var integerPart = total3.slice(0,decimalStart);
    var eRes = addBigIntegerWithSignWithoutCarryFromDecimalPart(big1.buffers.buffer3, big2.buffers.buffer3, big1.buffers.eNegative, big2.buffers.eNegative);
    return {integerPart: integerPart, decimalPart:decimalPart, negFlag: negFlag, eNegative: eRes.negFlag, eAbs: eRes.abs};

}


function multiplyBigDecimalNumberWithoutExponentPart(big1, big2) {

}

function addBigIntegerWithSignComplete(num1, num2, negFlag1, negFlag2, carry, isDecimalEqual) {
    var tempt;
    carry = carry || 0;
    isDecimalEqual = isDecimalEqual || true;
    if (negFlag1!= negFlag2 && isDecimalEqual)
        tempt = addBigIntegerWithSign(num1, num2, negFlag1, negFlag2);
    else
        tempt = addBigIntegerWithSign(num1, num2, negFlag1, negFlag2, carry);
    if (tempt.negFlag && negFlag1!=negFlag2) {
        var startCarry = isDecimalEqual?0:carry==0?-1:0;
        tempt = addBigIntegerWithSign(num1, num2, !negFlag1, !negFlag2, startCarry);
        tempt.negFlag = true;
    }
    return {integerPart: tempt.abs, negative: tempt.negFlag}
}


function addBigDecimalNumberWithExponentPart(big1, big2) {
    var modify;
    var eComputation = addBigIntegerWithSignWithoutCarryFromDecimalPart(big1.buffers.buffer3, big2.buffers.buffer3, big1.buffers.eNegative, !big2.buffers.eNegative);
    if (eComputation.negFlag) {
        big2.buffers.buffer3 = big1.buffers.buffer3.slice(0);
        modify = big2;
    } else {
        big1.buffers.buffer3 = big2.buffers.buffer3.slice(0);
        modify = big1;
    }
    var stringNumber = eComputation.abs.join('');
    if (stringNumber == '') {
        stringNumber = '0';
    }
    var countNumber = Number(stringNumber);
    console.log(countNumber);
    var multiArray = [1];
    if (countNumber>Number.MAX_SAFE_INTEGER) {
        while (!(eComputation.abs.length == 1 && eComputation.abs[0] == 0)) {
            eComputation.abs = addBigPositiveAndNegativeInteger(eComputation.abs,[1]).abs;
            multiArray.push(0);
        }
    } else {
        for (var i = 1; i <= countNumber; i++ ) {
            multiArray[i] = 0;
        }
    }

    var raise = new BigNumber(multiArray.join(''));
    var change = multiplyBigDecimalNumberWithExponentPart(modify,raise);
    modify.buffers.buffer1 = change.integerPart;
    modify.buffers.buffer2 = change.decimalPart;
    var change2 = addBigDecimalNumberWithoutExponentPart(big1, big2);
    var res = new BigNumber();
    res.buffers = {};
    res.buffers.buffer1 = change2.integerPart;
    res.buffers.buffer2 = change2.decimalPart;
    res.buffers.buffer3 = big1.buffers.buffer3;
    res.buffers.negative = change2.negative;
    res.buffers.eNegative = big1.buffers.eNegative;
    res.buffers.octBuffer = [];
    res.buffers.hexBuffer = [];

    return res;

}

function compareTwoAbsBigNumbers(num1, num2) {

}

function isZero(big) {


}

function compareTwoBigNumbers(num1, num2) {

    if (num1.buffers.negative && !num2.buffers.negative) {

    }

    if (!num1.buffers.negative && num2.buffers.negative) {

    }

    if (!num1.buffers.negative && !num2.buffers.negative) {

    }

    if (num1.buffers.negative && num2.buffers.negative) {

    }

}

function compareTwoBigNumbersWithoutExponentPart(num1, num2) {

}

function divideBigInteger(num1, num2) {

}

function bigIntegerToBinary(num) {
    if (num == null || num.length == 0)
        return ['0'];
    trimPrefixZeros(num);
    var res = [];
    var index = 0;
    var dividend = num;
    while (true) {
        var step = dividedByTwo(dividend);
        res[index++] = step.remainder[0];
        if (step.quotient.join('') == 0) {
            res.reverse();
            break;
        }
        dividend = step.quotient;
    }
    return res;
}

function dividedByTwo(num) {
    //num is an array represented non-negative integer
    if (num == null || num.length == 0)
        return ['0'];
    trimPrefixZeros(num);
    var res = [];
    var tempDividend = 0;
    for (var i = 0; i < num.length; i++) {
        var tempDividend = 10 * tempDividend + Number(typeof num == "string"? num.charAt(i):num[i]);
        var digit = Math.floor(tempDividend/2);
        if (res.length > 0 || digit > 0) {
            res.push(String(digit));
        }
        tempDividend = tempDividend%2;
    }
    if (res.length == 0)
        res[0] = '0';
    //res.reverse();
    var remainder = [String(tempDividend)];
    return {quotient: res, remainder: remainder};
}

function compareTwoBinary(num1, num2) {
    trimPrefixZeros(num1);
    trimPrefixZeros(num2);
    if (num1.length > num2.length)
        return 1;
    else if (num1.length < num2.length) {
        return -1;
    } else {
        for (var i = 0; i < num1.length; i++) {
            if (Number(num1[i])>Number(num2[i]))
                return 1;
            else if (Number(num1[i])<Number(num2[i]))
                return -1
        }
        return 0;

    }
}

function compareTwoInteger(num1, num2) {
    return compareTwoBinary(num1, num2);
}

function binaryDivision(dividend, divisor) {
    trimPrefixZeros(dividend);
    trimPrefixZeros(divisor);
    if (divisor[0] == 0)
        throw "divide by zero";
    var quotient = [];
    var remainder = [];
    for (var i = 0; i < dividend.length; i++) {
        remainder.push(0);
        remainder[remainder.length-1] = dividend[i];
        var flag = compareTwoBinary(remainder, divisor);
        if (flag>=0) {
            remainder = addBigPositiveAndNegativeBinary(remainder, divisor).abs;
            quotient[i] = 1;
        } else {
            quotient[i] = 0
        }

    }
    trimPrefixZeros(quotient);
    return {quotient:quotient, remainder: remainder};
}

function decimalDivisionIntegerPart(dividend, divisor, negFlag1, negFlag2) {
    trimPrefixZeros(dividend);
    trimPrefixZeros(divisor);
    if (divisor[0] == 0)
        throw "divide by zero";
    var quotient = [];
    var remainder = [];
    for (var i = 0; i < dividend.length; i++) {
        remainder.push(0);
        remainder[remainder.length -1] = dividend[i];
        var flag = compareTwoInteger(remainder, divisor);
        quotient[i] = 0;
        if (flag>=0) {
            do {
                remainder = addBigPositiveAndNegativeInteger(remainder, divisor).abs;
                quotient[i]++;
                //console.log(remainder);
            } while (compareTwoInteger(remainder, divisor)>=0);
        } else {
            quotient[i] = 0;
        }
    }
    trimPrefixZeros(quotient);
    return {quotient: quotient, remainder:remainder};
}

function decimalDivisionDecimalPart(dividend, divisor, fixedLength) {
    //Assume dividend < divisor
    trimPrefixZeros(dividend);
    trimPrefixZeros(divisor);
    var newDividend = dividend.slice(0);
    var newDivisor = divisor.slice(0);
    var quotient = [];
    var remainder = dividend.slice(0);
    var carry = 0;
    for (var i = 0; i <= fixedLength; i++) {
        //newDividend.push('0');
        remainder.push(0);
        var flag = compareTwoInteger(remainder,divisor);
        quotient[i] = 0;
        if (flag >=0) {
            do {
                remainder = addBigPositiveAndNegativeInteger(remainder, divisor).abs;
                quotient[i]++;
                //console.log(remainder);
            } while (compareTwoInteger(remainder, divisor)>=0);
        } else {
            quotient[i] = 0;
        }
    }
    var res;
    if (quotient[fixedLength]>=5) {
        quotient.pop();
        var delta = [];
        for (var j = 0; j < quotient.length; j++) {
            delta[j] = 0;
        }
        delta[quotient.length-1] = 1;
        res = addBigNumberDecimalFractionWithCarry(quotient, delta);
    } else {
        quotient.pop();
        res = {carry:0, quotient: quotient};
    }
    return res;

}

function IntegerGCD() {

}

function IntegerLCM() {

}

function restoringDivision(dividend, divisor) {

}

function bigNumberSqrtWithoutExponentPart(big, precision) {
    if (big == null)
        throw "ERROR";
    var fixedLen = precision || 6;
    trimPrefixZeros(big.buffers.buffer1);
    var len1 = big.buffers.buffer1.length;
    var pair;
    var start = 0;
    if (len1%2== 1) {
        pair = big.buffers.buffer1.slice(0,1);
        start = 1;
    } else {
        pair = big.buffers.buffer1.slice(0,2);
        start = 2;
    }
    var intPart = [];
    var decimalPart = [];
    var curVal = Number(pair.join(''));
    var remainder = [];
    for (var d = 9; d>=0; d--) {
        if (d*d<=curVal) {
            intPart.push(d);
            remainder[0] = curVal - d * d;
            break;
        }
    }

    while (start < len1) {
        remainder = remainder.concat(big.buffers.buffer1.slice(start, start+2));
        start+=2;
        var leading = BigIntegerMultiply(intPart,[2]);
        var curLen = leading.length;
        for (var d = 9; d>=0; d--) {
            leading[curLen] = d;
            var tempt = BigIntegerMultiply(leading, [d]);
            var flag = compareTwoInteger(tempt, remainder);
            //console.log(tempt);
            //console.log(remainder);
            if (flag <= 0) {
                //console.log(d);
                intPart.push(d);
                remainder = addBigPositiveAndNegativeInteger(remainder, tempt).abs;
                break;
            }
        }
    }
    trimPrefixZeros(remainder);
    trimSuffixZeros(big.buffers.buffer2);

    if (remainder.length == 1 && remainder[0] == 0 && big.buffers.buffer2.length == 0) {
        return {intPart: intPart, decimalPart:[]};
    }

    var index = 0;
    var total = intPart.slice(0);
    for (var j = 0; j<fixedLen; j++) {
        if (index > big.buffers.buffer2.length -1) {
            remainder.push(0);
        } else {
            remainder.push(big.buffers.buffer2[index]);
        }
        index++;
        if (index > big.buffers.buffer2.length -1) {
            remainder.push(0);
        } else {
            remainder.push(big.buffers.buffer2[index]);
        }
        index++;
        var leading = BigIntegerMultiply(total,[2]);
        var curLen = leading.length;
        for (var d = 9; d>=0; d--) {
            leading[curLen] = d;
            var tempt = BigIntegerMultiply(leading, [d]);
            var flag = compareTwoInteger(tempt, remainder);
            //console.log(tempt);
            //console.log(remainder);
            if (flag <= 0) {
                //console.log(d);
                total.push(d);
                decimalPart.push(d);
                remainder = addBigPositiveAndNegativeInteger(remainder, tempt).abs;
                break;
            }
        }
    }
    return {intPart:intPart, decimalPart:decimalPart};
}

function bigNumberSqrtWithExponentPart(big) {

}

function bigNumberCubeRootWithoutExponentPart(big) {
    if (big == null)
        throw "ERROR";
    trimPrefixZeros(big.buffers.buffer1);
    var len1 = big.buffers.buffer1.length;
    var pair;
    var start = 0;
    if (len1%2== 1) {
        pair = big.buffers.buffer1.slice(0,1);
        start = 1;
    } else {
        pair = big.buffers.buffer1.slice(0,2);
        start = 2;
    }
    var intPart = [];
    var decimalPart = [];
    var curVal = Number(pair.join(''));
    var remainder = [];
    for (var d = 9; d>=0; d--) {
        if (d*d<=curVal) {
            intPart.push(d);
            remainder[0] = curVal - d * d;
            break;
        }
    }
    while (start < len1) {
        remainder.concat(big.buffers.buffer1.slice(start, start+2));
        start+=2;
        var leading = BigIntegerMultiply(intPart,['2']);
        var curLen = leading.length;
        for (var d = 9; d>=0; d--) {
            leading[curLen] = d;
            var tempt = BigIntegerMultiply(leading, [d]);
            var flag = compareTwoInteger(tempt, remainder);
            if (flag <= 0) {
                //console.log(d);
                intPart.push(d);
                remainder = addBigPositiveAndNegativeInteger(remainder, tempt).abs;
                break;
            }
        }
    }
}




function bigNumberCubeRootWithExponentPart(big) {

}


function bigBinaryToInteger(num) {
    if (num == null || num.length == 0)
        return ['0'];

}

function FFT() {

}

function divideBigFloat() {

}

function bigIntegerGCD(num1, num2) {
    trimPrefixZeros(num1);
    trimPrefixZeros(num2);


}

function addBigDecimalAndHexNumber() {

}

function addBigHexNumber() {

}

function addBigOctNumber() {

}

function addBigOctAndHexNumber() {

}

function addBigOctAndDecimalNumber() {

}

function integerNotZero(num) {
    trimPrefixZeros(num);


}

function quickPower(big, n) {
    // n is an array represented non-negative integer
    var res = new BigNumber('1');
    trimPrefixZeros(n);
    while (!(n.length == 1 && n[0] == '0')) {
        var temp = dividedByTwo(n);
        if (temp.remainder[0]!=0) {
            var tempRes = multiplyBigDecimalNumberWithExponentPart(res, big);
            var newRes = new BigNumber();
            newRes.buffers = {};
            newRes.buffers.buffer1 = tempRes.integerPart;
            newRes.buffers.buffer2 = tempRes.decimalPart;
            newRes.buffers.buffer3 = tempRes.eAbs;
            newRes.buffers.negative = tempRes.negFlag;
            newRes.buffers.eNegative = tempRes.eNegative;
            newRes.buffers.octBuffer = [];
            newRes.buffers.hexBuffer = [];
            res = newRes;
            n = addBigPositiveAndNegativeBinary(n,[1]).abs;
            trimPrefixZeros(n);
        }
        var mulRes = multiplyBigDecimalNumberWithExponentPart(big, big);
        var newOne = new BigNumber();
        newOne.buffers = {};
        newOne.buffers.buffer1 = mulRes.integerPart;
        newOne.buffers.buffer2 = mulRes.decimalPart;
        newOne.buffers.buffer3 = mulRes.eAbs;
        newOne.buffers.negative = mulRes.negFlag;
        newOne.buffers.eNegative = mulRes.eNegative;
        newOne.buffers.octBuffer = [];
        newOne.buffers.hexBuffer = [];
        big = newOne;
        n = dividedByTwo(n).quotient;
        trimPrefixZeros(n);

    }

    return res;
}

function square(big) {
    return quickPower(big,[2]);
}

function bigLogarithmWithoutExponentTenBase(big,base) {
    var n = 0;
    var N = new BigNumber('0');

    while (big.buffers.buffer1.length == 1 && big.buffers.buffer1[0] == 0) {
        var tempRes = multiplyBigDecimalNumberWithExponentPart(big, new BigNumber('10'));
        trimPrefixZeros(tempRes.integerPart);
        trimSuffixZeros(tempRes.decimalPart);
        var newRes = new BigNumber();
        newRes.buffers = {};
        newRes.buffers.buffer1 = tempRes.integerPart;
        newRes.buffers.buffer2 = tempRes.decimalPart;
        newRes.buffers.buffer3 = tempRes.eAbs;
        newRes.buffers.negative = tempRes.negFlag;
        newRes.buffers.eNegative = tempRes.eNegative;
        newRes.buffers.octBuffer = [];
        newRes.buffers.hexBuffer = [];
        big = newRes;
        n++;
        N.buffers.buffer1 = addBigPositiveInteger(N.buffers.buffer1,[1]);
        trimPrefixZeros(N.buffers.buffer1);
    }

    while (compareTwoInteger(N.buffers.buffer1)) {

    }



}


function bigLogarithm(big1, big2) {

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

function parseExponentPart(s, i , buffers) {
    if (i >= s.length)
        return --i;
    i++;
    var ch = s.charAt(i);
    if (ch == '-') {
        i++;
        buffers.eNegative = true;
    }
    if (ch == '+') {
        i++;
    }
    if (i >= s.length)
        return --i;
    return parseDecimal(s, i ,buffers.buffer3);

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
            if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E'))
                i = parseExponentPart(s, i, buffers);

        } else {
            //octBuffer = buffer1.concat(octBuffer);
            buffers.buffer1 = [];
        }
    } else if (isDigit(ch)) {
        i = parseDecimal(s, i , buffers.buffer1);
        if (i < s.length && (s.charAt(i) == 'e' || s.charAt(i) == 'E'))
            i = parseExponentPart(s, i, buffers);
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

    if (typeof  s == "string") {
        this.numString = s.trim();
        this.buffers = parseStringNumber(s);
    }


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

BigNumber.prototype.GCD = function() {

};

BigNumber.prototype.LCM = function() {

};

BigNumber.prototype.biggerThan = function() {

};

BigNumber.prototype.equals = function() {

};

BigNumber.prototype.lessThan = function() {

};

BigNumber.prototype.floor = function() {

};

BigNumber.prototype.round = function() {

};

BigNumber.prototype.ceil = function() {

};

BigNumber.prototype.factorize = function() {

};

BigNumber.prototype.modulo = function() {

};

BigNumber.prototype.power = function() {

};

BigNumber.prototype.log = function() {

};

function BigNumberMatrix() {


}


function BigFraction() {

}


BigNumber.prototype.getAbs = function() {

};

var dog = new BigNumber("-0");
//console.log(dog);
//console.log(stringIntegerMultiply(['1','2','3'],"000001"));
//console.log(parseStringNumber(".5e-335"));

//console.log(addBigPositiveInteger("11","999"));
//console.log(addBigNumberDecimalFractionWithCarry([1],[]));
//var dog1 = new BigNumber("-22.22");
var dog2 = new BigNumber(".01");
console.log(dog2);
var dog3 = new BigNumber("-0");
var dog4 = new BigNumber("1.1");
var dog5 = new BigNumber("-0.0");
console.log(addBigDecimalNumberWithoutExponentPart(dog3, dog5));
//console.log(trimSuffixZeros([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]));
//console.log(addBigPositiveAndNegativeInteger([1,2],[1,4],-1));
//console.log(addBigPositiveAndNegativeInteger([2,1], [1], -1));
console.log(multiplyBigDecimalNumberWithExponentPart(dog2,dog));
//console.log(addBigIntegerWithSign([1],[2],false,true,0));
//console.log(addBigIntegerWithSignWithoutCarryFromDecimalPart([1],[2],false,true));
//console.log(addBigPositiveInteger());

//console.log(dividedByTwo([1,1,8]));
//console.log(bigIntegerToBinary([1,2,3]));
//console.log(binaryDivision([1,0,1,1],[1,0,1]));

//console.log(decimalDivisionIntegerPart("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111",[9]));
console.log(decimalDivisionDecimalPart([9,9,9,9,9,9,9,9,9,9],[1,0,0,0,0,0,0,0,0,0,0],5));
console.log(bigNumberSqrtWithoutExponentPart(new BigNumber('10001'),12));
console.log(quickPower(dog2,[1,1]));
console.log(dividedByTwo([9,1,2]));
console.log(addBigPositiveAndNegativeBinary([1],[1]));


function simpleLog(y) {
    var n = 0;
    var k = 1;
    var x = y;

    while (x<1) {
        x *= 10;
        n--;
    }

    while (x>=10) {
        x/=10;
        n++;
    }

    for (var i = 0; i<32; i++) {
        k*=2;
        if (x*x>=10) {
            x = x*x/10;
            n+= 1.0/k;
        } else
            x=x*x;

    }
    console.log(n);
    return n;

}

function BigNumberLog(y, base) {
    var n = 0;
    var k = 1;
    var x = y;

    while (x < 1) {
        x *= base;
        n--;
    }

    while (x >= base) {
        x/= base;
        n++;

    }
    if (x==1) {
        console.log(n);
        return n;
    }

    for (var i = 0; i < 32; i++) {
        k*=2;
        if (x*x>=base) {
            x = x*x/base;
            n+= 1.0/k;
        }
        else
            x = x*x;
    }
    console.log(n);
    return n;

}

simpleLog(99);

console.log(addBigIntegerWithSignComplete([1],[2],false,true));
console.log(addBigIntegerWithSignWithoutCarryFromDecimalPart([9],[],false,true));

var eDog1 = new BigNumber("1e199");
var eDog2 = new BigNumber("-1.1e197");

console.log(addBigDecimalNumberWithExponentPart(eDog1, eDog2));
console.log(eDog1);
console.log(BigNumberLog(9,2));


function multiplyMatrix() {


}





