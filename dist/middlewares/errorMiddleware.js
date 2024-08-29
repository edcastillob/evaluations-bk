"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const statusCodes_1 = require("../exceptions/statusCodes");
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = statusCodes_1.statusMessages[statusCode] || 'Unknown Error';
    const isValidationError = statusCode === 400 && typeof err.message === 'string';
    const formattedMessage = isValidationError ? JSON.parse(err.message) : err.message;
    res.status(statusCode).json({
        timestamps: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        error: {
            message: formattedMessage,
            error: errorMessage,
            statusCode: statusCode
        }
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorMiddleware.js.map