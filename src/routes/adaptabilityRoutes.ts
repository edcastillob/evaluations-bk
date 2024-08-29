
import { postAdaptability } from '../controllers/adaptabilityController';
import express from 'express';

const router = express.Router();

router.post('/', postAdaptability);


export default router;
