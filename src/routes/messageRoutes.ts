import { Router } from 'express';
import { getMessagesByReport } from '../controllers/messageController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.get('/:reportId', authMiddleware, getMessagesByReport);

export default router;
