"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEvaluationData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_utils_1 = require("../utils/zod-utils");
const zod_1 = require("zod");
const objectIdSchema = zod_1.z.string().refine((value) => mongoose_1.default.Types.ObjectId.isValid(value), {
    message: 'Invalid MongoDB ObjectId',
});
const DataSchema = zod_1.z.object({
    id_user: objectIdSchema,
    id_technical_skills: zod_1.z.number({ message: 'id_technical_skills are required and must be a number' }),
    id_comunication: zod_1.z.number({ message: 'id_comunication are required and must be a number' }),
    id_teamwork: zod_1.z.number({ message: 'id_teamwork are required and must be a number' }),
    id_time_management: zod_1.z.number({ message: 'Poinvts are required and must be a number' }),
    id_adaptability: zod_1.z.number({ message: 'id_adaptability are required and must be a number' }),
    id_soft_skills: zod_1.z.number({ message: 'id_soft_skills are required and must be a number' }),
    id_evaluator: objectIdSchema,
});
const validateEvaluationData = (data) => {
    try {
        return DataSchema.parse(data);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const formattedErrors = (0, zod_utils_1.formatZodError)(error);
            return new Error(JSON.stringify(formattedErrors, null, 2));
        }
        return new Error(`Validate product data: ${error}`);
    }
};
exports.validateEvaluationData = validateEvaluationData;
//# sourceMappingURL=evaluation-validator.js.map