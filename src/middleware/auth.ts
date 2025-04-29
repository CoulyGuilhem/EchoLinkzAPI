import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'

export const protect: RequestHandler = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized' })
    return
  }

  const token = auth.split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

  const user = await User.findById(decoded.id).select('-password')
  if (!user) {
    res.status(401).json({ message: 'Not authorized' })
    return
  }

  req.user = user
  next()
}
