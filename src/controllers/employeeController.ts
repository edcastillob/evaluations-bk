import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { createCustomException } from '../exceptions/custom-exception';
import { isValidObjectId } from '../utils/valid-object-id';
import { validatePutUserData } from '../validators/put-user-validator';
import cloudinary from '../utils/cloudinary';
import Evaluation from '../models/Evaluation';
import Feedback from '../models/Feedback';

export const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
	console.log(1000);
	
	try {
		const employees = await User.find({ role: 'Employee' });
		if (!employees.length) {
			throw createCustomException('Employees not found', 404);
		}
		return res.status(200).json(employees);
	} catch (error) {
		next(error);
	}
};
export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await User.find();
		if (!user.length) {
			throw createCustomException('Users not found', 404);
		}
		return res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
export const getAllUserByRole = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { role } = req.params;
		if (!role || typeof role !== 'string') {
			throw createCustomException('Role is required and must be a string', 400);
		}
		const users = await User.find({ role });
		if (!users.length) {
			throw createCustomException('Users not found', 404);
		}
		return res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.params;
	try {
		isValidObjectId(userId);

		const user = await User.findOne({ _id: userId });
		if (!user) {
			throw createCustomException('User not found', 404);
		}
		return res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};
export const deleteUserById = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.params;
	try {
		isValidObjectId(userId);

		const user = await User.findOne({ _id: userId });
		if (!user) {
			throw createCustomException('User not found', 404);
		}
		await User.findByIdAndDelete(userId);

		return res.status(200).send('User successfully deleted');
	} catch (error) {
		next(error);
	}
};

export const getReportByUser = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.params;
	try {
		isValidObjectId(userId);
		const user = await User.findOne({ _id: userId });
		if (!user) {
			throw createCustomException('User not found', 404);
		}

		// Obtener las evaluaciones y feedbacks asociados
		const evaluations = await Evaluation.find({ id_user: userId })
			.populate('id_user', 'first_name last_name') // Agregar los detalles de id_user
			.populate('id_evaluator', 'first_name last_name'); // Agregar los detalles de id_evaluator

		const feedbacks = await Feedback.find({ id_user: userId })
			.populate('id_user', 'first_name last_name') // Agregar los detalles de id_user
			.populate('id_evaluator', 'first_name last_name'); // Agregar los detalles de id_evaluator

		return res.status(200).json({
			...user.toObject(),
			evaluations,
			feedbacks
		});
	} catch (error) {
		next(error);
	}
};

export const putUser = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.params;
	const putUserData: Partial<IUser> = req.body;

	try {
		isValidObjectId(userId);

		const user = await User.findById(userId);
		if (!user) {
			throw createCustomException('User not found', 404);
		}

		const validation = validatePutUserData(putUserData);
		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		// Manejo de la imagen
		if (req.file) {
			const imageFile: Express.Multer.File = req.file;
			const result = await cloudinary.uploader.upload(imageFile.path);
			putUserData.image_url = result.secure_url; // Asignar la URL de Cloudinary al campo image_url
		}

		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{ $set: putUserData }, // Solo se actualizan los campos enviados
			{ new: true, omitUndefined: true } // `new: true` para devolver el documento actualizado, `omitUndefined: true` para no actualizar con `undefined`
		);

		return res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
};

// export const putUser = async (req: Request, res: Response, next: NextFunction) => {
// 	const { userId } = req.params;
// 	const putUserData: Partial<IUser> = req.body;
// 	try {
// 		isValidObjectId(userId);
// 		const user = await User.findById(userId);
// 		if (!user) {
// 			throw createCustomException('Evaluator rating not found', 404);
// 		}

// 		const validation = validatePutUserData(putUserData);
// 		if (validation instanceof Error) {
// 			const errors = JSON.parse(validation.message);
// 			throw createCustomException(errors, 400);
// 		}
// 		const updatedUser = await User.findByIdAndUpdate(
// 			userId,
// 			{ $set: putUserData }, // Aquí se asegura de que solo se actualicen los campos enviados
// 			{ new: true, omitUndefined: true } // `new: true` para devolver el documento actualizado, `omitUndefined: true` para no actualizar con `undefined`
// 		);

// 		return res.status(200).json(updatedUser);
// 	} catch (error) {
// 		next(error);
// 	}
// };

export const imageUploader = async (req: Request, res: Response, next: NextFunction) => {
	const { userId } = req.params;

	try {
		if (!req.file) {
			return res.status(400).json({ error: 'No file was uploaded' });
		}
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const imageFile: Express.Multer.File = req.file;
		const result = await cloudinary.uploader.upload(imageFile.path);

		user.image_url = result.secure_url;
		await user.save();

		res.status(200).json({ message: 'Image uploaded successfully!', data: { imageUrl: user.image_url } });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: `Error uploading image: ${(error as Error).message}` });
	}
};
