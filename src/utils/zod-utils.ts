import { z } from 'zod';

export const formatZodError = (error: z.ZodError) => {
	const formattedErrors = error.issues.reduce((acc, issue) => {
		const field = issue.path.join('.');
		acc[field] = issue.message;
		return acc;
	}, {} as Record<string, string>);

	return formattedErrors;
};
