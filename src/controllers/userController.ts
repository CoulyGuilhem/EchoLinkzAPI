import { Request, Response, NextFunction, RequestHandler } from 'express'
import User, { IUser } from '../models/User'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' })

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.create({ name, email, password })
    res.status(201).json({ token: generateToken(user._id.toString()) })
  } catch (err) {
    next(err)
  }
}

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ token: generateToken(user._id.toString()) })
      return
    }
    res.status(401).json({ message: 'Invalid credentials' })
  } catch (err) {
    next(err)
  }
}

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    // on a typé req.user via middleware
    const u = (req.user as IUser)
    const user = await User.findById(u._id).select('-password')
    res.json(user)
  } catch (err) {
    next(err)
  }
}
