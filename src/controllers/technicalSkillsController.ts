import { Request, Response, NextFunction } from 'express';
import { createCustomException } from '../exceptions/custom-exception';
import { validateData } from '../validators/data-validator';
import IdTechnicalSkills, { IIdTechnicalSkills } from '../models/IdTechnicalSkills';

export const postTechnicalSkills = async (req: Request, res: Response, next: NextFunction) => {
	const technicalSkillsData: IIdTechnicalSkills = req.body;

	try {
		const validation = validateData(technicalSkillsData);

		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		const technicalSkills = await IdTechnicalSkills.create(technicalSkillsData);
		return res.status(201).json(technicalSkills);
	} catch (error) {
		next(error);
	}
};
