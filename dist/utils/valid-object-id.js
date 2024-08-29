"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = isValidObjectId;
const custom_exception_1 = require("../exceptions/custom-exception");
function isValidObjectId(id) {
    try {
        const isValid = /^[a-fA-F0-9]{24}$/.test(id);
        if (!isValid) {
            throw (0, custom_exception_1.createCustomException)('Invalid MongoDB ObjectId', 409);
        }
    }
    catch (error) {
        throw error;
    }
}
//# sourceMappingURL=valid-object-id.js.map