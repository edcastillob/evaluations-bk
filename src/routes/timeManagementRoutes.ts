
import { postTimeManagement } from '../controllers/timeManagemenController';
import express from 'express';

const router = express.Router();

router.post('/', postTimeManagement);


export default router;
