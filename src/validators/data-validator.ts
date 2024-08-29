import { formatZodError } from '../utils/zod-utils';
import { z } from 'zod';

const DataSchema = z.object({
	name: z
		.string({ message: 'The name is required' })
		.min(1, { message: 'The name must have at least 1 character' })
		.max(200, { message: 'The name must be a maximum of 200 characters.' }),
	points: z.number({ message: 'Points are required and must be a number' }).min(1).max(5)
});

export type EventData = z.infer<typeof DataSchema>;

export const validateData = (data: unknown): EventData | Error => {
	try {
		return DataSchema.parse(data) as EventData;
	} catch (error) {
		if (error instanceof z.ZodError) {
			const formattedErrors = formatZodError(error);
			return new Error(JSON.stringify(formattedErrors, null, 2)); // Retorna el error en formato JSON
		}
		return new Error(`Validate product data: ${error}`);
	}
};
