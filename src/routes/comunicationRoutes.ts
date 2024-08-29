
import { postComunication } from '../controllers/comunicationController';
import express from 'express';

const router = express.Router();

router.post('/', postComunication);


export default router;
