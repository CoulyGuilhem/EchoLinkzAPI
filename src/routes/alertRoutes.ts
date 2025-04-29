import { Router } from 'express'
import { protect } from '../middleware/auth'
import { createAlert, getAlerts, updateAlert } from '../controllers/alertController'
const router = Router()

router.route('/')
  .post(protect, createAlert)
  .get(protect, getAlerts)

router.route('/:id')
  .put(protect, updateAlert)

export default router
