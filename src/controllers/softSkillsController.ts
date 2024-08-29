import { Request, Response, NextFunction } from 'express';
import { createCustomException } from '../exceptions/custom-exception';
import { validateData } from '../validators/data-validator';
import SoftSkills, { ISoftSkills } from '../models/SoftSkills';

export const postsoftSkills = async (req: Request, res: Response, next: NextFunction) => {
	const softSkillsData: ISoftSkills = req.body;

	try {
		const validation = validateData(softSkillsData);

		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		const softSkills = await SoftSkills.create(softSkillsData);
		return res.status(201).json(softSkills);
	} catch (error) {
		next(error);
	}
};
