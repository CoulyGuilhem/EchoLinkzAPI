import mongoose from 'mongoose'
import { IAlert } from '../models/Alert'
import User, { IUser } from '../models/User'

export const findVolunteersForAlert = async (
  alert: IAlert
): Promise<IUser[]> => {
  return []
}
