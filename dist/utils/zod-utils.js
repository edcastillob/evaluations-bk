"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatZodError = void 0;
const formatZodError = (error) => {
    const formattedErrors = error.issues.reduce((acc, issue) => {
        const field = issue.path.join('.');
        acc[field] = issue.message;
        return acc;
    }, {});
    return formattedErrors;
};
exports.formatZodError = formatZodError;
//# sourceMappingURL=zod-utils.js.map