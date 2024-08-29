import { createCustomException } from '../exceptions/custom-exception';
import { NextFunction } from 'express';
export function isValidObjectId(id: string): void {
	try {
		const isValid = /^[a-fA-F0-9]{24}$/.test(id);
		if (!isValid) {
			throw createCustomException('Invalid MongoDB ObjectId', 409);
		}
	} catch (error) {
		throw error;
	}
}
