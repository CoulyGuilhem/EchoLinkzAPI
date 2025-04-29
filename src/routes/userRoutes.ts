import { Router } from 'express'
import { registerUser, loginUser, getMe } from '../controllers/userController'
import { protect } from '../middleware/auth'
const router = Router()

router.post('/register', registerUser)
router.post('/login',    loginUser)
router.get('/me', protect, getMe)

export default router
