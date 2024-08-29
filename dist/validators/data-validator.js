"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const zod_utils_1 = require("../utils/zod-utils");
const zod_1 = require("zod");
const DataSchema = zod_1.z.object({
    name: zod_1.z
        .string({ message: 'The name is required' })
        .min(1, { message: 'The name must have at least 1 character' })
        .max(200, { message: 'The name must be a maximum of 200 characters.' }),
    points: zod_1.z.number({ message: 'Points are required and must be a number' }).min(1).max(5)
});
const validateData = (data) => {
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
exports.validateData = validateData;
//# sourceMappingURL=data-validator.js.map