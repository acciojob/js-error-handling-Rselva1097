//your code here
class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not < ${arg} >`);
        this.name = "OutOfRangeError";
    }
}

class InvalidExprError extends Error {
    constructor() {
        super("Expression should not have an invalid combination of expression");
        this.name = "InvalidExprError";
    }
}

function evalString(expression) {
    try {
        // Remove spaces from the expression
        const expr = expression.replace(/\s+/g, '');

        // Check for invalid characters
        if (/[^0-9+\-*/]/.test(expr)) {
            const invalidChar = expr.match(/[^0-9+\-*/]/)[0];
            throw new OutOfRangeError(invalidChar);
        }

        // Check for invalid combinations of operators
        if (/[\+\-*/]{2,}/.test(expr)) {
            throw new InvalidExprError();
        }

        // Check for starting with invalid operator
        if (/^[+\/*]/.test(expr)) {
            throw new SyntaxError("Expression should not start with invalid operator");
        }

        // Check for ending with invalid operator
        if (/[\+\-*/]$/.test(expr)) {
            throw new SyntaxError("Expression should not end with invalid operator");
        }

        // Evaluate the expression (use eval carefully in real applications)
        return eval(expr);

    } catch (error) {
        if (error instanceof OutOfRangeError ||
            error instanceof InvalidExprError ||
            error instanceof SyntaxError) {
            throw error;
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}
