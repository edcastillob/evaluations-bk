"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePutUserData = void 0;
const zod_utils_1 = require("../utils/zod-utils");
const zod_1 = require("zod");
const UserDataSchema = zod_1.z.object({
    first_name: zod_1.z
        .string({ message: 'The first_name is required' })
        .min(1, { message: 'The first_name must have at least 1 character' })
        .max(60, { message: 'The first_name must be a maximum of 60 characters.' })
        .optional(),
    last_name: zod_1.z
        .string({ message: 'The last_name is required' })
        .min(1, { message: 'The last_name must have at least 1 character' })
        .max(60, { message: 'The last_name must be a maximum of 60 characters.' })
        .optional(),
    active: zod_1.z.boolean().optional(),
    role: zod_1.z
        .enum(['Admin', 'Manager', 'Employee'], {
        invalid_type_error: 'El rol debe ser "Admin", "Manager", "Employee"'
    })
        .optional(),
    image_url: zod_1.z.string().url().optional(),
    ocupation: zod_1.z.string().optional(),
    department: zod_1.z.string().optional()
});
const validatePutUserData = (data) => {
    try {
        return UserDataSchema.parse(data);
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const formattedErrors = (0, zod_utils_1.formatZodError)(error);
            return new Error(JSON.stringify(formattedErrors, null, 2));
        }
        return new Error(`Validate product data: ${error}`);
    }
};
exports.validatePutUserData = validatePutUserData;
//# sourceMappingURL=put-user-validator.js.map