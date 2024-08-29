import { Request, Response, NextFunction } from 'express';
import { createCustomException } from '../exceptions/custom-exception';
import { validateData } from '../validators/data-validator';
import Adaptability, { IAdaptability } from '../models/Adaptability';

export const postAdaptability = async (req: Request, res: Response, next: NextFunction) => {
	const adaptabilityData: IAdaptability = req.body;

	try {
		const validation = validateData(adaptabilityData);

		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		const adaptability = await Adaptability.create(adaptabilityData);
		return res.status(201).json(adaptability);
	} catch (error) {
		next(error);
	}
};
