import { Request, Response, NextFunction } from 'express';
import { createCustomException } from '../exceptions/custom-exception';
import Evaluation, { IEvaluation } from '../models/Evaluation';
import { validateEvaluationData } from '../validators/evaluation-validator';
import Adaptability from '../models/Adaptability';
import User from '../models/User';
import IdTechnicalSkills from '../models/IdTechnicalSkills';
import Comunication from '../models/Comunication';
import Teamwork from '../models/Teamwork';
import TimeManagement from '../models/TimeManagement';
import SoftSkills from '../models/SoftSkills';
import { isValidObjectId } from '../utils/valid-object-id';

export const postEvaluation = async (req: Request, res: Response, next: NextFunction) => {
	const EvaluationData: IEvaluation = req.body;

	try {
		const validation = validateEvaluationData(EvaluationData);

		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		await validateEvaluationIds(EvaluationData);

		const evaluation = await Evaluation.create(EvaluationData);
		return res.status(201).json(evaluation);
	} catch (error) {
		next(error);
	}
};

export const getEvaluationById = async (req: Request, res: Response, next: NextFunction) => {
	const { evaluationId } = req.params;
	try {
		isValidObjectId(evaluationId);

		const evaluation = await Evaluation.findById({ _id: evaluationId });
		if (!evaluation) {
			throw createCustomException('Evaluation not found', 404);
		}
		return res.status(200).json(evaluation);
	} catch (error) {
		next(error);
	}
};

export const viewAllEvaluation = async (req: Request, res: Response, next: NextFunction) => {
	try {
	  const evaluations = await Evaluation.find()
		.populate('id_user', 'first_name last_name') 
		.populate('id_evaluator', 'first_name last_name') 
		.exec();
	  if (!evaluations.length) {
		throw createCustomException('No evaluations found', 404);
	  }
  
	  return res.status(200).json(evaluations);
	} catch (error) {
	  next(error);
	}
  };

export const getEvaluationByUser = async (req: Request, res: Response, next: NextFunction) => {
	const { employeeId } = req.params;
	try {
		isValidObjectId(employeeId);

		const evaluation = await Evaluation.find({ id_user: employeeId });
		if (!evaluation) {
			throw createCustomException('User rating not found', 404);
		}
		return res.status(200).json(evaluation);
	} catch (error) {
		next(error);
	}
};
export const getEvaluatorById = async (req: Request, res: Response, next: NextFunction) => {
	const { evaluatorId } = req.params;
	try {
		isValidObjectId(evaluatorId);

		const evaluation = await Evaluation.findOne({ id_evaluator: evaluatorId });
		if (!evaluation) {
			throw createCustomException('Evaluator rating not found', 404);
		}
		return res.status(200).json(evaluation);
	} catch (error) {
		next(error);
	}
};
export const putEvaluation = async (req: Request, res: Response, next: NextFunction) => {
	const { evaluationId } = req.params;
	const evaluationData: IEvaluation = req.body;

	try {
		isValidObjectId(evaluationId);
		const evaluation = await Evaluation.findById(evaluationId);
		if (!evaluation) {
			throw createCustomException('Evaluator rating not found', 404);
		}

		const validation = validateEvaluationData(evaluationData);
		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		await validateEvaluationIds(evaluationData);
		const updatedEvaluation = await Evaluation.findByIdAndUpdate(
			evaluationId,
			{ $set: evaluationData },
			{ new: true } // Devuelve el documento actualizado
		);

		return res.status(200).json(updatedEvaluation);
	} catch (error) {
		next(error);
	}
};
export const deleteEvaluation = async (req: Request, res: Response, next: NextFunction) => {
	const { evaluationId } = req.params;

	try {
		isValidObjectId(evaluationId);
		const evaluation = await Evaluation.findById(evaluationId);
		if (!evaluation) {
			throw createCustomException('Evaluator rating not found', 404);
		}

		await Evaluation.findByIdAndDelete(evaluationId);

		return res.status(200).send('Evaluation successfully deleted');
	} catch (error) {
		next(error);
	}
};
export const getAllEvaluation = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const [adaptability, comunication, softSkills, teamwork, technicalSkills, timeManagement] = await Promise.all([
			Adaptability.find({}).sort({ points: 1 }),
			Comunication.find({}).sort({ points: 1 }),
			SoftSkills.find({}).sort({ points: 1 }),
			Teamwork.find({}).sort({ points: 1 }),
			IdTechnicalSkills.find({}).sort({ points: 1 }),
			TimeManagement.find({}).sort({ points: 1 })
		]);

		const result = {
			adaptability,
			comunication,
			soft_skills: softSkills,
			teamwork,
			technical_skills: technicalSkills,
			time_management: timeManagement
		};

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

const validateEvaluationIds = async (EvaluationData: IEvaluation) => {
	const {
		id_adaptability,
		id_user,
		id_technical_skills,
		id_comunication,
		id_teamwork,
		id_time_management,
		id_soft_skills,
		id_evaluator
	} = EvaluationData;

	const _id_adaptability = await Adaptability.findOne({ _id: id_adaptability });
	console.log(_id_adaptability);

	if (!_id_adaptability) {
		throw createCustomException('id_adaptability not found', 404);
	}

	const _id_user = await User.findOne({ _id: id_user });
	if (!_id_user) {
		throw createCustomException('id_user not found', 404);
	}

	const _id_technical_skills = await IdTechnicalSkills.findOne({ _id: id_technical_skills });
	if (!_id_technical_skills) {
		throw createCustomException('id_technical_skills not found', 404);
	}

	const _id_comunication = await Comunication.findOne({ _id: id_comunication });
	if (!_id_comunication) {
		throw createCustomException('id_comunication not found', 404);
	}

	const _id_time_management = await TimeManagement.findOne({ _id: id_time_management });
	if (!_id_time_management) {
		throw createCustomException('id_time_management not found', 404);
	}

	const _id_teamwork = await Teamwork.findOne({ _id: id_teamwork });
	if (!_id_teamwork) {
		throw createCustomException('id_teamwork not found', 404);
	}

	const _id_soft_skills = await SoftSkills.findOne({ _id: id_soft_skills });
	if (!_id_soft_skills) {
		throw createCustomException('id_soft_skills not found', 404);
	}
	const _id_evaluator = await User.findOne({ _id: id_evaluator });
	if (!_id_evaluator) {
		throw createCustomException('id_evaluator not found', 404);
	}
	if (id_user === id_evaluator) {
		throw createCustomException('The evaluator user and the evaluated user are the same', 409);
	}
};
