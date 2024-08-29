import express from 'express';
import authRoutes from './authRoutes';
import comunicationRoutes from './comunicationRoutes';
import teamworkRoutes from './teamworkRoutes';
import adaptabilityRoutes from './adaptabilityRoutes';
import technicalSkillsRoutes from './technicalSkillsRoutes';
import softSkillsRoutes from './softSkillsRoutes';
import timeManagementRoutes from './timeManagementRoutes';
import evaluationRoutes from './evaluationRoutes';
import userRoutes from './userRoutes';
import feedbackRoutes from './feedbackRoutes';
import statsRoutes from './statsRoutes';

const router = express.Router();

router.use('/auth', authRoutes);

router.use('/employees', userRoutes);
router.use('/user', userRoutes);
router.use('/stats', statsRoutes);

router.use('/reports', userRoutes);

router.use('/adaptability', adaptabilityRoutes);
router.use('/adaptability', adaptabilityRoutes);
router.use('/comunication', comunicationRoutes);
router.use('/soft-skills', softSkillsRoutes);
router.use('/teamwork', teamworkRoutes);
router.use('/technical-skills', technicalSkillsRoutes);
router.use('/time-management', timeManagementRoutes);

router.use('/evaluation', evaluationRoutes);

router.use('/feedback', feedbackRoutes);

export default router;
