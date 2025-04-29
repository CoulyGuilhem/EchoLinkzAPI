import { Request, Response, NextFunction } from 'express'
import Alert from '../models/Alert'

export const createAlert = async (req: any, res: Response, next: NextFunction) => {
  const { type, description, coordinates, priority } = req.body
  const alert = await Alert.create({ type, description, location: { coordinates }, priority, user: req.user.id })
  res.status(201).json(alert)
}

export const getAlerts = async (_req: Request, res: Response, _next: NextFunction) => {
  const alerts = await Alert.find({ status: 'open' })
  res.json(alerts)
}

export const updateAlert = async (req: Request, res: Response, _next: NextFunction) => {
  const alert = await Alert.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.json(alert)
}
