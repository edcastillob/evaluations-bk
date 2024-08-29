import { JWT_SECRET } from '../config/config';
import jwt from 'jsonwebtoken';

export const generateToken = (id: any) => {
	return jwt.sign({ id }, JWT_SECRET, {
		expiresIn: '30d'
	});
};
