import { multerUpload } from '../middlewares/multer';
import { loginUser, registerUser } from '../controllers/authController';
import express from 'express';

const router = express.Router();

// router.post('/register', registerUser);
router.post('/register', multerUpload.single('image'), registerUser);

router.post('/login', loginUser);

export default router;
