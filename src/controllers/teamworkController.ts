import { Request, Response, NextFunction } from 'express';
import { createCustomException } from '../exceptions/custom-exception';
import Teamwork, { ITeamwork } from '../models/Teamwork';
import { validateData } from '../validators/data-validator';

export const postTeamwork = async (req: Request, res: Response, next: NextFunction) => {
	const teamworkData: ITeamwork = req.body;

	try {
		const validation = validateData(teamworkData);

		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		const teamwork = await Teamwork.create(teamworkData);
		return res.status(201).json(teamwork);
	} catch (error) {
		next(error);
	}
};