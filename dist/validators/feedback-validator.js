"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFeedbackData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_utils_1 = require("../utils/zod-utils");
const zod_1 = require("zod");
const objectIdSchema = zod_1.z.string().refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), {
    message: 'Invalid MongoDB ObjectId',
});
const FeedbackDataSchema = zod_1.z.object({
    id_user: objectIdSchema,
    comment: zod_1.z.string({ message: 'Comment is required' }),
    id_evaluator: objectIdSchema,
});
const validateFeedbackData = (data) => {
    try {
        return FeedbackDataSchema.parse(data);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const formattedErrors = (0, zod_utils_1.formatZodError)(error);
            return new Error(JSON.stringify(formattedErrors, null, 2));
        }
        return new Error(`Validate product data: ${error}`);
    }
};
exports.validateFeedbackData = validateFeedbackData;
//# sourceMappingURL=feedback-validator.js.map