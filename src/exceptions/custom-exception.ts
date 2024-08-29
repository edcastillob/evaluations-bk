import { statusMessages } from './statusCodes';

export class CustomException extends Error {
	statusCode: number;
	path: string;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.name = 'CustomException';
	}
}

export function createCustomException(
	message: any,
	statusCode: number
): CustomException {
	const errorMessage = statusMessages[statusCode] || 'Unknown Error';

	return new CustomException(typeof message === 'object' ? JSON.stringify(message) : message, statusCode);
}
