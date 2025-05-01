import { Router } from 'express';
import { getMessagesByReport } from '../controllers/messageController';
import { getMessagesByRoom } from '../controllers/roomController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

// 1) Historique d’un signalement (ObjectId)
router.get('/:reportId', authMiddleware, getMessagesByReport);

// 2) Historique d’un salon (string)
router.get('/room/:roomName', authMiddleware, getMessagesByRoom);

export default router;
