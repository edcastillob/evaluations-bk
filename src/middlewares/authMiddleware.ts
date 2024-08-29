import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { createCustomException } from '../exceptions/custom-exception';

interface AuthenticatedRequest extends Request {
	user?: IUser;
}

// Middleware para proteger las rutas que requieren autenticación
export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;

			const user = await User.findById(decoded.id).select('-password');

			if (!user) {
				return next(createCustomException('Not authorized, user not found', 401));
			}

			req.user = user;
			next();
		} catch (error) {
			return next(createCustomException('Not authorized, token failed', 401));
		}
	} else {
		return next(createCustomException('Not authorized, no token', 401));
	}
};

// Middleware para roles de administrador
export const admin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	if (req.user && req.user.role === 'Admin') {
		next();
	} else {
		throw createCustomException('Not authorized as admin', 403);
	}
};

// Middleware para roles de gerente
export const manager = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Manager')) {
        next();
	} else {
        throw createCustomException('Not authorized as manager', 403);
	}
};

// Middleware para roles de empleado
export const employee = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && (req.user.role === 'Admin' || req.user.role === 'Manager' || req.user.role === 'Employee')) {
        next();
	} else {
        throw createCustomException('Not authorized as employee', 403);
	}
};
