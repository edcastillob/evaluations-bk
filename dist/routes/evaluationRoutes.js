"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middlewares/authMiddleware");
const evaluationController_1 = require("../controllers/evaluationController");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', authMiddleware_1.protect, authMiddleware_1.employee, evaluationController_1.postEvaluation);
router.get('/all', authMiddleware_1.protect, authMiddleware_1.employee, evaluationController_1.getAllEvaluation);
router.get('/view-evaluations', authMiddleware_1.protect, authMiddleware_1.employee, evaluationController_1.viewAllEvaluation);
router.get('/:evaluationId', authMiddleware_1.protect, authMiddleware_1.employee, evaluationController_1.getEvaluationById);
router.get('/employees/:employeeId', authMiddleware_1.protect, authMiddleware_1.employee, evaluationController_1.getEvaluationByUser);
router.get('/evaluator/:evaluatorId', authMiddleware_1.protect, authMiddleware_1.manager, evaluationController_1.getEvaluatorById);
router.put('/:evaluationId', authMiddleware_1.protect, authMiddleware_1.manager, evaluationController_1.putEvaluation);
router.delete('/:evaluationId', authMiddleware_1.protect, authMiddleware_1.admin, evaluationController_1.deleteEvaluation);
exports.default = router;
//# sourceMappingURL=evaluationRoutes.js.map