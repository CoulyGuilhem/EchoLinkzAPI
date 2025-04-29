import { Router } from 'express';
import { createResponse } from '../controllers/responseController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createResponse);


export default router;
