"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authMiddleware_1 = require("../middlewares/authMiddleware");
const employeeController_1 = require("../controllers/employeeController");
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middlewares/multer");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, authMiddleware_1.admin, employeeController_1.getAllEmployees);
router.get('/all', authMiddleware_1.protect, authMiddleware_1.manager, employeeController_1.getAllUser);
router.get('/:userId', authMiddleware_1.protect, authMiddleware_1.employee, employeeController_1.getUserById);
router.get('/role/:role', authMiddleware_1.protect, authMiddleware_1.admin, employeeController_1.getAllUserByRole);
router.put('/:userId', authMiddleware_1.protect, authMiddleware_1.admin, multer_1.multerUpload.single('image'), employeeController_1.putUser);
router.put('/image/:userId', authMiddleware_1.protect, multer_1.multerUpload.single('image'), employeeController_1.imageUploader);
router.delete('/:userId', authMiddleware_1.protect, authMiddleware_1.employee, employeeController_1.deleteUserById);
router.get('/employee/:userId', authMiddleware_1.protect, authMiddleware_1.employee, employeeController_1.getReportByUser);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map