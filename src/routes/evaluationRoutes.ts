import { protect, admin, manager, employee } from '../middlewares/authMiddleware';
import {
	deleteEvaluation,
	getAllEvaluation,
	getEvaluationById,
	getEvaluationByUser,
	getEvaluatorById,
	postEvaluation,
	putEvaluation,
	viewAllEvaluation
} from '../controllers/evaluationController';
import express from 'express';

const router = express.Router();

router.post('/', protect, employee, postEvaluation);// Cualquier usuario autenticado puede crear un evaluacion
router.get('/all', protect, employee, getAllEvaluation);// Cualquier usuario autenticado puede crear un evaluacion
router.get('/view-evaluations', protect, employee, viewAllEvaluation); // Cualquier usuario autenticado puede ver un usuario específico
router.get('/:evaluationId', protect, employee, getEvaluationById);// Cualquier usuario autenticado puede ver un evaluacion
router.get('/employees/:employeeId', protect, employee, getEvaluationByUser);// Cualquier usuario autenticado //evaluation/user/:userId'
router.get('/evaluator/:evaluatorId', protect, manager, getEvaluatorById);
router.put('/:evaluationId', protect, manager, putEvaluation);
router.delete('/:evaluationId', protect, admin, deleteEvaluation);

export default router;
