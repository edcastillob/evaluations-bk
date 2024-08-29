import { formatZodError } from '../utils/zod-utils';
import { z } from 'zod';

const UserDataSchema = z.object({
	first_name: z
		.string({ message: 'The first_name is required' })
		.min(1, { message: 'The first_name must have at least 1 character' })
		.max(60, { message: 'The first_name must be a maximum of 60 characters.' })
		.optional(),
	last_name: z
		.string({ message: 'The last_name is required' })
		.min(1, { message: 'The last_name must have at least 1 character' })
		.max(60, { message: 'The last_name must be a maximum of 60 characters.' })
		.optional(),
	active: z.boolean().optional(),
	role: z
		.enum(['Admin', 'Manager', 'Employee'], {
			invalid_type_error: 'El rol debe ser "Admin", "Manager", "Employee"'
		})
		.optional(),
	image_url: z.string().url().optional(),
	ocupation: z.string().optional(),
	department: z.string().optional()
});

export type EventData = z.infer<typeof UserDataSchema>;

export const validatePutUserData = (data: unknown): EventData | Error => {
	try {
		return UserDataSchema.parse(data) as EventData;
	} catch (error) {
		if (error instanceof z.ZodError) {
			const formattedErrors = formatZodError(error);
			return new Error(JSON.stringify(formattedErrors, null, 2)); // Retorna el error en formato JSON
		}
		return new Error(`Validate product data: ${error}`);
	}
};
