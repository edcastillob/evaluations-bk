import { Request, Response, NextFunction } from 'express';
import { createCustomException } from '../exceptions/custom-exception';
import Feedback, { IFeedback } from '../models/Feedback';
import { validateFeedbackData } from '../validators/feedback-validator';
import { isValidObjectId } from '../utils/valid-object-id';

export const postFeedback = async (req: Request, res: Response, next: NextFunction) => {
	const feedbackData: IFeedback = req.body;

	try {
		const validation = validateFeedbackData(feedbackData);

		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		const feedback = await Feedback.create(feedbackData);
		return res.status(201).json(feedback);
	} catch (error) {
		next(error);
	}
};
export const deleteFeedback = async (req: Request, res: Response, next: NextFunction) => {
	const { feedbackId } = req.params;

	try {
		isValidObjectId(feedbackId);
		const evaluation = await Feedback.findById(feedbackId);
		if (!evaluation) {
			throw createCustomException('Feedback not found', 404);
		}

		await Feedback.findByIdAndDelete(feedbackId);

		return res.status(200).send('Feedback successfully deleted');
	} catch (error) {
		next(error);
	}
};
