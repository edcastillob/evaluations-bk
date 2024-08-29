import { protect, admin, manager, employee } from '../middlewares/authMiddleware';
import { deleteUserById, getAllEmployees, getAllUser, getAllUserByRole, getReportByUser, getUserById, imageUploader, putUser } from '../controllers/employeeController';
import express from 'express';
import { multerUpload } from '../middlewares/multer';

const router = express.Router();
//employee
router.get('/', protect, admin, getAllEmployees); // Solo admin puede ver todos los empleados

//user
router.get('/all', protect, manager, getAllUser); // Admin y Manager pueden ver todos los usuarios
router.get('/:userId', protect, employee, getUserById); // Cualquier usuario autenticado puede ver un usuario específico
router.get('/role/:role', protect, admin, getAllUserByRole); // Solo admin puede ver usuarios por rol
router.put('/:userId', protect, admin,multerUpload.single('image'), putUser); // Solo admin puede actualizar un usuario
router.put('/image/:userId', protect,  multerUpload.single('image'), imageUploader); // Solo admin puede actualizar un usuario
router.delete('/:userId', protect, employee, deleteUserById); // Cualquier usuario autenticado puede ver un usuario específico

//report
router.get('/employee/:userId', protect, employee, getReportByUser); // Cualquier usuario autenticado puede ver un usuario específico
export default router;
