import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { generateToken } from '../utils/generateToken';
import { validateUserData } from '../validators/user-validator';
import { createCustomException } from '../exceptions/custom-exception';
import cloudinary from '../utils/cloudinary';


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
	const userData: IUser = req.body;

	try {
		const validation = validateUserData(userData);

		if (validation instanceof Error) {
			const errors = JSON.parse(validation.message);
			throw createCustomException(errors, 400);
		}

		const { email } = userData;
		const userExists = await User.findOne({ email });

		if (userExists) {
			throw createCustomException('User already exists', 409);
		}

		// Manejo de la imagen
		if (req.file) {
			const imageFile: Express.Multer.File = req.file;
			const result = await cloudinary.uploader.upload(imageFile.path);
			userData.image_url = result.secure_url;
		}

		const user = await User.create(userData);
		return res.status(201).json(user);
	} catch (error) {
		next(error);
	}
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		// Asegúrate de seleccionar la contraseña explícitamente
		const user = await User.findOne({ email }).select('+password');

		if (user && (await user.matchPassword(password))) {
			return res.json({
				_id: user._id,
				first_name: user.first_name,
				last_name: user.last_name,
				email: user.email,
				role: user.role,
				token: generateToken({ _id: user._id, email: user.email, role: user.role })
			});
		} else {
			throw createCustomException('Invalid email or password', 401);
		}
	} catch (error) {
		next(error);
	}
};

