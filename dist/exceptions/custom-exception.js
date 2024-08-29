"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
exports.createCustomException = createCustomException;
const statusCodes_1 = require("./statusCodes");
class CustomException extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'CustomException';
    }
}
exports.CustomException = CustomException;
function createCustomException(message, statusCode) {
    const errorMessage = statusCodes_1.statusMessages[statusCode] || 'Unknown Error';
    return new CustomException(typeof message === 'object' ? JSON.stringify(message) : message, statusCode);
}
//# sourceMappingURL=custom-exception.js.map