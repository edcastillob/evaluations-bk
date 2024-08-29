import mongoose from 'mongoose';
import { formatZodError } from '../utils/zod-utils';
import { z } from 'zod';
// Función personalizada para validar un ObjectId de MongoDB
const objectIdSchema = z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
	message: 'Invalid MongoDB ObjectId',
  });
const FeedbackDataSchema = z.object({
	id_user: objectIdSchema,
	comment: z.string({ message: 'Comment is required' }),
	id_evaluator: objectIdSchema,
});

export type EventData = z.infer<typeof FeedbackDataSchema>;

export const validateFeedbackData = (data: unknown): EventData | Error => {
	try {
		return FeedbackDataSchema.parse(data) as EventData;
	} catch (error) {
		if (error instanceof z.ZodError) {
			const formattedErrors = formatZodError(error);
			return new Error(JSON.stringify(formattedErrors, null, 2)); // Retorna el error en formato JSON
		}
		return new Error(`Validate product data: ${error}`);
	}
};
