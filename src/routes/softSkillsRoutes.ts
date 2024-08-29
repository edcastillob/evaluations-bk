
import { postsoftSkills } from '../controllers/softSkillsController';
import express from 'express';

const router = express.Router();

router.post('/', postsoftSkills);


export default router;
