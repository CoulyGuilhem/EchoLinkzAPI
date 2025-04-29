import { Request, Response } from 'express'
import Message from '../models/Message'

export const sendMessage = async (req: any, res: Response) => {
  const { text } = req.body
  const message = await Message.create({ alert: req.params.alertId, user: req.user.id, text })
  res.status(201).json(message)
}

export const getMessages = async (req: Request, res: Response) => {
  const messages = await Message.find({ alert: req.params.alertId })
  res.json(messages)
}
