import { Request, Response, NextFunction } from 'express';
import { createCustomException } from '../exceptions/custom-exception';
import { validateData } from '../validators/data-validator';
import TimeManagement, { ITimeManagement } from '../models/TimeManagement';

export const postTimeManagement = async (req: Request, res: Response, next: NextFunction) => {
	const timeManagementData: ITimeManagement = req.body;

	try {
		const validation = validateData(timeManagementData);

		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		const timeManagement = await TimeManagement.create(timeManagementData);
		return res.status(201).json(timeManagement);
	} catch (error) {
		next(error);
	}
};
