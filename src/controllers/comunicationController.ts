import { Request, Response, NextFunction } from 'express';
import { createCustomException } from '../exceptions/custom-exception';
import Comunication, { IComunication } from '../models/Comunication';
import { validateData } from '../validators/data-validator';

export const postComunication = async (req: Request, res: Response, next: NextFunction) => {
	const comunicationData: IComunication = req.body;

	try {
		const validation = validateData(comunicationData);

		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		const comunication = await Comunication.create(comunicationData);
		return res.status(201).json(comunication);
	} catch (error) {
		next(error);
	}
};
