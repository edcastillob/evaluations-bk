
import { postTeamwork } from '../controllers/teamworkController';
import express from 'express';

const router = express.Router();

router.post('/', postTeamwork);


export default router;
