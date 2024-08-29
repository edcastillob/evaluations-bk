import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Evaluation from '../models/Evaluation';

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const totalUsers = await User.countDocuments();
		const userAdmins = await User.countDocuments({ role: 'Admin' });
		const userEmployees = await User.countDocuments({ role: 'Employee' });
		const userManagers = await User.countDocuments({ role: 'Manager' });
		const activeUsers = await User.countDocuments({ active: true });
		const totalEvaluations = await Evaluation.countDocuments();

		// Contar las evaluaciones que tienen un id_evaluator asignado
		const evaluationsWithEvaluator = await Evaluation.countDocuments({ id_evaluator: { $ne: null } });

		const response = {
			users: totalUsers,
			evaluations: totalEvaluations,
			user_manager: userManagers,
			user_admin: userAdmins,
			user_employee: userEmployees,
			user_active: activeUsers
		};

		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};
