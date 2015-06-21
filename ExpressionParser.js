/**
 * Created by yizeli on 6/20/15.
 */
function Token(type) {

}


function ExpressionParser(str) {
    this.end = str.length;
    this.current = 0;
    this.stack = [];
}

ExpressionParser.prototype.tokenize = function() {

};


ExpressionParser.prototype.calculate = function() {

};

ExpressionParser.prototype.parseExpression = function() {

};

ExpressionParser.prototype.parseParenthesis = function() {

};

ExpressionParser.prototype.parseDenominator = function() {

};

ExpressionParser.prototype.parseMultiplier = function() {

};

function calculator() {

}

function reversePolishNotation(array) {
    var tokens = [];
    var stack1 = [];
    var stack2 = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i] === "+") {
            while (stack1.length > 0) {
                if (stack1[stack1.length-1] === "(") {
                    break;
                }
                stack2.push(stack1.pop());

            }
            stack1.push(array[i]);
        } else if (array[i] === "-") {
            while (stack1.length > 0) {
                if (stack1[stack1.length-1] === "(") {
                    break;
                }
                stack2.push(stack1.pop());
            }
            stack1.push(array[i]);
        } else if (array[i] === "*") {
            while (stack1.length > 0) {
                if (stack1[stack1.length-1] === "(" || stack1[stack1.length-1] === "-" || stack1[stack1.length-1] === "+") {
                    break;
                }
                stack2.push(stack1.pop());
            }
            stack1.push(array[i]);
        } else if (array[i] === "/") {
            while (stack1.length > 0) {
                if (stack1[stack1.length-1] === "(" || stack1[stack1.length-1] === "-" || stack1[stack1.length-1] === "+") {
                    break;
                }
                stack2.push(stack1.pop());
            }
            stack1.push(array[i]);
        } else if (array[i] === "(") {
            stack1.push("(");
        } else if (array[i] === ")") {
            var op;
            while ((op = stack1.pop()) !== "(") {
                stack2.push(op);
            }
        } else {
            stack2.push(array[i]);
        }

    }
    while (stack1.length >0) {
        stack2.push(stack1.pop());
    }
    return stack2;
}

console.log(reversePolishNotation([1,"+",2,"*","(",3,"+",4,")", "-",5,"*",6]));

