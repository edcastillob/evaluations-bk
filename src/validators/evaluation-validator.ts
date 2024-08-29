import mongoose from 'mongoose';
import { formatZodError } from '../utils/zod-utils';
import { z } from 'zod';
// Función personalizada para validar un ObjectId de MongoDB
const objectIdSchema = z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
	message: 'Invalid MongoDB ObjectId',
  });
const DataSchema = z.object({
	id_user: objectIdSchema,
	id_technical_skills: z.number({ message: 'id_technical_skills are required and must be a number' }),
	id_comunication: z.number({ message: 'id_comunication are required and must be a number' }),
	id_teamwork: z.number({ message: 'id_teamwork are required and must be a number' }),
	id_time_management: z.number({ message: 'Poinvts are required and must be a number' }),
	id_adaptability: z.number({ message: 'id_adaptability are required and must be a number' }),
	id_soft_skills: z.number({ message: 'id_soft_skills are required and must be a number' }),
	id_evaluator: objectIdSchema,
});

export type EventData = z.infer<typeof DataSchema>;

export const validateEvaluationData = (data: unknown): EventData | Error => {
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
