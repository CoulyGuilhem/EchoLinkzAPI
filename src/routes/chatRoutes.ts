import { Router } from 'express'
import { protect } from '../middleware/auth'
import { sendMessage, getMessages } from '../controllers/chatController'
const router = Router()

router.route('/:alertId')
  .post(protect, sendMessage)
  .get(protect, getMessages)

export default router
