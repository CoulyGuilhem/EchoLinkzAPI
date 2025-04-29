import { Request, Response, NextFunction } from 'express'
export default (err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: 'Server Error' })
}
