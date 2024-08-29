import { Request, Response, NextFunction } from 'express';
import { CustomException } from '../exceptions/custom-exception';
import { statusMessages } from '../exceptions/statusCodes';

export const errorHandler = (err: CustomException, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500;
	const errorMessage = statusMessages[statusCode] || 'Unknown Error';

	// Manejo especial para errores de validación
	const isValidationError = statusCode === 400 && typeof err.message === 'string';
	const formattedMessage = isValidationError ? JSON.parse(err.message) : err.message;

	res.status(statusCode).json({
		timestamps: new Date().toISOString(),
		method: req.method,
		path: req.originalUrl,
		error: {
			message: formattedMessage,
			error: errorMessage,
			statusCode: statusCode
		}
	});
};
