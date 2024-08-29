import { getStats } from '../controllers/statsController';
import { protect } from '../middlewares/authMiddleware';
import express from 'express';

const router = express.Router();
//employee
router.get('/',protect, getStats ); // Solo admin puede actualizar un usuario


export default router;
