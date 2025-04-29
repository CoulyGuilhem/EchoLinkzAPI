import { Router } from 'express';
import { createReport, getReports } from '../controllers/reportController';
import validateRequest from '../middlewares/validateRequest';
import {createReportSchema} from '../schemas/reports/createReport';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, validateRequest(createReportSchema), createReport);
router.get('/', authMiddleware, getReports);

export default router;
