
import { deleteFeedback, postFeedback } from '../controllers/feedbackController';
import express from 'express';

const router = express.Router();

router.post('/', postFeedback);
router.delete('/:feedbackId', deleteFeedback);


export default router;
