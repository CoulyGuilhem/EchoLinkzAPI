import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import validateRequest from '../middlewares/validateRequest';
import { chatSchema } from '../schemas/chat/chatSchema';
import { chatHandler } from '../controllers/chatController';

const router = Router();
router.post('/', authMiddleware, validateRequest(chatSchema), chatHandler);
export default router;
