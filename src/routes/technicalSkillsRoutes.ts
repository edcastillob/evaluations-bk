
import { postTechnicalSkills } from '../controllers/technicalSkillsController';
import express from 'express';

const router = express.Router();

router.post('/', postTechnicalSkills);


export default router;
